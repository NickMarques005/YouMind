import { MessageSelected } from "types/chat/Chat_Types"



export const useSendMessageToNoteBehavior = () => {

    const verifySelectedMessagesToAdd = (selectedMessages: MessageSelected[]) => {
        const messageCount = selectedMessages.length;

        switch (true) {
            case messageCount === 0:
                return ""; 
            case messageCount === 1:
                return "1 mensagem";
            case messageCount > 1 && messageCount <= 99:
                return `${messageCount} mensagens`;
            case messageCount > 99:
                return "99+ mensagens";
            default:
                return ""; 
        }
    }

    return { 
        verifySelectedMessagesToAdd
    }
}