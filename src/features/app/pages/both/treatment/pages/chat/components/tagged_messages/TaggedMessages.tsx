import { View } from 'react-native';
import React from 'react';
import { useTaggedMessagesBehavior } from './hooks/useTaggedMessagesBehavior';
import { useTaggedMessagesHandling } from './hooks/useTaggedMessagesHandling';
import MainTaggedMessagesHeader from './components/header/MainTaggedMessagesHeader';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { UserType } from 'types/user/User_Types';
import { useTaggedMessagesSelection } from './hooks/useTaggedMessageSelection';
import TaggedContent from './components/TaggedContent';
import NoMarkedMessages from './components/no_marked_messages/NoMarkedMessages';
import { UseChat } from '@features/app/providers/bridge/ChatProvider';

const TaggedMessages = () => {
    const { userData } = UseForm();
    const {
        currentChat,
        markedMessages,
        handleDeleteMessages,
        handleMarkMessages,
    } = UseChat();

    const { handleTaggedMenu, taggedMenu, 
        handleBackToChat, handleSelectTaggedMessageScrolling } = useTaggedMessagesBehavior();
        
    const { markedSelectedMessages, isSelecting, 
        handleLongPressMessage, handleTapMessage, clearSelection } = useTaggedMessagesSelection({ 
            handleSelectTaggedMessageScrolling
        });

    const {
        deleteSelectedMessages, unmarkSelectedMarkedMessages
    } = useTaggedMessagesHandling({
        handleDeleteMessages, handleMarkMessages, clearSelection
    });

    return (
        <View style={{ flex: 1 }}>
            <MainTaggedMessagesHeader
                handleBackToChat={handleBackToChat}
                userType={userData?.type as UserType}
                taggedMenu={taggedMenu}
                handleTaggedMenu={handleTaggedMenu}
                isSelecting={isSelecting}
                selectedMessages={markedSelectedMessages}
                clearSelection={clearSelection}
                deleteSelectedMessages={deleteSelectedMessages}
                unmarkSelectedMarkedMessages={unmarkSelectedMarkedMessages}
            />
            {
                currentChat && markedMessages.length !== 0 ?
                    <TaggedContent
                        userType={userData?.type as UserType}
                        chatUser={currentChat}
                        markedMessages={markedMessages}
                        userData={userData}
                        handleLongPressMessage={handleLongPressMessage}
                        handleTapMessage={handleTapMessage}
                        selectedMessages={markedSelectedMessages}
                    />
                    :
                    <NoMarkedMessages
                        userType={userData?.type as UserType}
                    />
            }
        </View>
    )
}

export default TaggedMessages