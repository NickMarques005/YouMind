import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveSize, screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { ChatUser, MessageSelected, MessageTemplate } from 'types/chat/Chat_Types';
import { UserData, UserType } from 'types/user/User_Types';
import { LoadingStructure } from 'types/loading/Loading_Types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useMessageListBehavior } from '../../current_chat/content/hooks/useMessageListBehavior';
import TaggedMessageList from './messages/TaggedMessageList';

interface TaggedContentHeaderProps {
    userType: UserType;
    userData?: UserData;
    chatUser: ChatUser;
    markedMessages: MessageTemplate[];
    selectedMessages: MessageSelected[];
    handleLongPressMessage: (message: MessageSelected) => void;
    handleTapMessage: (message: MessageSelected) => void;
}

const TaggedContent = ({
    userType, chatUser,
    markedMessages, userData, handleLongPressMessage, 
    handleTapMessage, selectedMessages
}: TaggedContentHeaderProps
) => {
    //Lista das mensagens
    const { showScrollToBottom, handleScroll, flatListRef, scrollToBottom } = useMessageListBehavior();

    const viewabilityConfig = { itemVisiblePercentThreshold: 50 };
    const scrollToBottomIconSize = responsiveSize * 0.08;
    const audioIconSize = responsiveSize * 0.14;

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient colors={['#fcf7fc', '#bed3e6']} style={styles.taggedMessagesBackground}>
                <TaggedMessageList
                    markedMessages={markedMessages}
                    viewabilityConfig={viewabilityConfig}
                    flatListRef={flatListRef}
                    userType={userType}
                    userData={userData}
                    chatUser={chatUser}
                    selectedMessages={selectedMessages}
                    onScroll={handleScroll}
                    handleLongPressMessage={handleLongPressMessage}
                    handleTapMessage={handleTapMessage}
                />

                <View style={[styles.textInput_View]}>
                    {
                        showScrollToBottom && (
                            <View style={{
                                width: audioIconSize, alignSelf: 'flex-end',
                                alignItems: 'center',
                                paddingBottom: 6
                            }}>
                                <TouchableOpacity
                                    style={{
                                        width: scrollToBottomIconSize,
                                        height: scrollToBottomIconSize, borderRadius: scrollToBottomIconSize * 0.5,
                                        backgroundColor: userType === 'patient' ? '#573b52' : '#3b5755',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onPress={scrollToBottom}
                                >
                                    <MaterialIcons name="keyboard-double-arrow-up" size={scrollToBottomIconSize * 0.7} color="rgba(255, 255, 255, 0.7)" />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    taggedMessagesBackground: {
        flex: 1,
        width: screenWidth,
        zIndex: 1
    },
    textInput_View: {
        width: '94%',
        bottom: 10,
        position: 'absolute',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    input_View: {
        width: screenWidth * 0.78,
        minHeight: screenHeight * 0.07,
        maxHeight: screenHeight * 0.15,
        borderRadius: 35,
        flexDirection: 'row',
        backgroundColor: '#1e254f',
        borderWidth: 2,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8,
        gap: 10,
    },
    chat_TextInput: {
        flex: 1,
        fontSize: 14,
        color: 'white',
        overflow: 'scroll',
    },
    chatButtons_View: {
        display: 'flex',
        alignSelf: 'flex-end'
    },
    chat_Button: {
        width: screenWidth * 0.08,
        height: screenHeight * 0.04,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatEnvio_Image: {
        width: '80%',
        height: '80%'
    },
    chatEmoji_Image: {
        width: '80%',
        height: '80%'
    },
    chatAudio_Button: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 70,
        marginLeft: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    chatAudio_Image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
})

export default TaggedContent;