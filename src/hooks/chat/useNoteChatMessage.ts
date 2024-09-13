import { useState } from "react"
import { NoteTemplate } from "types/app/doctor/notepad/Notepad_Types";

export const useNoteChatMessage = () => {
    const [currentChatNote, setCurrentChatNote] = useState<NoteTemplate | undefined>(undefined);

    const handleCurrentChatNote = (note: NoteTemplate) => {
        setCurrentChatNote(note);
    }

    const clearCurrentChatNote = () => {
        setCurrentChatNote(undefined);
    }

    return { 
        currentChatNote,
        handleCurrentChatNote,
        clearCurrentChatNote
    }
}