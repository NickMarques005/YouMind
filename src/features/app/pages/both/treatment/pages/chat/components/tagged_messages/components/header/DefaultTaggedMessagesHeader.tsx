import images from '@assets/images';
import { responsiveSize } from '@utils/layout/Screen_Size';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { UserType } from 'types/user/User_Types';

interface DefaultTaggedMessagesHeaderProps {
    userType: UserType;
    handleBackToChat: () => void;
}

const DefaultTaggedMessagesHeader: React.FC<DefaultTaggedMessagesHeaderProps> = ({
    userType,
    handleBackToChat
}) => {

    const backIconSize = responsiveSize * 0.07;
    const backIcon = images.generic_images.back.arrow_back_white;

    return (
        <View style={[styles.header_container, { backgroundColor: userType === 'doctor' ? '#3a94a6' : '#9b3aa6' }]}>
            <TouchableOpacity onPress={() => { handleBackToChat() }}>
                <Image style={{ width: backIconSize, height: backIconSize }} source={backIcon} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Mensagens Marcadas</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'flex-start',
        paddingHorizontal: 15
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },
    menuButton: {
        alignItems: 'center',
    },
});

export default DefaultTaggedMessagesHeader;