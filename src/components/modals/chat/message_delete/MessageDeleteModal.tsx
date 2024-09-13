import GenericModal from '@components/modals/generic/GenericModal';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { UserType } from 'types/user/User_Types';
import MessageDeleteComponent from './MessageDeleteComponent';
import { MessageSelected } from 'types/chat/Chat_Types';

interface MessageDeleteModalProps {
    isVisible: boolean;
    onClose: () => void;
    onDelete: () => void;
    userType?: UserType;
    selectedMessages: MessageSelected[];
}

const MessageDeleteModal: React.FC<MessageDeleteModalProps> = ({ isVisible, onClose, onDelete, userType, selectedMessages }) => {
    return (
        <GenericModal
            isVisible={isVisible}
            onClose={onClose}
            userType={userType}
            containerStyle={styles.modalContainerStyle}
        >
            <MessageDeleteComponent
                onDelete={onDelete}
                closeModal={onClose}
                userType={userType}
                messages={selectedMessages}
            />
        </GenericModal>
    );
};

const styles = StyleSheet.create({
    modalContainerStyle: {
        backgroundColor: 'rgba(255, 255, 255, 1)'
    }
});

export default MessageDeleteModal;