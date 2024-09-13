import { TaggedHeaderType } from "@utils/header/chatTypes";
import { useEffect } from "react";
import { runOnJS } from "react-native-reanimated";

interface UseTaggedMessageMainHeaderManager {
    isSelecting: boolean;
    switchHeader: (newHeader: TaggedHeaderType) => void;
}

export const useTaggedMessageMainHeaderManager = ({ 
    isSelecting,
    switchHeader 
}: UseTaggedMessageMainHeaderManager) => {
    
    useEffect(() => {
        console.log("Selecting");
        if (isSelecting) {
            runOnJS(switchHeader)(TaggedHeaderType.MESSAGE_HANDLING);
        } else {
            runOnJS(switchHeader)(TaggedHeaderType.DEFAULT);
        }
    }, [isSelecting]);

    return {};
};