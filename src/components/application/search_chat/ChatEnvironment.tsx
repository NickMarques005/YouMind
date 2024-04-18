import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { screenHeight, screenWidth } from '../../../utils/layout/Screen_Size';
import { UseAuth } from '../../../providers/AuthenticationProvider';
import ChatPatient from './treatment_pacient/ChatPatient';
import ChatDoctor from './treatment_doctor/ChatDoctor';
import { UseChat, User } from '../../../providers/ChatProvider';
import LoadingAuthScreen from '../../loading/LoadingAuthScreen';
import { UseHandleActiveChat } from '../../../hooks/chat/UseHandleActiveChat';

const ChatEnvironment = () => {
    const { authData } = UseAuth();
    const { currentChat, redirectChat} = UseChat();
    const [singleMember, setSingleMember] = useState<User | null>(null);
    const ActiveChat = UseHandleActiveChat();

    useEffect(() => {
        if (currentChat) {
            if (currentChat.members.length === 1) {
                console.log(currentChat);
                setSingleMember(currentChat.members[0])
            }
            else {
                console.log("Mais de um membro");
                console.log(currentChat);
                setSingleMember(null);
            }
        }
        else{
            if(redirectChat)
            {
                console.log(redirectChat);
                ActiveChat(redirectChat);
            }
        }

    }, [currentChat, redirectChat]);


    return (
        <View style={styleChatEnvironment.chatEnvironment_View}>
            {
                currentChat && currentChat.members ?
                    (
                        authData.type === 'patient' ? (
                            <ChatPatient user={currentChat.members.length === 1 ? singleMember : null} />
                        ) : (
                            <ChatDoctor user={currentChat.members.length === 1 ? singleMember : null} />
                        )
                    )
                    :
                    <LoadingAuthScreen />
            }
        </View>
    )
}

const styleChatEnvironment = StyleSheet.create({
    chatEnvironment_View: {
        width: '100%',
        height: screenHeight,
        zIndex: 2,
    },
});

export default ChatEnvironment;