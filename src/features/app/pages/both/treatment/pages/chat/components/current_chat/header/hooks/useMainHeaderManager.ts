import { ChatHeaderType } from "@utils/header/chatTypes";
import { useEffect } from "react";
import { runOnJS } from "react-native-reanimated";
import { NoteTemplate } from "types/app/doctor/notepad/Notepad_Types";

interface UseMainHeaderManager {
    isSelecting: boolean;
    currentChatNote?: NoteTemplate;
    switchHeader: (newHeader: ChatHeaderType) => void;
}

export const useMainHeaderManager = ({ 
    isSelecting,
    currentChatNote,
    switchHeader 
}: UseMainHeaderManager) => {
    
    useEffect(() => {
        console.log("Selecting");
        if (isSelecting) {
            runOnJS(switchHeader)(ChatHeaderType.MESSAGE_HANDLING);
        } 
        else if(currentChatNote) {
            runOnJS(switchHeader)(ChatHeaderType.SEND_TO_NOTE);
        }
        else {
            runOnJS(switchHeader)(ChatHeaderType.DEFAULT);
        }
    }, [isSelecting, currentChatNote]);

    return {};
};