import { useEffect } from 'react';
import { useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';

interface UseMenuAnimationProps {
    isVisible: boolean;
    onClose: () => void;
}

const useMenuAnimation = ({ isVisible, onClose }: UseMenuAnimationProps) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(-50);

    useEffect(() => {
        if (isVisible) {
            opacity.value = withTiming(1, { duration: 450 });
            translateY.value = withTiming(0, { duration: 450 });
        }
    }, [isVisible, opacity]);

    const closeMenu = () => {
        opacity.value = withTiming(0, { duration: 450 }, () => {
            runOnJS(onClose)();
        });
        translateY.value = withTiming(-50, { duration: 450 });
    };

    return {
        opacity,
        translateY,
        closeMenu,
    };
};

export default useMenuAnimation;