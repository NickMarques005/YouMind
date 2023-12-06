import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { screenHeight, screenWidth } from '../../screen_size/Screen_Size';
import { LinearGradient } from 'expo-linear-gradient';
import { Treatment, UseTreatment } from '../../../contexts/TreatmentContext';
import { UseAuth } from '../../../contexts/AuthContext';
import ChatTemplateUser from './ChatTemplateUser';

interface LastChatProps {
    handleChat: (other_members: Treatment) => void
}

function LastChatList({handleChat}: LastChatProps) {
    const { treatment_state } = UseTreatment();
    const { authData } = UseAuth();

    return (
        <>
            {
                treatment_state.treatments.map((user) => (
                    <ChatTemplateUser key={user.email} user={user} authData={authData} handleChat={handleChat}/> 
                ))
            }
        </>
    )
}

export default LastChatList;