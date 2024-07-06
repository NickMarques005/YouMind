import { UseAppNavigation } from "@features/app/hooks/UseAppNavigation";
import { UseNavigateOnSuccess } from "@hooks/navigation/UseNavigateSuccess";
import { useState } from "react";
import { NoteTemplate } from "types/app/doctor/notepad/Notepad_Types";


export const UseNotepadBehavior = () => {
    const [addNoteVisible, setAddNoteVisible] = useState(false);
    const { notepadNavigateOnSuccess } = UseNavigateOnSuccess();

    const handleSelectedNote = (note: NoteTemplate) => {
        console.log("Go to current Note...");
        notepadNavigateOnSuccess('current_note', { current_note: note})
    }

    const handleAddNoteVisible = (value: boolean) => {
        setAddNoteVisible(value);
    }

    return { addNoteVisible, handleAddNoteVisible, handleSelectedNote}
}