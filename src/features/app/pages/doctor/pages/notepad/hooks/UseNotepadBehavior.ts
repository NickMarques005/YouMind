import { useState } from "react";
import { NoteTemplate } from "types/app/doctor/notepad/Notepad_Types";
import { UseNotepadNavigation } from "./UseNotepadNavigation";

interface UseNotepadBehaviorParams {
    handleInitiateCurrentNote: (selectedNote: NoteTemplate) => void;
}

export const UseNotepadBehavior = ({ handleInitiateCurrentNote }: UseNotepadBehaviorParams) => {
    const [addNoteVisible, setAddNoteVisible] = useState(false);
    const { navigateToNotepadScreen } = UseNotepadNavigation();

    const handleSelectedNote = (note: NoteTemplate) => {
        console.log("Go to current Note...");
        handleInitiateCurrentNote(note);
        navigateToNotepadScreen('current_note');
    }

    const handleAddNoteVisible = (value: boolean) => {
        setAddNoteVisible(value);
    }

    return { addNoteVisible, handleAddNoteVisible, handleSelectedNote}
}