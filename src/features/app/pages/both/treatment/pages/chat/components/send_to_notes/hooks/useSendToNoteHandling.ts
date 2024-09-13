
import { UseChat } from "@features/app/providers/bridge/ChatProvider";
import { NoteTemplate } from "types/app/doctor/notepad/Notepad_Types"

interface UseSendToNoteHandlingParams {
    handleBackToChat: () => void;
}

export const useSendToNoteHandling = ({ handleBackToChat }: UseSendToNoteHandlingParams) => {
    
    const { handleCurrentChatNote } = UseChat();

    const handleSelectedNote = (note: NoteTemplate) => {
        console.log(note.title);
        handleCurrentChatNote(note);
        handleBackToChat();
    }

    return { 
        handleSelectedNote
    }
}