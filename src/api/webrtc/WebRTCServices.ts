import {
	RTCPeerConnection,
	RTCIceCandidate,
	RTCSessionDescription,
	mediaDevices,
	MediaStream,
} from 'react-native-webrtc';
import {
	doc,
	collection,
	addDoc,
	getDoc,
	setDoc,
	updateDoc,
	onSnapshot,
	deleteField,
} from 'firebase/firestore';
import { FIRESTORE } from 'src/__firebase__/FirebaseConfig';

// Configurações do servidor Ice (Interactive Connectivity Establishment) STUN 
const configuration: RTCConfiguration = {
	iceServers: [
		{
			urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
		},
	],
	iceCandidatePoolSize: 10,
};

const defaultOfferOptions = {
	iceRestart: false,
	offerToReceiveAudio: true,
	offerToReceiveVideo: true
};

// Classe para a comunicação peer to peer WebRTC:
export class WebRTCServices {
	private localStream: MediaStream | null = null;
	private remoteStream: MediaStream | null = null;
	private peerConnection: RTCPeerConnection | null = null;
	private roomId: string;
	private makingOffer: boolean = false;
	private remoteCandidatesQueue: RTCIceCandidate[] = [];

	constructor(roomId: string) {
		this.roomId = roomId;
	}

	// Inicia a stream local (Câmera webcam local no dispositivo) 
	public async startLocalStream(isFront = true): Promise<MediaStream | null> {
		const devices = await mediaDevices.enumerateDevices() as MediaDeviceInfo[];
		const facingMode = isFront ? 'user' : 'environment';
		console.log("Dispositivos: ", devices);
		const videoSourceId = devices.find(
			(device) => device.kind === 'videoinput' && device.label.toLowerCase().includes(isFront ? 'front' : 'back')
		)?.deviceId;

		const videoConstraints: MediaTrackConstraints = {
			width: { min: 300 },
			height: { min: 100 },
			frameRate: { min: 30 },
			facingMode: facingMode,
			deviceId: devices.find(
				(device) => device.kind === 'videoinput' && device.label.toLowerCase().includes(isFront ? 'front' : 'back')
			)?.deviceId,
		};

		const constraints: MediaStreamConstraints = {
			audio: true,
			video: videoConstraints
		};
		this.localStream = await mediaDevices.getUserMedia(constraints);
		return this.localStream;
	}

	// Inicia a chamada e cria uma oferta
	public async startCall(): Promise<void> {
		this.peerConnection = new RTCPeerConnection(configuration);
		this.localStream?.getTracks().forEach((track) => {
			this.peerConnection?.addTrack(track, this.localStream!);
		});

		const roomRef = doc(FIRESTORE, 'room', this.roomId);
		const callerCandidatesCollection = collection(roomRef, 'callerCandidates');

		this.peerConnection.addEventListener('icecandidate', (event) => {
			if (event.candidate) {
				addDoc(callerCandidatesCollection, event.candidate.toJSON());
			}
		});

		this.peerConnection.addEventListener('track', (event) => {
			this.remoteStream = new MediaStream();
			event.streams[0].getTracks().forEach((track) => {
				this.remoteStream?.addTrack(track);
			});
		});

		if (this.makingOffer) return;
		this.makingOffer = true;

		try {
			const offer = await this.peerConnection.createOffer(defaultOfferOptions);
			await this.peerConnection.setLocalDescription(offer);
			await setDoc(roomRef, { offer, connected: false });

			onSnapshot(roomRef, (snapshot) => {
				const data = snapshot.data();
				if (data?.answer && !this.peerConnection?.remoteDescription) {
					const rtcSessionDescription = new RTCSessionDescription(data.answer);
					this.peerConnection?.setRemoteDescription(rtcSessionDescription);
				}
			});

			onSnapshot(collection(roomRef, 'calleeCandidates'), (snapshot) => {
				snapshot.docChanges().forEach((change) => {
					if (change.type === 'added') {
						const candidate = new RTCIceCandidate(change.doc.data());
						this.remoteCandidatesQueue.push(candidate); // Adiciona candidatos à fila
					}
				});

				if (this.peerConnection?.signalingState === 'stable') {
					this.remoteCandidatesQueue.forEach(async (candidate) => {
						await this.peerConnection?.addIceCandidate(candidate);
					});
					this.remoteCandidatesQueue = []; // Limpa a fila de candidatos
				}
			});

		} finally {
			this.makingOffer = false;
		}
	}

	public async joinCall(): Promise<void> {
		const roomRef = doc(FIRESTORE, 'room', this.roomId);
		const roomSnapshot = await getDoc(roomRef);

		if (!roomSnapshot.exists()) return;

		this.peerConnection = new RTCPeerConnection(configuration);
		this.localStream?.getTracks().forEach((track) => {
			this.peerConnection?.addTrack(track, this.localStream!);
		});

		this.peerConnection.addEventListener('icecandidate', (event) => {
			if (event.candidate) {
				addDoc(collection(roomRef, 'calleeCandidates'), event.candidate.toJSON());
			}
		});

		this.peerConnection.addEventListener('track', (event) => {
			this.remoteStream = new MediaStream();
			event.streams[0].getTracks().forEach((track) => {
				this.remoteStream?.addTrack(track);
			});
		});

		const offer = roomSnapshot.data()?.offer;
		if (offer) {
			await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
			const answer = await this.peerConnection.createAnswer();
			await this.peerConnection.setLocalDescription(answer);
			await updateDoc(roomRef, { answer, connected: true });
		}

		onSnapshot(collection(roomRef, 'callerCandidates'), (snapshot) => {
			snapshot.docChanges().forEach((change) => {
				if (change.type === 'added') {
					const candidate = new RTCIceCandidate(change.doc.data());
					this.remoteCandidatesQueue.push(candidate);
				}
			});

			if (this.peerConnection?.signalingState === 'stable') {
				this.remoteCandidatesQueue.forEach(async (candidate) => {
					await this.peerConnection?.addIceCandidate(candidate);
				});
				this.remoteCandidatesQueue = [];
			}
		});
	}

	// Encerra a chamada
	public async endCall(): Promise<void> {
		const roomRef = doc(FIRESTORE, 'room', this.roomId);
		if (this.peerConnection) {
			this.peerConnection.getSenders().forEach((sender) => {
				this.peerConnection?.removeTrack(sender);
			});
			this.peerConnection.close();
		}

		await updateDoc(roomRef, { answer: deleteField(), connected: false });
		this.localStream = null;
		this.remoteStream = null;
		this.peerConnection = null;
	}

	// Alterna a câmera (frontal/traseira)
	public switchCamera(): void {
		if (this.localStream) {
			this.localStream.getVideoTracks().forEach((track) => track._switchCamera());
		}
	}

	// Muta/desmuta o áudio
	public toggleMute(): void {
		if (this.localStream) {
			this.localStream.getAudioTracks().forEach((track) => {
				track.enabled = !track.enabled;
			});
		}
	}

	// Liga/desliga a câmera
	public toggleCamera(): void {
		if (this.localStream) {
			this.localStream.getVideoTracks().forEach((track) => {
				track.enabled = !track.enabled;
			});
		}
	}

	// Retorna a stream local
	public getLocalStream(): MediaStream | null {
		return this.localStream;
	}

	// Retorna a stream remota
	public getRemoteStream(): MediaStream | null {
		return this.remoteStream;
	}
}