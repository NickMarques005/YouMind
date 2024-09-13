import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { MessageSelected } from 'types/chat/Chat_Types';
import { UserType } from 'types/user/User_Types';

interface MessageDeleteComponent {
    closeModal: () => void;
    onDelete: () => void;
    messages: MessageSelected[];
    userType: UserType;
}

const MessageDeleteComponent = ({ closeModal, onDelete, messages, userType }: MessageDeleteComponent) => {

    return (
        <View style={styles.modalContent}>
            <Text style={[styles.title, { color: userType === 'patient' ? '#4e316e' : '#316e6c'}]}>
                {`Deseja excluir essa${messages.length > 1 ? "s" : ""} mensage${messages.length > 1 ? "ns" : "m"}?`}
                </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={() => {
                    onDelete();
                    closeModal();
                }}>
                    <Text style={styles.deleteButtonText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MessageDeleteComponent

const styles = StyleSheet.create({
    modalContent: {
        padding: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonContainer: {
        paddingTop: '8%',
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
    deleteButton: {
        backgroundColor: '#ff4d4d',
        padding: 10,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});