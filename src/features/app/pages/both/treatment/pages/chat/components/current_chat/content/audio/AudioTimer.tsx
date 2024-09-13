import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { formatTimer } from '@utils/date/DateFormatting';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface AudioTimerProps {
    userType?: string;
    recordTime: number;
    isRecording: boolean;
}

const AudioTimer = ({ userType, recordTime, isRecording }: AudioTimerProps) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(40);

    useEffect(() => {
        if (isRecording) {
            opacity.value = withTiming(0.8, { duration: 500 });
            translateY.value = withTiming(0, { duration: 500 });
        } else {
            opacity.value = withTiming(0, { duration: 500 });
            translateY.value = withTiming(40, { duration: 500 });
        }
    }, [isRecording]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value }],
        };
    });


    return (

        <View style={[styles.container]}>
            {
                <Animated.View style={[styles.audioTimerView, animatedStyle, { backgroundColor: userType === 'doctor' ? '#1d3436' : '#361d35' }]}>
                    <Icon name="microphone" size={22} color="white" style={styles.icon} />
                    <Text style={styles.timer}>
                        {formatTimer(recordTime)}
                    </Text>
                </Animated.View>

            }
        </View>
    )
}

export default AudioTimer;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'flex-end',
        paddingBottom: 20,
    },
    audioTimerView: {
        flexDirection: 'row',
        opacity: 0.8,
        minWidth: '35%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        gap: 20,
    },
    timer: {
        color: 'white',
        fontSize: 20,
        letterSpacing: 1,
        fontWeight: '900'
    },
    icon: {

    }
})