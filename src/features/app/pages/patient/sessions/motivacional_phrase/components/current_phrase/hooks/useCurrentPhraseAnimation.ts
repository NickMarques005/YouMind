import { useEffect, useRef } from 'react';
import { Easing, withSequence } from 'react-native-reanimated';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, runOnJS } from 'react-native-reanimated';
import { DailyMotivationalPhrase } from 'types/motivational_phrase/MotivationalPhrase_Types';

interface UseCurrentPhraseAnimationParams {
    buttonSize: number;
    currentPhrase?: DailyMotivationalPhrase;
}

const useCurrentPhraseAnimation = ({ buttonSize, currentPhrase }: UseCurrentPhraseAnimationParams) => {
    const textOpacity = useSharedValue(0);
    const okButtonOpacity = useSharedValue(0);
    const okButtonTranslateY = useSharedValue(-buttonSize);

    const startTextAnimation = () => {
        textOpacity.value = 0;
        textOpacity.value = withTiming(1, { duration: 3000, easing: Easing.out(Easing.ease) });
    };

    const animateOkButton = () => {
        // Animação sequencial usando withSequence
        okButtonOpacity.value = withSequence(
            withTiming(1, { duration: 1000, easing: Easing.out(Easing.ease) }),
        );
        okButtonTranslateY.value = withSequence(
            withTiming(0, { duration: 1200, easing: Easing.out(Easing.ease) }),

        );
    };

    const resetButtonAnimation = () => {
        okButtonOpacity.value = 0;
        okButtonTranslateY.value = buttonSize;
    };

    useEffect(() => {
        if (currentPhrase) {
            startTextAnimation();
            resetButtonAnimation();
        }
    }, [currentPhrase]);

    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            opacity: textOpacity.value,
        };
    });

    const animatedOkButtonStyle = useAnimatedStyle(() => {
        return {
            opacity: okButtonOpacity.value,
            transform: [{ translateY: okButtonTranslateY.value }],
        };
    });

    const startButtonAnimation = () => {
        runOnJS(animateOkButton)();
    }

    return {
        animatedTextStyle,
        animatedOkButtonStyle,
        startTextAnimation,
        animateOkButton,
        startButtonAnimation
    };
};

export default useCurrentPhraseAnimation;