import { useCallback, useEffect } from 'react';
import { useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';

export interface UseFunctionalityModalAnimationProps {
    isVisible: boolean;
    onClose: () => void;
}

const useFunctionalityModalAnimation = ({ isVisible, onClose }: UseFunctionalityModalAnimationProps) => {
    const opacity = useSharedValue(0);

    useEffect(() => {
        if (isVisible) {
            opacity.value = withTiming(1, { duration: 400 });
        } else {
            closeAnimation();
        }
    }, [isVisible]);

    const closeAnimation = useCallback(() => {
        opacity.value = withTiming(0, { duration: 500 }, () => {
            runOnJS(onClose)();
        });
    }, [onClose, opacity]);

    return {
        opacity,
        closeAnimation,
    };
};

export default useFunctionalityModalAnimation;