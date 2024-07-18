import { useEffect, useState } from 'react';
import { useSharedValue, withTiming, useAnimatedStyle, runOnJS } from 'react-native-reanimated';

interface UseWelcomeAnimationsParams {
    initialStep: number;
}

const useWelcomeAnimations = ({ initialStep }: UseWelcomeAnimationsParams) => {
    const opacity = useSharedValue(1);
    const [currentStep, setCurrentStep] = useState(initialStep);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 600 });
    }, [currentStep]);

    const handleCurrentStep = (step: number) => {
        setCurrentStep(step);
    }

    const changeStep = (newStep: number) => {
        opacity.value = withTiming(0, { duration: 500 }, () => {
            runOnJS(handleCurrentStep)(newStep);
        });
    };

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return { currentStep, changeStep, animatedStyle };
};

export default useWelcomeAnimations;