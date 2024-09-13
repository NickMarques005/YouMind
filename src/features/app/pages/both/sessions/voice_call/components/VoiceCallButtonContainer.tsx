import React from 'react';
import { View, StyleSheet } from 'react-native';
import VoiceCallButton from './VoiceCallButton';
import { responsiveSize } from '@utils/layout/Screen_Size';

const VoiceCallButtonContainer = () => {
    const iconSize = responsiveSize * 0.08;

    return (
        <View style={{
            width: '100%',
            paddingHorizontal: responsiveSize * 0.05,
        }}>
            <View style={[styles.container]}>
                <View style={styles.topRow}>
                    <VoiceCallButton
                        iconName="volume-high"
                        onPress={() => console.log('Viva Voz')}
                        iconSize={iconSize}
                    />
                    <VoiceCallButton
                        iconName="microphone-off"
                        onPress={() => console.log('Mutar')}
                        iconSize={iconSize}
                    />
                    <VoiceCallButton
                        iconName="camera-off"
                        onPress={() => console.log('Desligar Câmera')}
                        iconSize={iconSize}
                    />
                    <VoiceCallButton
                        iconName="phone-hangup"
                        onPress={() => console.log('Desligar')}
                        iconSize={iconSize}
                        style={styles.hangupButton}
                        iconColor="white"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba( 255, 255, 255, 0.06)',
        borderRadius: 20,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    hangupButton: {
        backgroundColor: 'red',
    },
});

export default VoiceCallButtonContainer;