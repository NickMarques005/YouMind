import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { screenHeight, screenWidth } from '../../screen_size/Screen_Size';
import { UseAuth } from '../../../contexts/AuthContext';
import ChatPatient from './ChatPatient';
import ChatDoctor from './ChatDoctor';
import { UseChat, User } from '../../../contexts/ChatContext';
import LoadingAuthScreen from '../../loading/LoadingAuthScreen';


const ChatEnvironment = () => {
    const { authData } = UseAuth();
    const { currentChat } = UseChat();
    const [singleMember, setSingleMember] = useState<User | null>(null);

    useEffect(() => {
        if (currentChat && currentChat.members.length === 1) {
            console.log(currentChat);
            setSingleMember(currentChat.members[0])
        }
        else {
            console.log("Mais de um membro");
            console.log(currentChat);
            setSingleMember(null);
        }
    }, [currentChat]);


    return (
        <View style={styleChatEnvironment.chatEnvironment_View}>
            {
                currentChat && currentChat.members ?
                    (
                        authData.type === 'patient' ? (
                            <ChatPatient user={currentChat.members.length === 1 ? singleMember : null}/>
                        ) : (
                            <ChatDoctor user={currentChat.members.length === 1 ? singleMember : null}/>
                        )
                    )
                : 
                <LoadingAuthScreen/>
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