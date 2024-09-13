import { useEffect } from "react";
import { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface UseHeaderAnimationParams<T> {
    currentHeader: T; 
    setCurrentHeader: (header: T) => void; 
    duration?: number;
}

export const useHeaderAnimation = <T>({
    currentHeader,
    setCurrentHeader,
    duration = 200, 
}: UseHeaderAnimationParams<T>) => {

    const headerOpacity = useSharedValue(1);

    const headerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: headerOpacity.value,
    }));

    // Função para alternar entre headers, com animação
    const switchHeader = (newHeader: T) => {
        if (newHeader === currentHeader) return; 

        headerOpacity.value = withTiming(0, { duration: duration / 2 }, () => {
            
            runOnJS(setCurrentHeader)(newHeader);
            //headerOpacity.value = withTiming(1, { duration: duration / 2 });
        });
    };

    useEffect(() => {
        headerOpacity.value = withTiming(1, { duration });
    }, [currentHeader]);

    return { 
        headerAnimatedStyle,
        switchHeader 
    };
};