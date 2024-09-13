import React, { useCallback } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { ChatUser, MessageSelected, MessageTemplate } from 'types/chat/Chat_Types';
import { UserData, UserType } from 'types/user/User_Types';
import DefaultLoading from '@components/loading/DefaultLoading';
import { screenHeight } from '@utils/layout/Screen_Size';
import { LoadingStructure } from 'types/loading/Loading_Types';
import TaggedMessage from './TaggedMessage';

interface TaggedMessageListProps {
    markedMessages: MessageTemplate[];
    userType: string | undefined;
    userData: UserData | undefined;
    chatUser: ChatUser;
    selectedMessages: MessageSelected[];
    flatListRef: React.RefObject<FlatList<any>>;
    viewabilityConfig: { itemVisiblePercentThreshold: number; }
    handleLongPressMessage: (message: MessageSelected) => void;
    handleTapMessage: (message: MessageSelected) => void;
    onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const TaggedMessageList = ({
    markedMessages,
    userType,
    userData,
    chatUser,
    viewabilityConfig,
    selectedMessages,
    flatListRef,
    handleLongPressMessage,
    handleTapMessage,
    onScroll
}: TaggedMessageListProps) => {

    const renderMessageItem = useCallback(({ item, index }: { item: MessageTemplate, index: number }) => {
        const isRead = chatUser?.uid && item.readBy && item.readBy.includes(chatUser.uid) ? true : false;
        const userName = item.sender === userData?._id ? "Você" : chatUser?.name;

        return (
            <TaggedMessage
                isRead={isRead}
                key={index.toString()}
                avatar={item.sender === userData?._id ? userData.avatar : chatUser?.avatar}
                message={item}
                ownMessage={item.sender === userData?._id}
                userType={userData?.type as UserType}
                userName={userName}
                audioUrl={item.audioUrl}
                duration={item.duration}
                selectedMessages={selectedMessages}
                handleLongPressMessage={handleLongPressMessage}
                handleTapMessage={handleTapMessage}
                userData={userData}
            />
        );
    }, [markedMessages, userType, userData, chatUser, selectedMessages]);

    return (
        <FlatList
            data={markedMessages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderMessageItem}
            ref={flatListRef}
            extraData={selectedMessages}
            viewabilityConfig={viewabilityConfig}
            style={{ width: '100%' }}
            contentContainerStyle={{ width: '100%' }}
            onScroll={onScroll}
        />
    );
};

export default TaggedMessageList;