import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size'
import { TypeNotification } from 'types/notification/Notification_Types'
import images from '@assets/images'
import { AppStackNavigation } from 'types/navigation/Navigation_Types'

interface Header {
    typeNotifications: TypeNotification[];
    navigate: (screenName: keyof AppStackNavigation) => void;
    handleFilterNotifications: (index: number) => void;
    userType: string | undefined;
}

const Header = ({ typeNotifications, navigate, handleFilterNotifications, userType }: Header) => {
    
    const iconBack = images.generic_images.back.default_back_gray;
    const color = '#f2fafa';

    return (
        <LinearGradient
            colors={userType === 'doctor' ? ['transparent', '#c3dde6', '#9bd1ce'] : ['transparent', 'rgba(207, 195, 230, 0.5)', 'rgba(178, 124, 196, 0.4)']}
            start={{ x: 0, y: 0.3 }}
            end={{ x: 0, y: 1 }}
            style={styles.notificationsHeader_view}>

            <View style={{ width: '100%', alignItems: 'flex-end', }}>
                <TouchableOpacity style={styles.notificationsClose_button} onPress={() => navigate('main_page')}>
                    <Image
                        style={styles.notificationsClose_img}
                        source={iconBack}
                    />
                </TouchableOpacity>
                <View style={styles.notificationsTitle_view}>
                    <Text style={styles.notificationsTitle_text}>Notificações</Text>
                </View>
            </View>

            <View style={styles.typeNotifications_view}>
                {
                    typeNotifications.map((item, index) => (
                        <LinearGradient
                            colors={userType === 'doctor' && item.isOn ? ['#2b425e', '#1e6569', "#53b1b8"] : userType === 'patient' && item.isOn ? ['#2b425e', '#651e69', "#9853b8",] : ['transparent', 'transparent', 'transparent']}
                            start={{ x: 0.1, y: 0 }}
                            end={{ x: 0.8, y: 0.8 }}
                            key={index}
                            style={styles.typeNotificationsTemplate_view}>
                            <TouchableOpacity
                                style={styles.typeNotificationsTemplate_button}
                                onPress={() => handleFilterNotifications(index) }
                            >
                                <Text style={{ color: item.isOn ? 'white' : '#1c1b30' }}>{item.typeName}</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    ))
                }
            </View>

        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    notificationsHeader_view: {
        position: 'absolute',
        paddingHorizontal: 35,
        paddingVertical: 35,
        width: '100%',
        gap: 25,
        zIndex: 3,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    notificationsTitle_view: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',

    },
    notificationsTitle_text: {
        fontSize: 22,
        color: '#3f3059'
    },
    notificationsClose_button: {

    },
    notificationsClose_img: {
        right: -10,
        width: 40,
        height: 40,
        opacity: 1
    },
    typeNotifications_view: {
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    typeNotificationsTemplate_view: {
        borderRadius: 10,
    },
    typeNotificationsTemplate_button: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        paddingVertical: 6,
        paddingHorizontal: 6,
    },
});

export default Header;