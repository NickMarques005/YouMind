import { NoteTemplate, UpdateCurrentNote } from "types/app/doctor/notepad/Notepad_Types";

interface UseCurrentNoteDataProps {
    setCurrentNote: React.Dispatch<React.SetStateAction<NoteTemplate>>;
    setNewNote: React.Dispatch<React.SetStateAction<NoteTemplate>>;
}

export const useCurrentNoteData = ({ setCurrentNote, setNewNote }: UseCurrentNoteDataProps) => {

    const handleUpdateNewContent = (updatedContent: string[]) => {
        setNewNote(prev => ({
            ...prev,
            content: updatedContent
        }));
    };

    const handleUpdateCurrentNote = ({ updatedTitle, updatedDescription, updatedContent }: UpdateCurrentNote) => {
        setCurrentNote(prev => ({
            ...prev,
            title: updatedTitle || prev.title,
            description: updatedDescription || prev.description,
            content: updatedContent || prev.content
        }));
    }

    return { handleUpdateNewContent, handleUpdateCurrentNote }
}