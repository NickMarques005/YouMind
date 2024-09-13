import { UseGlobalResponse } from "@features/app/providers/sub/ResponseProvider";
import { UseLoading } from "@hooks/loading/UseLoading";
import { formatDateMessage } from "@utils/date/DateFormatting";
import generateUniqueUID from "@utils/security/handleUUID";
import { useState } from "react"
import { MentionedMessageTemplate, MessageTemplate, ProcessedMessageItem } from "types/chat/Chat_Types";
import { UserType } from "types/user/User_Types";

export interface SendNewMessage {
    audio?: AudioTemplate;
    senderId?: string;
    mentionedMessage: MentionedMessageTemplate | undefined
    senderType: UserType;
}

interface UseMessageHandlingProps {
    chatId?: string;
    handleSendMessage: (newMessage: MessageTemplate) => void;
    clearCurrentMentionedMessage: () => void;
    handleAddNewMessage: (message: MessageTemplate) => void;
}

export interface AudioTemplate {
    url: string;
    duration: string;
}

export const UseMessageHandling = ({
    chatId,
    handleSendMessage,
    clearCurrentMentionedMessage,
    handleAddNewMessage
}: UseMessageHandlingProps) => {
    const [newMessage, setNewMessage] = useState('');
    const { loading, setLoading } = UseLoading();
    const { HandleResponseAppError } = UseGlobalResponse();

    const preprocessMessages = (messages: MessageTemplate[]) => {
        const processedMessages: ProcessedMessageItem[] = [];
        let lastDate: string | null = null;

        for (let i = messages.length - 1; i >= 0; i--) {
            const message = messages[i];
            const messageDate = formatDateMessage(message.createdAt);

            if (messageDate !== lastDate) {

                processedMessages.unshift({ type: 'dateLabel', date: messageDate });
                lastDate = messageDate;
            }

            processedMessages.unshift({ type: 'message', data: message });
        }

        return processedMessages;
    }

    const handleSendNewMessage = async ({ senderId, audio, mentionedMessage, senderType }: SendNewMessage) => {
        if (!senderId) return console.log("Usuário não especificado");

        if (newMessage.trim() === '' && !audio) {
            console.log("A mensagem não pode estar vazia");
            return;
        }

        try {
            if (!chatId) {
                return;
            }

            const timestamp = new Date().toISOString();
            const messageTempId = generateUniqueUID();

            let message: MessageTemplate = {
                _id: messageTempId,
                conversationId: chatId,
                content: audio ? `Mensagem de Voz (${audio.duration})` : newMessage,
                audioUrl: audio ? audio.url : undefined,
                duration: audio ? audio.duration : undefined,
                sender: senderId,
                senderType,
                createdAt: timestamp,
                updatedAt: timestamp,
                sending: true,
            }

            const newMessageDataToSend: MessageTemplate = {
                ...message,
                mentionedMessageId: mentionedMessage?._id
            }

            if (mentionedMessage) {
                message = {
                    ...message,
                    mentionedMessage
                }
            }

            //handleAddNewMessage(message);
            handleSendMessage(newMessageDataToSend);
            setNewMessage('');
            clearCurrentMentionedMessage();
        }
        catch (err) {
            console.log("Erro ao processar a mensagem:", err);
            const error = err as Error;
            HandleResponseAppError(error.message);
        }
    }

    return { newMessage, setNewMessage, handleSendNewMessage, newMessageLoading: loading, preprocessMessages }
}