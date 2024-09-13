import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { MessageSelected } from 'types/chat/Chat_Types'
import { LoadingStructure } from 'types/loading/Loading_Types';
import { useSendMessageToNoteBehavior } from './hooks/useSendMessagesToNoteBehavior';
import DefaultLoading from '@components/loading/DefaultLoading';
import { responsiveSize, screenWidth } from '@utils/layout/Screen_Size';

interface ButtonSendMessagesToNoteParams {
    selectedMessages: MessageSelected[];
    sendToNoteLoading: LoadingStructure;
    handleSendMessageToNoteModal: () => void;
}

const ButtonSendMessagesToNote = ({ selectedMessages, sendToNoteLoading, handleSendMessageToNoteModal }: ButtonSendMessagesToNoteParams) => {

    const { verifySelectedMessagesToAdd } = useSendMessageToNoteBehavior();
    const loadingIconSize = responsiveSize * 0.08;
    const sendButtonSize = responsiveSize * 0.16;
    const sendButtonStyle = styles(sendButtonSize);

    return (
        <View style={{
            width: '94%',
            bottom: 10,
            position: 'absolute',
            alignItems: 'center',
        }}>
            <TouchableOpacity
                disabled={selectedMessages.length === 0}
                onPress={handleSendMessageToNoteModal}
                style={[sendButtonStyle.sendButton, { opacity: selectedMessages.length === 0 ? 0.5 : 1 }]}>
                <LinearGradient colors={['#14314d', '#264f6e']} style={[sendButtonStyle.sendGradient,
                    { }
                ]}>
                    <View style={{
                        flex: 1, flexDirection: 'row', alignItems: 'center'
                    }}>{
                            sendToNoteLoading.loading ?
                                <DefaultLoading size={loadingIconSize} color={'white'} />
                                :
                                <Text style={{
                                    fontSize: 16, color: '#e4f6fa',
                                    fontWeight: 'bold',
                                }}>
                                    {`Adicionar ${verifySelectedMessagesToAdd(selectedMessages)}`}
                                </Text>}
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonSendMessagesToNote

const styles = (sendButtonSize: number) => StyleSheet.create({
    container: {

    },
    sendButton: {
        width: screenWidth * 0.78,
        elevation: 5,
        borderRadius: sendButtonSize * 0.5,
        overflow: 'hidden'
    },
    sendGradient: {
        width: '100%', 
        height: sendButtonSize, 
        borderRadius: sendButtonSize * 0.5,
        alignItems: 'center',
        justifyContent: 'center',

    }
});