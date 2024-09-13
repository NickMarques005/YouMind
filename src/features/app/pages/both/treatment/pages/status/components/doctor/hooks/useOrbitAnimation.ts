import { useEffect } from 'react';
import {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    Easing,
} from 'react-native-reanimated';

interface UseOrbitAnimationParams {
    radius: number;
}

export const useOrbitAnimation = ({radius}: UseOrbitAnimationParams) => {
    // Valor compartilhado para controlar a rotação
    const orbitAnimation = useSharedValue(0);

    useEffect(() => {
        // Animação que gira indefinidamente
        orbitAnimation.value = withRepeat(
            withTiming(2 * Math.PI, {
                duration: 32000,
                easing: Easing.linear,
            }),
            -1, 
            false 
        );
    }, [orbitAnimation]);

    // Estilo para o stethoscope
    const animatedStyleStethoscope = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: Math.cos(orbitAnimation.value) * radius / 1.3 },
                { translateY: Math.sin(orbitAnimation.value) * radius / 1.3 },
            ],
        };
    });

    // Estilo para o brain
    const animatedStyleBrain = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: Math.cos(orbitAnimation.value + Math.PI) * radius / 1.3 },
                { translateY: Math.sin(orbitAnimation.value + Math.PI) * radius / 1.3 },
            ],
        };
    });

    return { animatedStyleBrain, animatedStyleStethoscope };
};