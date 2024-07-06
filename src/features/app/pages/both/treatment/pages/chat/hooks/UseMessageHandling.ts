import { UseGlobalResponse } from "@features/app/providers/sub/ResponseProvider";
import { UseChatService } from "@hooks/api/UseChatService";
import { UseLoading } from "@hooks/loading/UseLoading";
import { formatDateMessage } from "@utils/date/DateFormatting";
import { useState } from "react"
import { MessageTemplate, ProcessedMessageItem } from "types/chat/Chat_Types";

interface UseMessageHandlingProps {
    conversation: string | null;
    socket: any;
}

export interface AudioTemplate {
    url: string;
    duration: string;
}

export const UseMessageHandling = ({ conversation, socket }: UseMessageHandlingProps) => {
    const [newMessage, setNewMessage] = useState('');
    const { loading, setLoading } = UseLoading();
    const { HandleResponseAppError } = UseGlobalResponse();
    const { performSaveNewMessage } = UseChatService(setLoading);

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

    const handleSendNewMessage = async (audio?: AudioTemplate) => {
        if (newMessage.trim() === '' && !audio) {
            console.log("A mensagem não pode estar vazia");
            return;
        }

        try {
            if (!conversation) {
                return;
            }

            const newMessageData = {
                conversationId: conversation,
                content: audio ? `Mensagem de Voz (${audio.duration})` : newMessage,
                audioUrl: audio ? audio.url : undefined,
                duration: audio ? audio.duration : undefined
            }

            const response = await performSaveNewMessage(newMessageData);

            if (response.success) {
                const newMessage = response.data as MessageTemplate;
                console.log("Nova mensagem salva no banco de dados: ", newMessage);
                socket?.emit("sendMessage", newMessage);

                setNewMessage('');
            }

            if (response.error) {
                console.log("Erro ao enviar a mensagem");
                HandleResponseAppError(response.error);
            }
        }
        catch (err) {
            console.log("Erro ao processar a mensagem:", err);
            const error = err as Error;
            HandleResponseAppError(error.message);
        }
    }

    return { newMessage, setNewMessage, handleSendNewMessage, newMessageLoading: loading, preprocessMessages }
}