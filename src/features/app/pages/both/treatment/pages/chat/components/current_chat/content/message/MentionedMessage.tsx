import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { UserData, UserType } from 'types/user/User_Types';
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { UseChat } from '@features/app/providers/bridge/ChatProvider';

interface MentionedMessageProps {
    _id: string;
    senderId: string;
    senderName: string;
    senderType: UserType;
    content: string;
    hasAudio?: boolean;
    isInput?: boolean;
    userData: UserData;
    clearCurrentMentionedMessage?: () => void;
}

const MentionedMessage = (
    {
        _id, senderId, userData,
        senderName, senderType,
        content, hasAudio,
        isInput, clearCurrentMentionedMessage
    }: MentionedMessageProps
) => {

    const { handleCurrentMessageScrolling } = UseChat();
    const clearMentionedMessageIconSize = responsiveSize * 0.04;
    const audioMessageIconSize = responsiveSize * 0.04;

    return (
        <View style={{
            maxHeight: screenHeight * 0.1,
            minHeight: screenHeight * 0.07,
            marginBottom: '2%',
            backgroundColor: 'rgba(255,255,255, 0.1)',
            borderRadius: 10,
            overflow: 'hidden'
        }}>
            <TouchableOpacity disabled={isInput} onPress={() => handleCurrentMessageScrolling(_id)} style={{ width: '100%', flex: 1, }}>
                <View style={{
                    flex: 1, padding: 5, borderLeftWidth: 5,
                    borderLeftColor: senderType === 'doctor' ? '#6cf5e5' : '#f56cf3',
                    gap: 2
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 13, color: senderType === 'doctor' ? '#c1d8db' : '#d4c1db' }}>
                            { senderId === userData?._id ? "Você" : senderName}
                        </Text>
                        {
                            isInput && clearCurrentMentionedMessage &&
                            <TouchableOpacity onPress={clearCurrentMentionedMessage}>
                                <View style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)', width: clearMentionedMessageIconSize,
                                    height: clearMentionedMessageIconSize,
                                    borderRadius: clearMentionedMessageIconSize * 0.5,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <MaterialCommunityIcons name="window-close" size={clearMentionedMessageIconSize * 0.7} color="white" />
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={{ flexDirection: 'row', gap: 3, alignItems: 'center' }}>
                        {
                            hasAudio &&
                            <View>
                                <MaterialCommunityIcons name="microphone" size={audioMessageIconSize} color={'rgba(255, 255, 255, 0.7)'} />
                            </View>
                        }
                        <Text
                            style={{
                                color: 'rgba(255, 255, 255, 0.75)',
                                fontSize: 14,
                            }}
                            numberOfLines={3}
                        >
                            {content}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default MentionedMessage;

const styles = StyleSheet.create({


});