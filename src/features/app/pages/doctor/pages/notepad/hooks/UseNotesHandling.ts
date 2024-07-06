import { MessageIcon } from "@components/modals/message/types/type_message_modal";
import { useNotepad } from "@features/app/providers/doctor/NotepadProvider";
import { UseNotepadService } from "@hooks/api/UseNotepadService"
import { useState } from "react";
import { NoteTemplate } from "types/app/doctor/notepad/Notepad_Types";

interface UseNotesHandlingProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    HandleResponseAppError: (value: string) => void;
    HandleResponseAppSuccess: (message: string, messageType?: MessageIcon) => void;
}

export const UseNotesHandling = ({ setLoading, HandleResponseAppError, HandleResponseAppSuccess }: UseNotesHandlingProps) => {
    const { performCreateNewNote } = UseNotepadService(setLoading);
    const { dispatch } = useNotepad();

    const handleAddNote = async (title?: string, description?: string, onSuccess?: () => void) => {
        if (!title) {
            HandleResponseAppError("Sua nova nota precisa de um título");
            return;
        }

        try {
            const response = await performCreateNewNote({ title, description });
            if (response.success && response.data) {
                console.log(response);
                dispatch({ type: 'ADD_NOTE', payload: response.data });
                
                if(onSuccess) onSuccess();
                if (response.message) {
                    HandleResponseAppSuccess(response.message, response.type as MessageIcon);
                }
            } else if (response.error) {
                HandleResponseAppError(response.error);
            }
        }
        catch (err) {
            const error = err as Error;
            console.log(error);
            HandleResponseAppError(error.message);
        }
    }

    return { handleAddNote }
}