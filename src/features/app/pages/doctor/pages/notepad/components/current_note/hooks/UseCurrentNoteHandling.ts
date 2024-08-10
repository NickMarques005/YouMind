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
    handleBackToMainNote: () => void;
}

export const UseCurrentNoteHandling = ({ 
    HandleResponseAppError, HandleResponseAppSuccess, 
    updateSetLoading, deleteSetLoading, handleUpdateCurrentNote,
    handleBackToMainNote }: UseCurrentNoteHandlingProps) => {
    const { performDeleteNote } = UseNotepadService(deleteSetLoading);
    const { performUpdateNote } = UseNotepadService(updateSetLoading);
    const { dispatch } = useNotepad();
    const [noteVerification, setNoteVerification] = useState<Verification | undefined>(undefined);
    const [exitNoteVerification, setExitNoteVerification] = useState<Verification | undefined>(undefined);
    const [noteBehavior, setNoteBehavior] = useState<NoteBehavior | undefined>(undefined);

    const handleNoteVerification = (handleAccept: () => void, message?: string, acceptText?: string, declineText?: string, behavior?: NoteBehavior) => {
        const verification: Verification = {
            message,
            acceptText,
            declineText,
            handleAccept
        }

        setNoteBehavior(behavior);
        setNoteVerification(verification);
    }

    const handleExitNoteVerification = (handleAccept: () => void, message?: string, acceptText?: string, declineText?: string, behavior?: NoteBehavior) => {
        const verification: Verification = {
            message,
            acceptText,
            declineText,
            handleAccept
        }

        setNoteBehavior(behavior);
        setExitNoteVerification(verification);
    }

    const clearNoteVerification = () => {
        setNoteVerification(undefined);
    }

    const clearExitNoteVerification = () => {
        setExitNoteVerification(undefined);
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
                    handleBackToMainNote();
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
                    handleUpdateCurrentNote({
                        updatedTitle: updatedNote.title, 
                        updatedDescription: updatedNote.description, 
                        updatedContent: updatedNote.content});
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

    const handleExitNote = () => {
        if(exitNoteVerification) clearExitNoteVerification();
        handleBackToMainNote();
    }

    const handleUpdateVerification = (currentNote: NoteTemplate, newNote: NoteTemplate) => {
        handleExitNoteVerification(() => handleUpdateNote(currentNote._id, newNote, handleExitNote), 'Deseja salvar sua anotação antes de sair?', 'Salvar', 'Não', 'update_exit');
    }

    return { handleDeleteNote, handleUpdateNote, 
        noteVerification, noteBehavior,
        exitNoteVerification, handleExitNoteVerification,
        handleNoteVerification, clearNoteVerification,
        clearExitNoteVerification, handleUpdateVerification
    }
}