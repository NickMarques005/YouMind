import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { FormData } from 'types/auth/Form_Types';
import CountNotifications from '@features/app/pages/both/notifications/components/CountNotifications';
import images from '@assets/images';
import { UseAppNavigation } from '@features/app/hooks/UseAppNavigation';

interface TitleProps {
    name?: string;
    gender?: string;
}

const Title = ({ name, gender }: TitleProps) => {
    const { navigateToAppScreen } = UseAppNavigation();

    const homeHeader = images.app_doctor_images.home.home_header_doctor;
    const icon_notification = images.generic_images.notifications.icon_notification_typeA;
    const doctorNounGender = gender === "Feminino" ? "a" : "o";

    return (
        <ImageBackground
            source={homeHeader}
            style={styles.backgroundImage_HomeTitle}
        >
            <View style={styles.title_View}>

                <Text style={styles.title_Text}>{`Bem-vind${doctorNounGender},\n${"Dr. "}${name ? (name).split(' ')[0] : `Doutor${doctorNounGender}`}!`}</Text>
                <TouchableOpacity onPress={() => navigateToAppScreen('notifications')} style={styles.notify_Button}>
                    <Image
                        source={icon_notification}
                        style={styles.icon_Notification}
                    />
                    <CountNotifications/>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    view_Menu: {
        height: screenHeight * 0.14
    },
    backgroundImage_HomeTitle: {
        position: 'absolute',
        width: screenWidth,
        height: screenHeight * 0.45,
        display: 'flex',
        zIndex: 2,
    },
    title_View: {
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: screenHeight * 0.06,
        paddingHorizontal: screenWidth * 0.07,
    },
    title_Text: {
        fontSize: 28,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: 'white',
        top: 20,

    },
    notify_Button: {
        paddingTop: screenHeight * 0.02
    },
    icon_Notification: {
        width: 37,
        height: 37,
    },
});

export default Title