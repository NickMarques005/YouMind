import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'



const ChatProfile = () => {
    const route = useRoute();


    return (
        <View>
            <Text>ChatProfile</Text>
        </View>
    )
}

export default ChatProfile