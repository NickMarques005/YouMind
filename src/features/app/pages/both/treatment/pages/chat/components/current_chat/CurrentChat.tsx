import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { responsiveSize, screenWidth } from '@utils/layout/Screen_Size';
import DefaultLoading from '@components/loading/DefaultLoading';
import Content from './content/Content';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UseChatBehavior } from '../../hooks/UseChatBehavior';
import { useMessageSelection } from './hooks/useMessageSelection';
import { UserType } from 'types/user/User_Types';
import MainHeaderChat from './header/MainHeaderChat';
import { useMessageHandling } from './hooks/useMessageHandling';
import MessageDeleteModal from '@components/modals/chat/message_delete/MessageDeleteModal';
import { UseLoading } from '@hooks/loading/UseLoading';
import ButtonSendMessagesToNote from './content/note/ButtonSendMessagesToNote';
import SendMessageToNoteModal from '@components/modals/chat/send_to_note/SendMessageToNoteModal';
import { useSendMessageToNoteHandling } from './hooks/useSendMessageToNoteHandling';
import { UseChat } from '@features/app/providers/bridge/ChatProvider';

const CurrentChat = () => {
    const { userData } = UseForm();
    const sendToNoteLoading = UseLoading();
    const {
        currentChat,
        page,
        messages,
        currentMentionedMessage,
        currentMessageScrollingId,
        currentChatNote,
        handleCurrentMentionedMessage,
        clearCurrentMentionedMessage,
        handleAddNewMessage,
        handleReadMessage,
        handleGetMessages,
        handleSendMessage,
        handleDeleteMessages,
        handleMarkMessages,
        clearCurrentMessageScrolling,
        clearCurrentChatNote,
        chatLoading,
        fetchMessagesLoading
    } = UseChat();

    const { selectedMessages, isSelecting, handleLongPressMessage,
        handleTapMessage, clearSelection } = useMessageSelection({ currentChatNote });

    const { handleChatMenu, chatMenu, handleChatNavigateBack,
        messageDeleteModal, sendMessagesToNoteModal, handleMessageDeleteModal, handleSendMessageToNoteModal
    } = UseChatBehavior({});
    const { deleteSelectedMessages, markSelectedMessages, replySelectedMessage
    } = useMessageHandling({ handleDeleteMessages, handleMarkMessages, handleCurrentMentionedMessage, clearSelection });

    const sendMessageToNoteHandling = useSendMessageToNoteHandling({ sendToNoteLoading, userType: userData?.type as UserType });
    const loadingIconSize = responsiveSize * 0.08;

    return (
        <View style={styles.currentChat_View}>
            <MainHeaderChat
                currentMentionedMessage={currentMentionedMessage}
                replySelectedMessage={replySelectedMessage}
                userType={userData?.type as UserType}
                chatUser={currentChat}
                chatMenu={chatMenu}
                isSelecting={isSelecting}
                selectedMessages={selectedMessages}
                currentChatNote={currentChatNote}
                sendToNoteLoading={sendToNoteLoading}
                handleChatMenu={handleChatMenu}
                handleChatNavigateBack={handleChatNavigateBack}
                clearSelection={clearSelection}
                handleMessageDeleteModal={handleMessageDeleteModal}
                markSelectedMessages={markSelectedMessages}
                clearCurrentChatNote={clearCurrentChatNote}
            />
            {

                chatLoading.loading || !currentChat ?
                    <DefaultLoading size={loadingIconSize} color={userData?.type === 'doctor' ? '#348b91' : '#7d3491'} />
                    :
                    <Content
                        page={page}
                        userType={userData?.type as UserType}
                        chatUser={currentChat}
                        userData={userData}
                        messages={messages}
                        isSelecting={isSelecting}
                        currentChatNote={currentChatNote}
                        fetchMessagesLoading={fetchMessagesLoading}
                        selectedMessages={selectedMessages}
                        currentMentionedMessage={currentMentionedMessage}
                        currentMessageScrollingId={currentMessageScrollingId}
                        sendToNoteLoading={sendToNoteLoading}
                        handleSendMessage={handleSendMessage}
                        handleGetMessages={handleGetMessages}
                        handleLongPressMessage={handleLongPressMessage}
                        handleTapMessage={handleTapMessage}
                        handleAddNewMessage={handleAddNewMessage}
                        handleReadMessage={handleReadMessage}
                        clearSelection={clearSelection}
                        clearCurrentMentionedMessage={clearCurrentMentionedMessage}
                        clearCurrentMessageScrollingId={clearCurrentMessageScrolling}
                        handleSendMessageToNoteModal={handleSendMessageToNoteModal}
                    />
            }
            {
                messageDeleteModal &&
                <MessageDeleteModal
                    isVisible={messageDeleteModal}
                    onClose={handleMessageDeleteModal}
                    onDelete={() => deleteSelectedMessages(selectedMessages)}
                    selectedMessages={selectedMessages}
                    userType={userData?.type as UserType}
                />
            }
            {
                sendMessagesToNoteModal && currentChatNote && sendMessageToNoteHandling &&
                <SendMessageToNoteModal
                    isVisible={sendMessagesToNoteModal}
                    onClose={handleSendMessageToNoteModal}
                    onSend={sendMessageToNoteHandling.handleSendMessagesToNote}
                    selectedMessages={selectedMessages}
                    currentChatNote={currentChatNote}
                    onSuccess={clearCurrentChatNote}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    currentChat_View: {
        flex: 1,
        width: screenWidth,
    }
});

export default CurrentChat;