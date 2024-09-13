import { UseChatNavigation } from "../../../hooks/UseChatNavigation";

export const useSendToNoteBehavior = () => {
    
    const { navigateToChatScreen } = UseChatNavigation();

    const handleBackToChat = () => {
        navigateToChatScreen('current_chat');
    }

    return { 
        handleBackToChat
    }
}