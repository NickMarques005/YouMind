import { responsiveSize } from '@utils/layout/Screen_Size';
import { useSharedValue, useAnimatedStyle, withDelay, withSpring, withTiming, runOnJS } from 'react-native-reanimated';

interface UseNotificationAnimations {
    index: number;
    screenWidth: number;
    removeNotification: () => void;
}

export const useNotificationAnimations = ({index, screenWidth, removeNotification}: UseNotificationAnimations) => {
    const translateX = useSharedValue(0);
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(-30);
    const height = useSharedValue(responsiveSize * 0.22);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [
                { translateY: translateY.value },
                { translateX: translateX.value }
            ],
            height: height.value,
        };
    });

    const notificationAnimateIn = () => {
        opacity.value = withDelay(index * 100, withSpring(1));
        translateY.value = withDelay(index * 100, withSpring(0));
    };

    const notificationAnimateOut = () => {
        translateX.value = withTiming(screenWidth, { duration: 300 }, () => {
            height.value = withTiming(0, { duration: 200 });
            runOnJS(removeNotification)();
        });
    };

    return { animatedStyles, 
        notificationAnimateIn, 
        notificationAnimateOut, 
        translateX,
        translateY,
        opacity,
        height
    };
};
