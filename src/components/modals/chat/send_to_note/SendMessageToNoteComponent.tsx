import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { MessageSelected } from 'types/chat/Chat_Types';
import { NoteTemplate } from 'types/app/doctor/notepad/Notepad_Types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { responsiveSize } from '@utils/layout/Screen_Size';

interface SendMessageToNoteComponentProps {
    closeModal: () => void;
    onSend: (selectedMessages: MessageSelected[], currentChatNote: NoteTemplate, onSuccess?: () => void) => void;
    onSuccess?: () => void;
    messages: MessageSelected[];
    currentChatNote: NoteTemplate;
}

const SendMessageToNoteComponent = ({ 
    closeModal, onSend, onSuccess,
    messages, currentChatNote }: SendMessageToNoteComponentProps) => {
    
    const sendToNoteIconSize = responsiveSize * 0.2;
    
    return (
        <View style={styles.modalContent}>
            <Text style={styles.title}>
                {`Deseja enviar essa${messages.length > 1 ? "s" : ""} mensage${messages.length > 1 ? "ns" : "m"} para a anotação "${currentChatNote.title}"?`}
            </Text>
            <View style={[styles.iconContainer, { 
                width: sendToNoteIconSize, height: sendToNoteIconSize, 
                borderRadius: sendToNoteIconSize / 2, backgroundColor: '#4ea6a0'}]}>
                <MaterialCommunityIcons name="notebook-plus" size={sendToNoteIconSize * 0.6} color="white" />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.sendButton} onPress={() => {
                    onSend(messages, currentChatNote, onSuccess);
                    closeModal();
                }}>
                    <Text style={styles.sendButtonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SendMessageToNoteComponent;

const styles = StyleSheet.create({
    modalContent: {
        padding: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    iconContainer: {
        marginVertical: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#333',
        fontWeight: 'bold',
    },
    sendButton: {
        backgroundColor: '#245d61',
        padding: 10,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});