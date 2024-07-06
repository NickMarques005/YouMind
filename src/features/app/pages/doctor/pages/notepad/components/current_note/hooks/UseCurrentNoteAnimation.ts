
import { useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { Gesture, Directions } from 'react-native-gesture-handler';

interface UseCurrentNoteGestureProps {
    contentLength: number;
    onUpdateIndex: (index: number) => void;
}

export const useCurrentNoteGestures = ({contentLength, onUpdateIndex}: UseCurrentNoteGestureProps) => {
    const activeIndex = useSharedValue(0);

    return { activeIndex };
};