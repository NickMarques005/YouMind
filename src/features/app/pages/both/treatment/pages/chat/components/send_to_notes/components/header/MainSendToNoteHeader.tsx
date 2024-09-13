import { View, StyleSheet } from 'react-native';
import React from 'react';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { UserType } from 'types/user/User_Types';
import { MessageSelected } from 'types/chat/Chat_Types';
import DefaultSendToNoteHeader from './DefaultSendToNoteHeader';

interface MainSendToNoteHeaderProps {
    userType: UserType;
    handleBackToChat: () => void;
}

const MainSendToNoteHeader = ({
    userType,
    handleBackToChat,
}: MainSendToNoteHeaderProps) => {


    return (
        <View style={[{ backgroundColor: userType === 'doctor' ? '#3a94a6' : '#9b3aa6' }, styles.mainContainer]}>
            <DefaultSendToNoteHeader
                handleBackToChat={handleBackToChat}
                userType={userType}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        width: screenWidth,
        height: screenHeight * 0.12,
        top: 0,
        zIndex: 1,
        paddingLeft: 15,
        paddingRight: 20,
        elevation: 80,
        alignItems: 'center',
    },
    menuButton: {
        alignItems: 'center',
    },
});

export default MainSendToNoteHeader;