import USE_ENV from '@api/constants/server_url/ServerUrl';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import { GetAccessToken } from '@utils/token/GetAccessToken';
import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo } from 'react';
import io, { Socket } from 'socket.io-client';
import { UseForm } from '../sub/UserProvider';
import { UseGlobalResponse } from '../sub/ResponseProvider';
import useGlobalSocketHandling from '@api/socket/SocketService';

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
    const { userData } = UseForm();
    const { stateAppLoading, HandleConnectionAppError } = UseGlobalResponse();
    const [socket, setSocket] = useState<Socket | null>(null);

    const memoizedUserData = useMemo(() => ({
        _id: userData?._id,
        type: userData?.type,
    }), [userData?._id, userData?.type]);

    const {
        configureSocketListeners,
        handleJoinMainRoom,
        removeSocketListeners
    } = useGlobalSocketHandling({ uid, userData, socket, HandleConnectionAppError, setLoading: stateAppLoading.setLoading });

    useEffect(() => {
        console.log("\n******SOCKET******\n")
        if (!serverUrl) {
            console.error("Server URL não definida");
            return;
        }

        let activeSocket: Socket | null = null;

        const initSocket = async () => {
            try {
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

                        //Configuração dos socket Listeners
                        if (activeSocket) {
                            console.log("Configuração dos listeners do app...")
                            configureSocketListeners(activeSocket);
                            handleJoinMainRoom(activeSocket);
                        }
                    });

                    activeSocket.on('disconnect', (reason) => {
                        console.log('Desconectado do socket:', reason);
                        if (activeSocket) {
                            activeSocket.emit('leaveRoom', { room: uid, userId: userData?._id });
                            console.log("Remoção de listeners...");
                            removeSocketListeners(activeSocket);
                        }

                        if (reason === 'transport error' || reason === 'io server disconnect') {
                            //activeSocket?.connect();
                        }
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
            }
            catch (err) {
                console.error('Erro ao inicializar o socket:', err);
            }
        };

        if (uid) {
            console.log("(Socket) Usuário logado");
            initSocket();
        } else {
            console.log("(Socket) Não logado");
            if (socket && socket.connected) {
                socket.disconnect();
                setSocket(null);
            }
        }

        return () => {
            if (activeSocket) {
                console.log("Removendo listeners e desconectando socket");
                removeSocketListeners(activeSocket);
                activeSocket.disconnect();
            }
        };
    }, [serverUrl, uid, memoizedUserData]);

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