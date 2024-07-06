import { Directions, Gesture } from "react-native-gesture-handler";
import { useSharedValue, withSpring } from "react-native-reanimated";



export const useHeaderGestures = () => {
    const headerHeight = useSharedValue(50);

    const startHeight = useSharedValue(0);

    const handleHeaderDragging = Gesture.Pan()
        .onStart((event) => {
            startHeight.value = headerHeight.value;
        })
        .onUpdate((event) => {
            const newHeight = startHeight.value + event.translationY;
            headerHeight.value = Math.max(50, Math.min(160, newHeight)); 
            
        })
        .onEnd(() => {
            headerHeight.value = withSpring(headerHeight.value, {
                damping: 10,
                stiffness: 100,
            });
        });

    return { headerHeight, handleHeaderDragging }
}   