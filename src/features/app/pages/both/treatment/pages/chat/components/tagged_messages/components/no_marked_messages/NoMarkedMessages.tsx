import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { responsiveSize } from '@utils/layout/Screen_Size'
import { UserType } from 'types/user/User_Types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface NoMarkedMessagesProps {
    userType: UserType
}

const NoMarkedMessages = ({ userType }: NoMarkedMessagesProps) => {

    const iconSize = responsiveSize * 0.2;

    const noMarkedMessagesStyle = styles(iconSize, userType);

    return (
        <View style={noMarkedMessagesStyle.container}>
            <View style={noMarkedMessagesStyle.iconContainer}>
                <MaterialIcons name="stars" size={iconSize * 0.6} color="rgba(255, 255, 255, 1)" />
            </View>
            <View style={noMarkedMessagesStyle.titleContainer}>
                <Text style={noMarkedMessagesStyle.title}>
                    {
                        "Toque e segure qualquer mensagem em uma conversa para marcá-la e poder encontrá-la facilmente mais tarde"
                    }
                </Text>
            </View>
        </View>
    )
}

export default NoMarkedMessages

const styles = (iconSize: number, userType: UserType) => StyleSheet.create({
    container: {
        width: '100%',
        height: '90%',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer: {
        width: iconSize,
        height: iconSize,
        borderRadius: iconSize / 2,
        backgroundColor: userType === 'patient' ? '#6b2880' : '#37756d',
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        width: '75%',

    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: userType === 'patient' ? '#3d2345' : '#23453e'
    }
})