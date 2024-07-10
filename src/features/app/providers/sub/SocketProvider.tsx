import USE_ENV from '@api/constants/server_url/ServerUrl';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import { GetAccessToken } from '@utils/token/GetAccessToken';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';

interface SocketContextData {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextData | undefined>(undefined);

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const { serverUrl } = USE_ENV();
    const { uid } = UseAuth();
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        console.log("\n******SOCKET******\n")
        if (!serverUrl) {
            console.error("Server URL não definida");
            return;
        }

        let activeSocket: Socket | null = null;

        const initSocket = async () => {
            const token = await GetAccessToken();
            if (token) {
                activeSocket = io(serverUrl, { 
                    reconnection: true,
                    reconnectionAttempts: Infinity,
                    reconnectionDelay: 1000,
                    reconnectionDelayMax: 5000,
                    timeout: 20000,
                    auth: { token: `Bearer ${token}` } 
                });

                activeSocket.on('connect', () => {
                    console.log('Conectado ao server socket');
                });

                activeSocket.on('disconnect', (reason) => {
                    console.log('Desconectado do socket:', reason);
                });

                activeSocket.on('reconnect_attempt', (attemptNumber) => {
                    console.log('Tentativa de reconexão:', attemptNumber);
                });

                activeSocket.on('reconnect', (attemptNumber) => {
                    console.log('Reconectado ao socket após', attemptNumber, 'tentativas');
                });

                setSocket(activeSocket);
            } else {
                console.log("Não há token disponível.");
                if (socket) {
                    socket.disconnect();
                    setSocket(null);
                }
            }
        };

        if (uid) { 
            console.log("(Socket) Usuário logado");
            initSocket();
        } else {
            console.log("(Socket) Não logado");
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
        }

        return () => {
            if (activeSocket) {
                activeSocket.disconnect();
            }
        };
    }, [serverUrl, uid]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const UseSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('Context precisa ser dentro do Provider! (UseSocket)')
    }
    return context;
}