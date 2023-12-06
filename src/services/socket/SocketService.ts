import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

type SocketServiceProps = {
    url: string;
};

const UseSocketService = ({url}: SocketServiceProps) => {
    const socket = useRef<Socket | null>(null);

    useEffect(() => {
        socket.current = io(url);

        return () => {
            if(socket.current) {
                socket.current.disconnect();
            }
        };
    }, [url]);

    return socket.current;
}

export default UseSocketService;