import { useState } from 'react';
import { UseChatNavigation } from '../../../hooks/UseChatNavigation';
import { UseChat } from '@features/app/providers/bridge/ChatProvider';

export const useTaggedMessagesBehavior = () => {
    const { navigateToChatScreen } = UseChatNavigation();
    const { handleCurrentMessageScrolling } = UseChat();
    const [taggedMenu, setTaggedMenu] = useState(false);

    const handleTaggedMenu = () => {
        setTaggedMenu(prev => !prev);
    };

    const handleBackToChat = () => {
        navigateToChatScreen('current_chat');
    };

    const handleSelectTaggedMessageScrolling = (_id: string) => {
        handleCurrentMessageScrolling(_id);
        handleBackToChat();
    }

    return {
        taggedMenu,
        handleTaggedMenu,
        handleBackToChat,
        handleSelectTaggedMessageScrolling
    };
};