import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WebRTCServices  } from '@api/webrtc/WebRTCServices';
import generateUniqueUID from '@utils/security/handleUUID';

interface RealTimeCommunicationContextType {
    startCall: () => Promise<void>;
    joinCall: (roomId: string) => Promise<void>;
    toggleMute: () => void;
    toggleCamera: () => void;
    endCall: () => void;
    isMuted: boolean;
    isCameraOn: boolean;
    isCallActive: boolean;
    roomId: string | null;
}

const RealTimeCommunicationContext = createContext<RealTimeCommunicationContextType | undefined>(undefined);

export const RealTimeCommunicationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [webRTC, setWebRTC] = useState<WebRTCServices | null>(null);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
    const [isCallActive, setIsCallActive] = useState<boolean>(false);
    const [roomId, setRoomId] = useState<string | null>(null);

    const initializeWebRTC = (newRoomId: string) => {
        setWebRTC(new WebRTCServices(newRoomId));
        setRoomId(newRoomId);
    };

    const startCall = async () => {
        if (webRTC) {
            await webRTC.startLocalStream(); // Inicia a stream local
            await webRTC.startCall();
            setIsCallActive(true);
            setIsCameraOn(true);
        } else {
            const newRoomId = generateUniqueUID(); 
            initializeWebRTC(newRoomId);
            await startCall(); // Inicia a chamada após inicializar o WebRTC
        }
    };

    const joinCall = async (newRoomId: string) => {
        if (webRTC) {
            await webRTC.startLocalStream(); // Inicia a stream local
            await webRTC.joinCall();
            setIsCallActive(true);
            setIsCameraOn(true);
        } else {
            initializeWebRTC(newRoomId);
            await joinCall(newRoomId); // Entra na chamada após inicializar o WebRTC
        }
    };

    const toggleMute = () => {
        if (webRTC) {
            setIsMuted((prev) => !prev);
            webRTC.toggleMute(); // Alterna o estado de mutar/desmutar
        }
    };

    const toggleCamera = async () => {
        if (webRTC) {
            setIsCameraOn((prev) => !prev);
            webRTC.toggleCamera(); // Alterna o estado da câmera
        }
    };

    const endCall = async () => {
        if (webRTC) {
            await webRTC.endCall();
            setIsCallActive(false);
            setIsMuted(false);
            setIsCameraOn(false);
            setWebRTC(null);
            setRoomId(null);
        }
    };

    return (
        <RealTimeCommunicationContext.Provider value={{ startCall, joinCall, toggleMute, toggleCamera, endCall, isMuted, isCameraOn, isCallActive, roomId }}>
            {children}
        </RealTimeCommunicationContext.Provider>
    );
};

export const useRealTimeCommunication = (): RealTimeCommunicationContextType => {
    const context = useContext(RealTimeCommunicationContext);
    if (!context) {
        throw new Error('O contexto precisa estar dentro do Provider! (RealTimeCommunicationProvider)');
    }
    return context;
};