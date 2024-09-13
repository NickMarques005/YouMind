import { useState } from "react";
import { UseTreatmentNavigation } from "../../../hooks/UseTreatmentNavigation";
import { UseChat } from "@features/app/providers/bridge/ChatProvider";

interface UseChatHandlingProps {

}

export const UseChatBehavior = ({ }: UseChatHandlingProps) => {
    const { handleLeaveChat } = UseChat();
    const { navigateToTreatmentScreen } = UseTreatmentNavigation();
    const [chatMenu, setChatMenu] = useState<boolean>(false);
    const [messageDeleteModal, setMessageDeleteModal] = useState<boolean>(false);
    const [sendMessagesToNoteModal, setSendMessagesToNoteModal] = useState<boolean>(false);

    const handleMessageDeleteModal = () => {
        setMessageDeleteModal(prev => !prev);
    }

    const handleSendMessageToNoteModal = () => {
        setSendMessagesToNoteModal(prev => !prev);
    }

    const handleChatMenu = () => {
        setChatMenu(prev => !prev);
    }

    const handleChatNavigateBack = () => {
        handleLeaveChat();
        navigateToTreatmentScreen('main_treatment');
    }

    return { 
        chatMenu, handleChatMenu, handleChatNavigateBack,
        handleMessageDeleteModal, handleSendMessageToNoteModal,
        messageDeleteModal, sendMessagesToNoteModal
    }
}