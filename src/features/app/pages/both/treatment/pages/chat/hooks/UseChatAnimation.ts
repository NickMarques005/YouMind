import { useState } from "react";
import { Gesture, GestureEvent, State } from "react-native-gesture-handler";
import { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { MentionedMessageTemplate } from "types/chat/Chat_Types";
import { UserType } from "types/user/User_Types";

interface UseChatAnimationProps {
    newMessageLoading: boolean;
    userId?: string;
    senderType: UserType;
    mentionedMessage?: MentionedMessageTemplate;
    isSelecting: boolean;
    handleAudioPress: () => void;
    handleAudioRelease: (senderId: string, senderType: UserType, mentionedMessage?: MentionedMessageTemplate) => Promise<void>;
    clearSelection: () => void;
}

export const UseChatAnimation = ({ 
    newMessageLoading, userId, isSelecting, 
    senderType, mentionedMessage,
    handleAudioPress, handleAudioRelease, clearSelection
    }: UseChatAnimationProps) => {
    const audioScale = useSharedValue(1);
    const audioOpacity = useSharedValue(0.5);
    const triggeredPress = useSharedValue(false);

    const audioAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: audioScale.value }],
            opacity: audioOpacity.value,
        };
    });

    const longPressGesture = Gesture.LongPress()
        .minDuration(0)
        .maxDistance(10)
        .onStart(() => {
            if(isSelecting) runOnJS(clearSelection)();
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
                    userId && runOnJS(handleAudioRelease)(userId, senderType, mentionedMessage);
                    triggeredPress.value = false;
                }

            });


        });

    return { audioAnimatedStyle, longPressGesture }
}