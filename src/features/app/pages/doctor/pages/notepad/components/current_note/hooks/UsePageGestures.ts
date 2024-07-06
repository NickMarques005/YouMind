
import { Directions, Gesture } from "react-native-gesture-handler";
import { SharedValue, runOnJS, withTiming, Easing } from "react-native-reanimated";


interface UsePageGesturesProps {
    editContent: string[];
    activeIndex: SharedValue<number>;
    addPage: (index: number) => void;
    deletePage: (index: number) => void;
}

export const usePageGestures = ({ editContent, activeIndex, addPage, deletePage }: UsePageGesturesProps) => {

    const handlePageFlingLeft = Gesture.Fling().direction(Directions.LEFT).onStart(() => {
        if (editContent.length === undefined) {
            console.log("DONT HAS note");
            return;
        }

        console.log("DATA LENGTH: ", editContent);
        console.log("INDEX: ", activeIndex.value);
        if (activeIndex.value === editContent.length - 1) {

            console.log("END");
            return;
        }

        activeIndex.value = withTiming(activeIndex.value + 1, { duration: 400, easing: Easing.ease });
    });

    const handlePageFlingRight = Gesture.Fling().direction(Directions.RIGHT).onStart(() => {
        console.log("Fling Right");
        console.log("INDEX: ", activeIndex.value);
        if (activeIndex.value === 0) {
            console.log("START");
            return;
        }

        activeIndex.value = withTiming(activeIndex.value - 1, { duration: 400, easing: Easing.ease });
        console.log("CARD RIGHT");
    });

    const handlePageFlingUp = Gesture.Fling().direction(Directions.UP).onStart(() => {
        console.log("FLINGUP!!");
        console.log("INDEX: ", activeIndex.value, " NOTE LENGTH: ", editContent.length);
        if (activeIndex.value < editContent.length || editContent.length === 0) {
            console.log("ADD PAGE no index: ", activeIndex.value);
            runOnJS(addPage)(activeIndex.value);
        }
    });

    const handlePageFlingDown = Gesture.Fling().direction(Directions.DOWN).onStart(() => {
        console.log("FLING DOWN");
        console.log("INDEX: ", activeIndex.value, " NOTE LENGTH: ", editContent.length);
        console.log("REMOVE PAGE !!");
        runOnJS(deletePage)(activeIndex.value);
    });

    return { handlePageFlingLeft, handlePageFlingRight, handlePageFlingDown, handlePageFlingUp }
}