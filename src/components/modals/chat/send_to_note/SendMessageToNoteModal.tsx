import GenericModal from '@components/modals/generic/GenericModal';
import React from 'react';
import { StyleSheet } from 'react-native';
import SendMessageToNoteComponent from './SendMessageToNoteComponent';
import { NoteTemplate } from 'types/app/doctor/notepad/Notepad_Types';
import { MessageSelected } from 'types/chat/Chat_Types';
import DefaultModal from '@components/modals/default/DefaultModal';

interface SendMessageToNoteModalProps {
    isVisible: boolean;
    onClose: () => void;
    onSend: (selectedMessages: MessageSelected[], currentChatNote: NoteTemplate, onSuccess?: () => void) => void;
    onSuccess?: () => void;
    selectedMessages: MessageSelected[];
    currentChatNote: NoteTemplate;
}

const SendMessageToNoteModal: React.FC<SendMessageToNoteModalProps> = ({ 
    isVisible, onClose, onSend, onSuccess,
    selectedMessages, currentChatNote }) => {
    return (
        <DefaultModal
            isVisible={isVisible}
            onClose={onClose}
        >
            <SendMessageToNoteComponent
                onSend={onSend}
                closeModal={onClose}
                onSuccess={onSuccess}
                messages={selectedMessages}
                currentChatNote={currentChatNote}
            />
        </DefaultModal>
    );
};

const styles = StyleSheet.create({
    modalContainerStyle: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
});

export default SendMessageToNoteModal;