import { useState } from 'react';
import { Animated, ViewStyle } from 'react-native';

export const useMainAnalysisAnimations = () => {
    const [scrollX] = useState(new Animated.Value(0));

    const getAnimationStyles = (index: number, screenWidth: number): Animated.WithAnimatedObject<ViewStyle> => ({
        width: screenWidth,
        alignItems: 'center' as 'center',
        justifyContent: 'center' as 'center',
        padding: 25,
        transform: [
            {
                scale: scrollX.interpolate({
                    inputRange: [
                        (index - 1) * screenWidth,
                        index * screenWidth,
                        (index + 1) * screenWidth,
                    ],
                    outputRange: [0.8, 1, 0.8],
                }),
            },
        ],
    });

    return { scrollX, getAnimationStyles };
};