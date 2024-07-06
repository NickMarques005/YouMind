import { useEffect, useState } from 'react';
import { SharedValue, useSharedValue, withTiming, Easing, runOnJS } from 'react-native-reanimated';
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';

interface UseQuestionnaireAnimationsProps {
    totalLength: number;
}

const useQuestionnaireAnimations = ({ totalLength }: UseQuestionnaireAnimationsProps) => {
    const activeIndex = useSharedValue(0);

    const handleFlingUp = Gesture.Fling().direction(Directions.UP).onStart(() => {
        console.log(activeIndex.value || !Number.isInteger(activeIndex.value));
        if (activeIndex.value <= 0 || !Number.isInteger(activeIndex.value)) {
            return;
        }

        activeIndex.value = withTiming(activeIndex.value - 1, { duration: 400, easing: Easing.inOut(Easing.cubic) });
    });

    const handleFlingDown = Gesture.Fling().direction(Directions.DOWN).onStart(() => {
        console.log(activeIndex);
        if (activeIndex.value >= totalLength - 1 || !Number.isInteger(activeIndex.value)) {
            return;
        }

        activeIndex.value = withTiming(activeIndex.value + 1, { duration: 400, easing: Easing.inOut(Easing.cubic) });
    });

    useEffect(() => {
        return () => {
            activeIndex.value = 0;
        };
    }, []);

    return { activeIndex, handleFlingUp, handleFlingDown };
};

export default useQuestionnaireAnimations;