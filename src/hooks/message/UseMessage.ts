import { MessageIcon } from '@components/modals/message/types/type_message_modal';
import { useState } from 'react';

type UseMessageReturnType = {
    message: string;
    HandleMessage: (msg: string, messageType: MessageIcon) => void;
    ClearMessage: () => void;
    messageType?: MessageIcon;
};

export const UseMessage = (): UseMessageReturnType => {
    const [message, setMessage] = useState<string>('');
    const [messageType, setMessageType] = useState<MessageIcon | undefined>('success');

    const HandleMessage = (msg: string, messageType: MessageIcon) => {
        const validMessageIcons: MessageIcon[] = ['success', 'email_sent', 'info', 'treatment', 'warning'];
        if (validMessageIcons.includes(messageType)) {
            setMessageType(messageType);
        }
        setMessage(msg);
    };

    const ClearMessage = () => {
        setMessage("");
        setMessageType(undefined);
    };

    return {
        message,
        HandleMessage,
        ClearMessage,
        messageType
    };
};