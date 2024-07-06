import { useCallback, useEffect } from 'react';
import { screenHeight } from '@utils/layout/Screen_Size';
import { useSharedValue, withSpring, withTiming, runOnJS } from 'react-native-reanimated';

export interface UseModalAnimationProps {
    isVisible: boolean;
    onClose: () => void;
}

const UseModalAnimation = ({isVisible, onClose}: UseModalAnimationProps) => {
    const offset = useSharedValue(screenHeight * 0.5);
    const opacity = useSharedValue(0);

    useEffect(() => {
        if (isVisible) {
            offset.value = withSpring(0, { damping: 40, stiffness: 45 });
            opacity.value = withTiming(1, { duration: 400 });
        }
    }, [isVisible, offset, opacity]);

    const closeAnimation = useCallback(() => {
        offset.value = withTiming(screenHeight, { duration: 800 });
        opacity.value = withTiming(0, { duration: 700 }, () => {
            runOnJS(onClose)();
        });
    }, [onClose, offset, opacity]);

    return {
        offset,
        opacity,
        closeAnimation,
    };
};

export default UseModalAnimation;