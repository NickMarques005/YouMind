import { WebRTCServices } from '@api/webrtc/WebRTCServices';
import React, { createContext, useContext, useState } from 'react';
import { MediaStream } from 'react-native-webrtc';

interface VideoCallProviderProps {
    children: React.ReactNode;
}

interface VideoCallContextType {
    startVideoCall: (roomId: string, isVideoCaller: boolean) => Promise<void>;
    endVideoCall: () => Promise<void>;
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
}

const VideoCallContext = createContext<VideoCallContextType | undefined>(undefined);

export const VideoCallProvider: React.FC<VideoCallProviderProps> = ({ children }) => {
    const [webrtcService, setWebrtcService] = useState<WebRTCServices | null>(null);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

    const startVideoCall = async (roomId: string, isVideoCaller: boolean) => {
        const service = new WebRTCServices(roomId);
        setWebrtcService(service);

        const stream = await service.startLocalStream();
        setLocalStream(stream as MediaStream);

        if (isVideoCaller) {
            await service.startCall();
        } else {
            await service.joinCall();
        }

        const remoteStream = service.getRemoteStream();
        if (remoteStream) {
            setRemoteStream(remoteStream); 
        }
    };

    const endVideoCall = async () => {
        if (webrtcService) {
            await webrtcService.endCall();
            setLocalStream(null);
            setRemoteStream(null);
            setWebrtcService(null);
        }
    };

    return (
        <VideoCallContext.Provider value={{
            startVideoCall, endVideoCall,
            localStream, remoteStream
        }}>
            {children}
        </VideoCallContext.Provider>
    );
};

export const useVideoCall = () => {
    const context = useContext(VideoCallContext);
    if(!context){
        throw new Error('Context precisa ser dentro do Provider! (UseForm)')
    }
    return context;
}