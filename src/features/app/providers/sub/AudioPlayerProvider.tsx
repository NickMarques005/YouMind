import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { Player } from '@react-native-community/audio-toolkit';

interface AudioPlayerContextType {
    playerRef: React.MutableRefObject<Player | null>;
    currentUrl: string | null;
    handleCurrentUrl: (url: string) => void;
    clearCurrentUrl: () => void;
}

interface AudioPlayerProviderProps {
    children: ReactNode;
}

const defaultContextValue: AudioPlayerContextType = {
    playerRef: { current: null },
    currentUrl: null,
    handleCurrentUrl: () => { },
    clearCurrentUrl: () => { }
};

const AudioPlayerContext = createContext<AudioPlayerContextType>(defaultContextValue);

export const AudioPlayerProvider = ({ children }: AudioPlayerProviderProps) => {
    const playerRef = useRef<Player | null>(null);
    const [currentUrl, setCurrentUrl] = useState<string | null>(null);

    const handleCurrentUrl = (url: string) => {
        console.log("Atualizar currentUrl");
        setCurrentUrl(url);
        if (playerRef.current) {
            console.log("Destruir PlayerRef");
            playerRef.current.destroy();
            playerRef.current = new Player(url, { autoDestroy: false });
        }
    };

    const clearCurrentUrl = () => {
        setCurrentUrl(null);
        if (playerRef.current) {
            playerRef.current.destroy();
            playerRef.current = null;
        }
    };

    return (
        <AudioPlayerContext.Provider value={{ playerRef, currentUrl, clearCurrentUrl, handleCurrentUrl }}>
            {children}
        </AudioPlayerContext.Provider>
    );
};

export const UseAudioPlayer = (): AudioPlayerContextType => {
    const context = useContext(AudioPlayerContext);
    if (context === undefined) {
        throw new Error('Error Context precisa estar dentro do provider (AudioPlayer)');
    }
    return context;
};