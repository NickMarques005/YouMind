import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { screenHeight, screenWidth } from '../../../utils/layout/Screen_Size';
import { LinearGradient } from 'expo-linear-gradient';
import { Treatment, UseTreatment } from '../../../providers/TreatmentProvider';
import { UseAuth } from '../../../providers/AuthenticationProvider';
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