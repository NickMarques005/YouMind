import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import images from '@assets/images'

const NoNotifications = () => {
    
    const noNotificationsIcon = images.generic_images.notifications.no_notifications;
    
    return (
        <View style={styles.noNotifications_mainView}>
            <View style={styles.noNotificationsContent_view}>
                <View style={styles.noNotificationsIcon_view}>
                    <Image
                        style={styles.noNotificationsIcon_img}
                        source={noNotificationsIcon}
                    />
                </View>
                <View style={styles.noNotificationsInfo_view}>
                    <Text style={styles.noNotificationsTitle_text}>
                        Sua caixa de entrada está tranquila...
                    </Text>
                    <Text style={styles.noNotificationsSubtitle_text}>
                        Notificações serão enviadas para alertá-lo sobre o progresso do tratamento e atualizações importantes.
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    noNotifications_mainView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noNotificationsContent_view: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        top: -50
    },
    noNotificationsIcon_view: {
        display: 'flex',
        borderRadius: 5,
        overflow: 'hidden',
    },
    noNotificationsIcon_img: {
        width: 150,
        height: 150
    },
    noNotificationsInfo_view: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '70%'
    },
    noNotificationsTitle_text: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1c1e40',
        textAlign: 'center',
    },
    noNotificationsSubtitle_text: {
        fontSize: 16,
        textAlign: 'center',
        width: 250,
        color: '#86879c'
    }
});

export default NoNotifications