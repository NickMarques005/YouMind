import React from 'react'
import { Stack } from '@navigation/Stack'
import CurrentChat from '@features/app/pages/both/treatment/pages/chat/components/current_chat/CurrentChat';
import { UserData } from 'types/user/User_Types';
import { ChatUser } from 'types/chat/Chat_Types';
import ChatProfile from '@features/app/pages/both/treatment/pages/chat/components/profile/ChatProfile';

const ChatStack = () => {

    return (
        <Stack.Navigator initialRouteName={'current_chat'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="current_chat" component={CurrentChat} />
            <Stack.Screen name="chat_profile" component={ChatProfile} />
        </Stack.Navigator>
    )
}

export default ChatStack;