import React, { useCallback } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { ChatUser, MessageSelected, MessageTemplate, ProcessedMessageItem } from 'types/chat/Chat_Types';
import Message from './Message';
import MessageDate from './MessageDate';
import { UserData, UserType } from 'types/user/User_Types';
import DefaultLoading from '@components/loading/DefaultLoading';
import { screenHeight } from '@utils/layout/Screen_Size';
import { LoadingStructure } from 'types/loading/Loading_Types';
import { NoteTemplate } from 'types/app/doctor/notepad/Notepad_Types';

interface MessageItemProps {
    processedMessages: ProcessedMessageItem[];
    messages: MessageTemplate[];
    userType: UserType;
    userData: UserData | undefined;
    chatUser: ChatUser;
    viewabilityConfig: { itemVisiblePercentThreshold: number; }
    selectedMessages: MessageSelected[];
    fetchMessagesLoading: LoadingStructure;
    page: number;
    flatListRef: React.RefObject<FlatList<any>>;
    handleViewableItemsChanged: ({ viewableItems }: any) => void;
    handleGetMessages: (page: number) => void;
    handleLongPressMessage: (message: MessageSelected, chatNote?: NoteTemplate) => void;
    handleTapMessage: (message: MessageSelected) => void;
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
    scrollToIndexFailed: (error: {
        index: number;
        averageItemLength: number;
    }) => void;
}

const MessageList = ({ 
    processedMessages,
    messages,
    userType, 
    userData, 
    chatUser,
    viewabilityConfig,
    fetchMessagesLoading,
    page,
    selectedMessages,
    flatListRef,
    handleGetMessages,
    handleViewableItemsChanged,
    handleLongPressMessage,
    handleTapMessage,
    onScroll,
    scrollToIndexFailed
}: MessageItemProps) => {

    const renderMessageItem = useCallback(({ item, index }: { item: ProcessedMessageItem, index: number }) => {
        if (item.type === 'dateLabel') {
            return <MessageDate date={item.date} userType={userType} />;
        } else {
            const messageData = item.data;
            const nextItem = processedMessages[index + 1];
            const isDifferentSender = nextItem && nextItem.type === 'message' && messageData.sender !== nextItem.data.sender;
            const isLastMessage = index === processedMessages.length - 1;
            const nextIsDate = nextItem && nextItem.type === 'dateLabel';
            const showUserIcon = isLastMessage || isDifferentSender || nextIsDate;
            const isRead = chatUser?.uid && messageData.readBy && messageData.readBy.includes(chatUser.uid) ? true : false;
            const senderName = userData?._id ===  messageData.sender ? "Você" : chatUser?.name;

            return (
                <Message
                    isRead={isRead}
                    key={index.toString()}
                    avatar={messageData.sender === userData?._id ? userData.avatar : chatUser?.avatar}
                    message={messageData}
                    ownMessage={messageData.sender === userData?._id}
                    showUserIcon={showUserIcon}
                    userType={userType}
                    senderType={messageData.senderType}
                    audioUrl={messageData.audioUrl}
                    duration={messageData.duration}
                    selectedMessages={selectedMessages}
                    senderName={senderName}
                    userData={userData}
                    handleLongPressMessage={handleLongPressMessage}
                    handleTapMessage={handleTapMessage}
                />
            );
        }
    }, [userData, chatUser, selectedMessages, processedMessages, messages]);

    return (
        <FlatList
            data={processedMessages}
            keyExtractor={(item, index) => item.type === 'message' ? item.data._id : index.toString() }
            renderItem={renderMessageItem}
            ref={flatListRef}
            inverted
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={handleViewableItemsChanged}
            style={{ width: '100%', }}
            contentContainerStyle={{ width: '100%', paddingVertical: 30, paddingTop: screenHeight * 0.1 }}
            onScroll={onScroll}
            onEndReached={() => handleGetMessages(page)}
            onEndReachedThreshold={0.7}
            ListFooterComponent={
                fetchMessagesLoading.loading ?
                    <DefaultLoading style={{}} size={18} color={userData?.type === 'patient' ? '#6c456e' : '#456e6b'} />
                    : null
            }
            onScrollToIndexFailed={scrollToIndexFailed}
        />
    );
};

export default MessageList;