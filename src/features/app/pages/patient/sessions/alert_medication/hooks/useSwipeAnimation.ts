import { useState } from 'react';
import { screenWidth } from '@utils/layout/Screen_Size';
import { Gesture, PanGesture } from 'react-native-gesture-handler';
import Animated, { SharedValue, interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface SwipeAnimation {
    swipeGesture: PanGesture;
    animatedStyle: {
        transform: {
            translateX: number;
        }[];
        backgroundColor: string;
    };
}

interface SwipeAnimationProps {
    setIsConfirming: React.Dispatch<React.SetStateAction<boolean>>;
    translateX: SharedValue<number>;
    confirmProgress: SharedValue<number>;
    handleSwipeEnd: () => void;
    isConfirming: boolean;
    declined: boolean;
    confirmed: boolean;
}

export const useSwipeAnimation = ({ isConfirming, confirmed, declined, setIsConfirming, translateX, confirmProgress, handleSwipeEnd }: SwipeAnimationProps): SwipeAnimation => {

    const swipeGesture = Gesture.Pan()
        .onUpdate((event) => {
            if (event.translationX < 0 || isConfirming || declined || confirmed) return;
            translateX.value = Math.min(event.translationX, screenWidth * 0.56);
        })
        .onEnd(() => {
            if(isConfirming || declined || confirmed) return;
            if (translateX.value > screenWidth * 0.5) {
                translateX.value = withSpring(screenWidth * 0.56, {
                    damping: 20,
                    stiffness: 90,
                    mass: 1,
                    overshootClamping: false,
                    restDisplacementThreshold: 0.01,
                    restSpeedThreshold: 0.01,
                }, () => {
                    runOnJS(handleSwipeEnd)();
                });
            } else {
                translateX.value = withSpring(0, {
                    damping: 20,
                    stiffness: 90,
                    mass: 1,
                    overshootClamping: false,
                    restDisplacementThreshold: 0.01,
                    restSpeedThreshold: 0.01,
                });
            }
        });

        const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ translateX: translateX.value }],
            backgroundColor: interpolateColor(
                translateX.value,
                [0, screenWidth * 0.56],
                ['#2e0e29', 'white']
            ),
        }));

    return { 
        swipeGesture, animatedStyle
    };
};