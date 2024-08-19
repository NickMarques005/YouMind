import React, { useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, WithSpringConfig, interpolateColor, runOnJS, withTiming, Easing, SharedValue } from 'react-native-reanimated';
import { GestureDetector, GestureHandlerRootView, Gesture } from 'react-native-gesture-handler';
import { UserType } from 'types/user/User_Types';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';

interface InfoModalProps {
    userType: UserType;
    info: string;
    isVisible: boolean;
    positionStyle: any;
}

const InfoModal: React.FC<InfoModalProps> = ({
    userType, info, isVisible, positionStyle }) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    const styles = infoModalStyles(userType);

    useEffect(() => {
        if (isVisible) {
            opacity.value = withTiming(1, { duration: 600 });
            translateY.value = withTiming(0, { duration: 600 });
        }
    }, [isVisible]);

    const animatedStyles = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }]
    }));

    return (
        <Animated.View style={[styles.modal, animatedStyles, positionStyle]}>
            <Text style={styles.infoText}>{info}</Text>
        </Animated.View>
    );
};

const infoModalStyles = (type: UserType) => {
    return StyleSheet.create({
        modal: {
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 10,
            width: '100%',
            minHeight: screenHeight * 0.1,
            elevation: 4,
            borderWidth: 1.5,
            borderColor: type === 'doctor' ? '#58738a' : '#81588a'
        },
        infoText: {
            fontSize: 16,
            color: type === 'doctor' ? '#58738a' : '#81588a',
            textAlign: 'center'
        },
    });
}


export default InfoModal;