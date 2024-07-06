import { NoteTemplate } from "types/app/doctor/notepad/Notepad_Types";

interface UseCurrentNoteProps{
    params: {
        current_note: NoteTemplate,
    }
}

export const UseCurrentNote = ({ params }: UseCurrentNoteProps) => {
    
    const note: NoteTemplate = params.current_note;

    return { note }
}