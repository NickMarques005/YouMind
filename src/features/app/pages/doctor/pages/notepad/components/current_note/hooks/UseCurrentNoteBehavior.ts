import { useState } from "react";
import { NoteTemplate } from "types/app/doctor/notepad/Notepad_Types";
import { NotepadScreenName } from "types/navigation/Navigation_Types";
import { NoteBehavior } from "../components/NoteVerification";

interface UseCurrentNoteBehaviorParams {
    currentNote?: NoteTemplate;
    newNote?: NoteTemplate;
    navigateToNotepadScreen: (screenName: NotepadScreenName) => void;
    clearCurrentNote: () => void;
}

const useCurrentNoteBehavior = ({ 
    currentNote, clearCurrentNote,
    newNote, navigateToNotepadScreen }: UseCurrentNoteBehaviorParams) => {
    const [configNoteVisible, setConfigNoteVisible] = useState(false);

    const updatedNoteVerification = (): boolean => {
        if(!currentNote || !newNote) return false;

        return (
            currentNote.title !== newNote.title ||
            currentNote.description !== newNote.description ||
            currentNote.content.length !== newNote.content.length ||
            currentNote.content.some((item, index) => item !== newNote.content[index])
        );
    };

    const handleBackToMainNote = () => {
        console.log("Back to main notepad");
        clearCurrentNote();
        navigateToNotepadScreen('main_notepad');
    }

    const handleBackNotePress = (verification?: () => void) => {
        if (updatedNoteVerification() && verification) {
            return verification();
        }

        handleBackToMainNote();
    }

    const closeHandleNoteConfig = () => {
        setConfigNoteVisible(!configNoteVisible);
    }

    return {
        configNoteVisible, setConfigNoteVisible,
        closeHandleNoteConfig, handleBackNotePress,
        updatedNoteVerification, handleBackToMainNote
    };
}

export default useCurrentNoteBehavior;