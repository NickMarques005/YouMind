import { MessageIcon } from "@components/modals/message/types/type_message_modal";
import { UseNotepadService } from "@hooks/api/UseNotepadService";
import { NoteTemplate, UpdateNote } from "types/app/doctor/notepad/Notepad_Types";
import { UseNotepadNavigation } from "../../../hooks/UseNotepadNavigation";
import { useNotepad } from "@features/app/providers/doctor/NotepadProvider";

interface UseCurrentNoteHandlingProps {
    updateSetLoading: React.Dispatch<React.SetStateAction<boolean>>;
    deleteSetLoading: React.Dispatch<React.SetStateAction<boolean>>;
    HandleResponseAppError: (value: string) => void;
    HandleResponseAppSuccess: (message: string, messageType?: MessageIcon) => void;
}

export const UseCurrentNoteHandling = ({ HandleResponseAppError, HandleResponseAppSuccess, updateSetLoading, deleteSetLoading }: UseCurrentNoteHandlingProps) => {
    const { performDeleteNote } = UseNotepadService(deleteSetLoading);
    const { performUpdateNote } = UseNotepadService(updateSetLoading);
    const { navigateToNotepadScreen } = UseNotepadNavigation();
    const { dispatch } = useNotepad();

    const handleDeleteNote = async (noteId: string, onSuccess?: () => void) => {
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
        try {
            const response = await performUpdateNote(updated_note, noteId);
            if (response.success) {
                if (response.data) {
                    const data = response.data;
                    dispatch({ type: 'UPDATE_NOTE', payload: data.updatedNote });
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

    return { handleDeleteNote, handleUpdateNote }
}