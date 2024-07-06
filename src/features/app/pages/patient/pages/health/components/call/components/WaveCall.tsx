import React, { useEffect } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';


type WaveCallProps = {
    index: number;
    viewStyle: object;
}
const WaveCall = ({index, viewStyle}: WaveCallProps) => {
    const opacityValue = useSharedValue(0.7);
    const scaleValue = useSharedValue(1);
    const maxScale = 3;
    const maxOpacity = 0;
    const delay = 400;

    useEffect(() => {
        opacityValue.value = withDelay(
            index * delay,
            withRepeat(
                withTiming(maxOpacity, {
                    duration: 3000,
                }),
                -1,
                false
            )
        );
        scaleValue.value = withDelay(
            index * delay,
            withRepeat(
                withTiming(maxScale, {
                    duration: 3000,
                }),
                -1,
                false,
            ),
        );
    }, [opacityValue, scaleValue, index]);

    const WaveStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: scaleValue.value,
                }
            ],
            opacity: opacityValue.value
        };
    });

    return (
        <Animated.View style={[WaveStyle, viewStyle]} />
    )
}

export default WaveCall;
