import { View, StyleSheet } from 'react-native'
import React from 'react'
import { responsiveSize, screenWidth } from '@utils/layout/Screen_Size';
import Header from './header/Header';
import DefaultLoading from '@components/loading/DefaultLoading';
import { UseLoading } from '@hooks/loading/UseLoading';
import Content from './content/Content';
import { UseChatDataHandling } from '../../hooks/UseChatDataHandling';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UseChat } from '@providers/ChatProvider';
import { UseTreatmentNavigation } from '../../../../hooks/UseTreatmentNavigation';
import { UseChatBehavior } from '../../hooks/UseChatBehavior';

const CurrentChat = () => {
    const { userData } = UseForm();
    const { currentChat, redirectChat } = UseChat();
    const { chat, handleChatMenu, chatMenu } = UseChatBehavior({ currentChat, redirectChat });
    const { navigateToTreatmentScreen } = UseTreatmentNavigation();
    const { loading, setLoading } = UseLoading(true);
    const { messages, socket,
        getMessages, page, handleReadMessage,
        handleAddNewMessage } = UseChatDataHandling({ setLoading, chat, user: userData });
    const loadingIconSize = responsiveSize * 0.08;

    return (
        <View style={styles.currentChat_View}>
            <Header
                navigateToTreatmentScreen={navigateToTreatmentScreen}
                userType={userData?.type}
                chatUser={chat}
                chatMenu={chatMenu}
                handleChatMenu={handleChatMenu}
            />
            {
                loading ?
                    <DefaultLoading size={loadingIconSize} color={userData?.type === 'doctor' ? '#348b91' : '#7d3491'} />
                    :
                    <Content handleAddNewMessage={handleAddNewMessage} handleReadMessage={handleReadMessage} page={page} getMessages={getMessages} userType={userData?.type} chatUser={chat} userData={userData} messages={messages} socket={socket} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    currentChat_View: {
        flex: 1,
        width: screenWidth,
    },
});

export default CurrentChat;