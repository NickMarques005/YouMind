import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, ScrollView, Image, TextInput, Platform, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { screenHeight, screenWidth } from '../../screen_size/Screen_Size';
import Message, { MessageType } from './Message';
import { UseForm } from '../../../contexts/FormContext';
import MiniLoading from '../../loading/MiniLoading';
import { CurrentChat, UseChat, User } from '../../../contexts/ChatContext';
import { UseHandleNavigateChat } from '../../../functions/chat/HandleActiveChat';
import { ChatService, ConversationTreatmentResponse } from '../../../services/ChatService';
import { UseAuth } from '../../../contexts/AuthContext';
import io, { Socket } from 'socket.io-client';
import UseSocketService from '../../../services/socket/SocketService';
import USE_ENV from '../../../services/server_url/ServerUrl';

interface ChatProps {
    user: User | null;
}

const ChatDoctor: React.FC<ChatProps> = ({ user }: ChatProps) => {
    const { authData } = UseAuth();
    const { redirectChat, handleRedirectChat} = UseChat();
    const { formData } = UseForm();
    const { serverUrl } = USE_ENV();

    const [messages, setMessages] = useState<MessageType[]>([]);
    const [conversation, setConversation] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState("");
    
    const NavigateChat = UseHandleNavigateChat();
    const [messagesLoading, setMessagesLoading] = useState(true);
    const socket = UseSocketService({url: serverUrl ? serverUrl : ""});

    const BackChat = () => {
        NavigateChat();
        if(redirectChat)
        {
            handleRedirectChat(null);
        }
    }

    const handleSocket = (conversationId: string) => {

        socket?.emit('joinRoom', conversationId);

        socket?.on('receiveMessage', (data) => {
            console.log("Nova mensagem do SOCKET: ", data);
            console.log("Tem mensagens anteriores");
            console.log("NOVA MENSAGEM: ", data);
            console.log("MENSAGENS: ", messages);
            setMessages((prevMessages) => [data, ...prevMessages]);
        });

    }

    const handleSendNewMessage = async () => {
        if (newMessage.trim() === '') {
            console.log("A mensagem não pode estar vazia");
            return;
        }

        try {
            if (!conversation) {
                return;
            }

            const newMessageData = {
                conversationId: conversation,
                content: newMessage
            }

            const saveMessageData = await ChatService.saveNewMessage(newMessageData, authData.token);

            if (saveMessageData.success) {
                const newMessage = saveMessageData.data as MessageType;

                const socket_new_message = {
                    _id: newMessage._id,
                    conversationId: conversation,
                    content: newMessage.content,
                    sender: newMessage.sender,
                    createdAt: newMessage.createdAt,
                    updatedAt: newMessage.updatedAt
                }

                socket?.emit("sendMessage", socket_new_message);

                setNewMessage('');
                
            }
            else {
                console.log("Erro ao enviar a mensagem");
                
            }

        }
        catch (err) {
            console.log("Erro ao processar a mensagem:", err);
            
        }
    }

    useEffect(() => {
        const FetchChatData = async () => {
            try {
                const ConversationTreatmentData = await ChatService.getConversationTreatment({
                    email_1: formData.email,
                    email_2: user?.email || ''
                });

                if (ConversationTreatmentData.success) {
                    console.log("ID Conversation: ", ConversationTreatmentData.data);
                    const conversationId = ConversationTreatmentData.data as string;
                    handleSocket(conversationId);
                    console.log(conversationId);
                    setConversation(conversationId);
                    const MessagesData = await ChatService.getMessages(conversationId);

                    if (MessagesData.success) {
                        const fetchedMessages = MessagesData.data?.reverse();
                        console.log(fetchedMessages);
                        if (fetchedMessages) {

                            setMessages(fetchedMessages);
                        }
                        setMessagesLoading(false);
                    }
                    else {
                        console.log("Erro ao buscar dados de mensagens!!");
                        setMessagesLoading(false);
                    }
                }
                else {
                    console.log("Erro ao buscar dados de conversa");
                    setMessagesLoading(false);
                }
            }
            catch (err) {
                console.log("Deu erro ao buscar dados de conversa");
                setMessagesLoading(false);
            }
        }

        FetchChatData();

        return () => {
            
            socket?.disconnect();
            setMessages([]);
        };

    }, [formData.email, user]);



    return (
        <>
            <LinearGradient colors={['#48c7b4', '#458aa1']} style={styleChatDoctor.header_Chat}>
                <TouchableOpacity onPress={() => BackChat()}>
                    <Image style={{ width: 30, height: 30 }} source={require('../../../assets/init/back/arrow_back_white.png')} />
                </TouchableOpacity>
                <View style={styleChatDoctor.otherAccount_View}>

                    <TouchableOpacity style={styleChatDoctor.otherAccount_Button}>
                        <Image
                            source={require('../../../assets/app_doctor/chat/user_icon_chat.png')}
                            style={styleChatDoctor.otherAccount_Image}
                        />
                    </TouchableOpacity>

                    <View style={{ display: 'flex', gap: 0, height: '100%', width: '76%', paddingVertical: 20 }}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styleChatDoctor.otherUser_Text}>
                            {
                                user && user.name ? user.name : "Médico"
                            }
                        </Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 14, color: '#cbd1d6' }}>
                            Ultima vez online há 40 minutos atrás
                        </Text>
                    </View>

                </View>

                <View style={styleChatDoctor.threepoints_View}>
                    <TouchableOpacity style={styleChatDoctor.threepoints_Button}>
                        <Image
                            source={require('../../../assets/three_points.png')}
                            style={styleChatDoctor.threepoints_Image}
                        />
                    </TouchableOpacity>
                </View>

            </LinearGradient>


            <KeyboardAvoidingView style={{ flex: 1 }}
                keyboardVerticalOffset={-50}
                behavior={Platform.OS === 'ios' ? 'padding' : "height"}>
                <LinearGradient colors={['#fcf7fc', '#bed3e6']} style={styleChatDoctor.chat}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={styleChatDoctor.chatContent_View}>

                            {
                                messages && messages.length !== 0 ?
                                    messages.map((item, index) => (
                                        <Message key={index.toString()} message={item} ownMessage={item.sender === formData.id} showUserIcon={index == 0 || (index > 0 && item.sender !== messages[index + 1]?.sender)} />
                                    ))
                                    :
                                    <View style={{ width: '100%', height: screenHeight * 0.9, justifyContent: 'center' }}>
                                        <MiniLoading />
                                    </View>
                            }
                        </View>
                    </ScrollView><View style={[styleChatDoctor.chatContent_View]}>
                        {

                            !messagesLoading ?
                                <FlatList
                                    data={messages}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <Message
                                            key={index.toString()}
                                            message={item}
                                            ownMessage={item.sender === formData.id}
                                            showUserIcon={
                                                index === 0 && item.sender !== messages[index + 1]?.sender ||
                                                (index > 0 && item.sender !== messages[index + 1]?.sender)
                                            }

                                        />
                                    )}
                                    inverted
                                    style={{ width: '100%', height: '70%' }}
                                    contentContainerStyle={{ width: '100%', paddingVertical: 30, paddingTop: screenHeight * 0.1 }}
                                />
                                :
                                <View style={{ width: '100%', height: screenHeight * 0.9, justifyContent: 'center' }}>
                                    <MiniLoading />
                                </View>

                        }
                    </View>

                    <View style={styleChatDoctor.textInput_View}>
                        <View style={styleChatDoctor.input_View}>
                            <TextInput
                                style={styleChatDoctor.chat_TextInput}
                                placeholder='Mensagem'
                                placeholderTextColor='white'
                                onChangeText={(value) => setNewMessage(value)}
                                value={newMessage}
                            >
                            </TextInput>
                            <View style={styleChatDoctor.chatButtons_View}>
                                <TouchableOpacity style={styleChatDoctor.chat_Button}>
                                    <Image
                                        source={require('../../../assets/icon_emoji.png')}
                                        style={styleChatDoctor.chatEmoji_Image}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => handleSendNewMessage()} style={styleChatDoctor.chat_Button}>
                                    <Image
                                        source={require('../../../assets/app_doctor/chat/icon_envio.png')}
                                        style={styleChatDoctor.chatEnvio_Image}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>


                        <TouchableOpacity style={styleChatDoctor.chatAudio_Button}>
                            <Image
                                source={require('../../../assets/app_doctor/chat/icon_audio.png')}
                                style={styleChatDoctor.chatAudio_Image}
                            />
                        </TouchableOpacity>
                    </View>

                </LinearGradient>
            </KeyboardAvoidingView>
        </>
    )
}

const styleChatDoctor = StyleSheet.create({
    header_Chat: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: screenWidth,
        height: screenHeight * 0.136,
        top: 0,
        zIndex: 1,
        paddingVertical: 10,
        paddingLeft: 15,
        paddingRight: 20,
        paddingBottom: screenHeight * 0.015,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 7,
        shadowRadius: 3.84,
        elevation: 80,

    },
    otherAccount_View: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '78%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 5,
    },
    otherAccount_Button: {
        borderRadius: 50,
    },
    otherAccount_Image: {
        borderRadius: 50,
        width: 60,
        height: 60,
    },
    otherUser_Text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    threepoints_View: {
        height: '100%',
        marginTop: screenHeight * 0.01,
        alignItems: 'center',
        justifyContent: 'center',
    },
    threepoints_Button: {
        alignItems: 'center'
    },
    threepoints_Image: {
        width: 25,
        height: 25
    },
    chat: {
        flex: 1,
        width: screenWidth,
        zIndex: 1,
        justifyContent: 'flex-end',
        paddingBottom: screenHeight * 0.1
    },
    chatContent_View: {
        width: '100%',
        minHeight: screenHeight - screenHeight * 0.136 - screenHeight * 0.1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    textInput_View: {
        width: '100%',
        position: 'absolute',
        height: screenHeight * 0.11,
        bottom: screenHeight * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

    },
    input_View: {
        width: screenWidth * 0.78,
        height: screenHeight * 0.07,
        borderRadius: 35,
        flexDirection: 'row',
        backgroundColor: '#1e254f',
        borderColor: '#84b1f5',
        borderWidth: 2,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
        paddingTop: 10
    },
    chat_TextInput: {
        width: screenWidth * 0.56,
        height: screenHeight * 0.046,
        marginLeft: -3,
        fontSize: 14,
        paddingLeft: 20,
        paddingBottom: 8,
        color: 'white',

    },
    chatButtons_View: {
        flexDirection: 'row',
    },
    chat_Button: {
        width: screenWidth * 0.08,
        height: screenHeight * 0.04,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 6
    },
    chatEnvio_Image: {
        width: '80%',
        height: '80%'
    },
    chatEmoji_Image: {
        width: '80%',
        height: '80%'
    },
    chatAudio_Button: {
        width: screenWidth * 0.142,
        height: screenHeight * 0.070,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 70,
        marginLeft: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    chatAudio_Image: {
        width: '100%',
        height: '100%',

    }
});


export default ChatDoctor