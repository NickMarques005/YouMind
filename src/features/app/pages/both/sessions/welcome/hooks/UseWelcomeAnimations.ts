import { useEffect, useState } from 'react';
import { useSharedValue, withTiming, useAnimatedStyle, runOnJS, withSpring } from 'react-native-reanimated';

interface UseWelcomeAnimationsParams {
    initialStep: number;
}

const useWelcomeAnimations = ({ initialStep }: UseWelcomeAnimationsParams) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(-30);
    const [currentStep, setCurrentStep] = useState(initialStep);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 600 });
        translateY.value = withSpring(0, { damping: 25, stiffness: 30 });
    }, [currentStep]);

    const handleCurrentStep = (step: number) => {
        setCurrentStep(step);
    }

    const changeStep = (newStep: number) => {
        opacity.value = withTiming(0, { duration: 500 }, () => {
            runOnJS(handleCurrentStep)(newStep);
            translateY.value = -30;
        });
    };

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    return { currentStep, changeStep, animatedStyle };
};

export default useWelcomeAnimations;