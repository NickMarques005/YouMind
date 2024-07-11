import { useState, useCallback, useRef, useEffect } from "react";
import { Player, Recorder } from '@react-native-community/audio-toolkit';
import FirebaseStorageService from "src/__firebase__/services/FirebaseStorageService";
import { PermissionsAndroid, Platform } from "react-native";
import { AudioTemplate } from "./UseMessageHandling";
import { formatAudioDuration, formatTimer } from "@utils/date/DateFormatting";

interface AudioHandling {
    isRecording: boolean;
    startRecording: () => void;
    stopRecording: () => Promise<ResolveRecording>;
    handleAudioRelease: (senderId: string) => void;
    handleAudioPress: () => void;
    recordTime: number;
}

interface ResolveRecording {
    filePath: string;
    duration: string;
}

interface UseAudioHandlingProps {
    HandleResponseAppError: (value: string) => void;
    handleSendNewMessage: (senderId: string, audio?: AudioTemplate) => Promise<void>;
    senderId?: string;
}

const recorderOptions = {
    bitrate: 256000,
    channels: 2,
    sampleRate: 44100,
    quality: 'max',
    format: 'aac',
    encoder: 'aac'
}

const useAudioHandling = ({ HandleResponseAppError, handleSendNewMessage, senderId }: UseAudioHandlingProps): AudioHandling => {
    const [recorder, setRecorder] = useState<Recorder | null>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [recordTime, setRecordTime] = useState(0);

    const requestAudioPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: "Permissão para Gravação de Áudio",
                        message: "Este aplicativo precisa de acesso ao seu microfone para gravar áudio.",
                        buttonNeutral: "Pergunte-me Depois",
                        buttonNegative: "Cancelar",
                        buttonPositive: "OK"
                    }
                );
                return (granted === PermissionsAndroid.RESULTS.GRANTED);
            } catch (err) {
                const error = err as Error;
                HandleResponseAppError("Falha ao solicitar permissão para gravação de áudio: " + error.message);
                return false;
            }
        } else {
            return true; 
        }
    };

    const startRecording = useCallback(async () => {
        const hasPermission = await requestAudioPermission();
        if (!hasPermission) {
            return;
        }

        try {
            const newRecorder = new Recorder('message.m4a', recorderOptions);
            newRecorder.prepare((err, fsPath) => {
                if (err) {
                    console.log(err.message);
                    HandleResponseAppError(err.message);
                } else {
                    newRecorder.record();
                    setRecorder(newRecorder);
                    setIsRecording(true);
                }
            });
        } catch (err) {
            const error = err as Error;
            HandleResponseAppError(error.message);
        }
    }, [HandleResponseAppError]);

    const stopRecording = useCallback(async () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current); 
        }
        
        return new Promise<ResolveRecording>((resolve, reject) => {
            if (recorder) {
                recorder.stop((err) => {
                    if (err) {
                        HandleResponseAppError("Falha ao parar gravação: " + err.message);
                        reject(err);
                    } else {
                        setIsRecording(false);
                        const player = new Player(recorder.fsPath);
                        player.prepare((prepareErr) => {
                            if(prepareErr){
                                console.log("Erro ao carregar audio: ", prepareErr);
                                HandleResponseAppError(`Houve um erro ao carregar áudio: ${prepareErr.message}`);
                                reject(prepareErr);
                            }
                            else {
                                console.log("Duração do audio: ", player.duration);
                                resolve({filePath: recorder.fsPath, duration: formatAudioDuration(player.duration) });
                            }
                        })
                    }
                });
            } else {
                const errMsg = "Gravador não inicializado";
                HandleResponseAppError(errMsg);
                reject(new Error(errMsg));
            }
        });
    }, [recorder]);
    
    const handleAudioPress = () => {
        if (!isRecording) {
            startRecording();
        }
    }

    const handleAudioRelease = async (senderId: string) => {
        if(!isRecording) return;
        try {
            const { filePath, duration} = await stopRecording();
            const url = await FirebaseStorageService.uploadAudio(filePath);
            
            const audio: AudioTemplate = {
                url: url,
                duration: duration
            }
            console.log("Audio: ", audio);

            handleSendNewMessage(senderId, audio);
        } catch (err) {
            const error = err as Error;
            console.error(err);
            HandleResponseAppError("Ocorreu um erro na gravação: " + error.message);
        }
    }



    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined;

        if(isRecording) {
            intervalId = setInterval(() => {
                setRecordTime(prevTime => prevTime + 1);
            }, 1000);
        }
        else{
            clearInterval(intervalId);
            setRecordTime(0);
        }

        if (isRecording && recordTime === 59) {
            console.log("Limite de tempo atingido. Parando gravação...");
            senderId && handleAudioRelease(senderId);
        }

        return () => clearInterval(intervalId);
    });

    return {
        isRecording,
        startRecording,
        stopRecording,
        handleAudioRelease,
        handleAudioPress,
        recordTime
    }
}

export default useAudioHandling;