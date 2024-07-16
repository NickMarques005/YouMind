import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, SharedValue, withSpring } from 'react-native-reanimated';

interface UseNotificationGesturesProps{
    translateX: SharedValue<number>;
    screenWidth: number;
    notificationAnimateOut: () => void;
}

export const useNotificationGestures = ({translateX, screenWidth, notificationAnimateOut}: UseNotificationGesturesProps) => {
    
    const swipeNotificationGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = Math.max(event.translationX, 0);
        })
        .onEnd(() => {
            if (translateX.value > screenWidth * 0.5) {
                runOnJS(notificationAnimateOut)();
            } else {
                translateX.value = withSpring(0, { stiffness: 90, damping: 20 });
            }
        });

    return swipeNotificationGesture;
}