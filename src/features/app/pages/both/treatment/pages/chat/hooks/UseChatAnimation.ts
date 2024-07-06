import { useState } from "react";
import { Gesture, GestureEvent, State } from "react-native-gesture-handler";
import { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

interface UseChatAnimationProps {
    handleAudioPress: () => void;
    handleAudioRelease: () => void;
    newMessageLoading: boolean;
}

export const UseChatAnimation = ({ handleAudioPress, handleAudioRelease, newMessageLoading }: UseChatAnimationProps) => {
    const audioScale = useSharedValue(1);
    const audioOpacity = useSharedValue(0.5);
    const triggeredPress = useSharedValue(false);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: audioScale.value }],
            opacity: audioOpacity.value,
        };
    });

    const longPressGesture = Gesture.LongPress()
        .minDuration(0)
        .maxDistance(10)
        .onStart(() => {
            if(newMessageLoading) return;
            audioOpacity.value = withTiming(1, { duration: 600 }, () => {
                if (audioOpacity.value === 1) {
                    triggeredPress.value = true;
                    console.log("Handle Audio Press")
                    runOnJS(handleAudioPress)();
                }

            });
            audioScale.value = withSpring(1.5, { duration: 500, stiffness: 170 });


        })
        .onEnd(() => {
            if(newMessageLoading) return;
            audioOpacity.value = withTiming(0.5, { duration: 300 });
            audioScale.value = withSpring(1, { damping: 40, stiffness: 80, mass: 2, }, () => {
                if (triggeredPress.value) {
                    console.log("Handle Audio Release")
                    runOnJS(handleAudioRelease)();
                    triggeredPress.value = false;
                }

            });


        });

    return { animatedStyle, longPressGesture }
}