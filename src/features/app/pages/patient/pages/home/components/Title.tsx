import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import images from '@assets/images';
import CountNotifications from '@features/app/pages/both/notifications/components/CountNotifications';
import { UseAppNavigation } from '@features/app/hooks/navigation/UseAppNavigation';

interface TitleProps {
    name?: string;
    gender?: string;
}

const Title = ({ name, gender }: TitleProps) => {
    const { navigateToAppScreen  } = UseAppNavigation();

    const icon_notification = images.generic_images.notifications.icon_notification_typeA;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`Bem-vind${gender === "Feminino" ? "a" : "o"},\n${name ? (name).split(' ')[0] : "Paciente"}!`}</Text>
            <TouchableOpacity onPress={() => navigateToAppScreen('notifications')} style={styles.notifyButton}>
                <Image source={icon_notification} style={styles.notificationIcon} />
                <CountNotifications/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: screenHeight * 0.06,
        paddingHorizontal: screenWidth * 0.07,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: 'white',
    },
    notifyButton: {

    },
    notificationIcon: {
        width: 37,
        height: 37,
    },
});

export default Title;