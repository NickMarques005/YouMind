import { useState } from "react";
import { NoteTemplate } from "types/app/doctor/notepad/Notepad_Types";
import { NotepadScreenName } from "types/navigation/Navigation_Types";
import { NoteBehavior } from "../components/NoteVerification";

interface UseCurrentNoteBehaviorParams {
    note: NoteTemplate;
    navigateToNotepadScreen: (screenName: NotepadScreenName) => void;
}

const useCurrentNoteBehavior = ({ note, navigateToNotepadScreen }: UseCurrentNoteBehaviorParams) => {
    const [currentNote, setCurrentNote] = useState<NoteTemplate>(note);
    const [newNote, setNewNote] = useState<NoteTemplate>(note);
    const [configNoteVisible, setConfigNoteVisible] = useState(false);

    const updatedNoteVerification = (): boolean => {
        return (
            currentNote.title !== newNote.title ||
            currentNote.description !== newNote.description ||
            currentNote.content.length !== newNote.content.length ||
            currentNote.content.some((item, index) => item !== newNote.content[index])
        );
    };

    const handleBackToMainNote = () => {
        console.log("Back to main notepad");
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
        currentNote, setCurrentNote,
        newNote, setNewNote,
        configNoteVisible, setConfigNoteVisible,
        closeHandleNoteConfig, handleBackNotePress,
        updatedNoteVerification, handleBackToMainNote
    };
}

export default useCurrentNoteBehavior;