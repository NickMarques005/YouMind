import React from 'react'
import { Stack } from '@navigation/Stack'
import CurrentChat from '@features/app/pages/both/treatment/pages/chat/components/current_chat/CurrentChat';
import TaggedMessages from '@features/app/pages/both/treatment/pages/chat/components/tagged_messages/TaggedMessages';
import SendMessageToNote from '@features/app/pages/both/treatment/pages/chat/components/send_to_notes/SendMessageToNote';

const ChatStack = () => {

    return (
        <Stack.Navigator initialRouteName={'current_chat'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="current_chat" component={CurrentChat} />
            <Stack.Screen name="tagged_messages" component={TaggedMessages} />
            <Stack.Screen name="send_to_notes" component={SendMessageToNote} />
        </Stack.Navigator>
    )
}

export default ChatStack;