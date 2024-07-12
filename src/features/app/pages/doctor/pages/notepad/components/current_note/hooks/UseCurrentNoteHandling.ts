import { MessageIcon } from "@components/modals/message/types/type_message_modal";
import { UseNotepadService } from "@hooks/api/UseNotepadService";
import { NoteTemplate, UpdateCurrentNote, UpdateNote } from "types/app/doctor/notepad/Notepad_Types";
import { UseNotepadNavigation } from "../../../hooks/UseNotepadNavigation";
import { useNotepad } from "@features/app/providers/doctor/NotepadProvider";
import { useState } from "react";
import { Verification } from "types/verification/Verification_Types";
import { NoteBehavior } from "../components/NoteVerification";

interface UseCurrentNoteHandlingProps {
    updateSetLoading: React.Dispatch<React.SetStateAction<boolean>>;
    deleteSetLoading: React.Dispatch<React.SetStateAction<boolean>>;
    HandleResponseAppError: (value: string) => void;
    HandleResponseAppSuccess: (message: string, messageType?: MessageIcon) => void;
    handleUpdateCurrentNote: ({ updatedTitle, updatedDescription, updatedContent }: UpdateCurrentNote) => void;
}

export const UseCurrentNoteHandling = ({ 
    HandleResponseAppError, HandleResponseAppSuccess, 
    updateSetLoading, deleteSetLoading, handleUpdateCurrentNote }: UseCurrentNoteHandlingProps) => {
    const { performDeleteNote } = UseNotepadService(deleteSetLoading);
    const { performUpdateNote } = UseNotepadService(updateSetLoading);
    const { navigateToNotepadScreen } = UseNotepadNavigation();
    const { dispatch } = useNotepad();
    const [noteVerification, setNoteVerification] = useState<Verification | undefined>(undefined);
    const [noteBehavior, setNoteBehavior] = useState<NoteBehavior | undefined>(undefined);

    const handleNoteVerification = (handleAccept: () => void, message?: string, acceptMessage?: string, behavior?: NoteBehavior) => {
        const verification = {
            message,
            acceptMessage,
            handleAccept
        }

        setNoteBehavior(behavior);
        setNoteVerification(verification);
    }

    const clearNoteVerification = () => {
        setNoteVerification(undefined);
    }

    const handleDeleteNote = async (noteId: string, onSuccess?: () => void) => {
        if(noteVerification) clearNoteVerification();

        console.log(noteId);
        try {
            const response = await performDeleteNote(noteId);
            if (response.success) {
                if (response.data) {
                    const data = response.data;
                    dispatch({ type: 'REMOVE_NOTE', payload: data.deletedNote });
                }
                if (response.message) {
                    console.log(response);
                    navigateToNotepadScreen('main_notepad');
                    HandleResponseAppSuccess(response.message, response.type as MessageIcon)
                }
                if (onSuccess) {
                    onSuccess();
                }
            }
            if (response.error) {
                HandleResponseAppError(response.error);
            }
        } catch (err) {
            const error = err as Error;
            console.error(error);
            HandleResponseAppError(error.message);
        }
    }

    const handleUpdateNote = async (noteId: string, updated_note: UpdateNote, onSuccess?: () => void) => {
        if(noteVerification) clearNoteVerification();
        
        try {
            const response = await performUpdateNote(updated_note, noteId);
            if (response.success) {
                if (response.data) {
                    const updatedNote = response.data.updatedNote;
                    dispatch({ type: 'UPDATE_NOTE', payload: updatedNote });
                    handleUpdateCurrentNote({updatedTitle: updatedNote.title, updatedDescription: updatedNote.description, updatedContent: updatedNote.content})
                }
                if (response.message) {
                    console.log(response);
                    HandleResponseAppSuccess(response.message, response.type as MessageIcon)
                }
                if (onSuccess) {
                    onSuccess();
                }
            }
            if (response.error) {
                HandleResponseAppError(response.error);
            }
        } catch (err) {
            const error = err as Error;
            console.error(error);
            HandleResponseAppError(error.message);
        }


    }

    return { handleDeleteNote, handleUpdateNote, 
        noteVerification, noteBehavior,
        handleNoteVerification, clearNoteVerification }
}