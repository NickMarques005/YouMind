import { SharedValue, useAnimatedStyle } from "react-native-reanimated";

interface UseSearchAnimationParams {
    opacity: SharedValue<number>;
}

export const useSearchAnimation = ({ opacity }: UseSearchAnimationParams) => {

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return { animatedStyle }
}