import { View, StyleSheet } from 'react-native'
import React from 'react'
import { screenWidth } from '@utils/layout/Screen_Size';
import Header from './Header';
import DefaultLoading from '@components/loading/DefaultLoading';
import { UseLoading } from '@hooks/loading/UseLoading';
import Content from './Content';
import { UseChatDataHandling } from '../../hooks/UseChatDataHandling';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UseChat } from '@providers/ChatProvider';
import { UseTreatmentNavigation } from '../../../../hooks/UseTreatmentNavigation';
import { UseChatBehavior } from '../../hooks/UseChatBehavior';


const CurrentChat = () => {
    const { userData } = UseForm();
    const { currentChat, redirectChat } = UseChat();
    const { singleMember } = UseChatBehavior({ currentChat, redirectChat });
    const { navigateToTreatmentScreen } = UseTreatmentNavigation();
    const { loading, setLoading } = UseLoading(true);
    const { messages, conversation, socket, getMessages, page, handleReadMessage } = UseChatDataHandling({ setLoading, member: singleMember, user: userData })

    return (
        <View style={styles.currentChat_View}>
            <Header navigateToTreatmentScreen={navigateToTreatmentScreen} userType={userData?.type} chatUser={singleMember} />
            {
                loading ?
                    <DefaultLoading size={50} color={userData?.type === 'doctor' ? '#348b91' : '#7d3491'} />
                    :
                    <Content handleReadMessage={handleReadMessage} page={page} getMessages={getMessages} userType={userData?.type} chatUser={singleMember} userData={userData} messages={messages} conversation={conversation} socket={socket} />
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