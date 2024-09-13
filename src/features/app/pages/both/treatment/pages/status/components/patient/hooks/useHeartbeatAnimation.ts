import { useEffect } from 'react';
import { useSharedValue, useAnimatedStyle, withTiming, withRepeat, Easing, withSequence } from 'react-native-reanimated';

const useHeartbeatAnimation = () => {
    const scale = useSharedValue(1);

    useEffect(() => {

        const pulse = withSequence(
            withTiming(1.2, { duration: 250, easing: Easing.ease }),
            withTiming(1.1, { duration: 250, easing: Easing.ease }),
            withTiming(1.2, { duration: 200, easing: Easing.ease }),
            withTiming(1, { duration: 1000, easing: Easing.out(Easing.ease) }),
            withTiming(1, { duration: 100 })
        );

        scale.value = withRepeat(pulse, -1, false);

        return () => {
            scale.value = 1;
        };
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return animatedStyle;
};

export default useHeartbeatAnimation;