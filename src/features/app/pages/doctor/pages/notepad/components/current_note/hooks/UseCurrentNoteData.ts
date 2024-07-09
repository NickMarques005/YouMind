import { NoteTemplate, UpdateCurrentNote } from "types/app/doctor/notepad/Notepad_Types";

interface UseCurrentNoteDataProps {
    setCurrentNote: React.Dispatch<React.SetStateAction<NoteTemplate>>;
}   

export const useCurrentNoteData = ({ setCurrentNote }: UseCurrentNoteDataProps) => {

    const updatePage = (index: number) => setCurrentNote(prev => ({
        ...prev,
        content: prev.content.map((item, idx) => idx === index ? item : item)
    }));

    const updateCurrentNoteData = ({ updatedTitle, updatedDescription, updatedContent }: UpdateCurrentNote) => {
        setCurrentNote(prev => ({
            ...prev,
            title: updatedTitle || prev.title,
            description: updatedDescription || prev.description,
            content: updatedContent || prev.content
        }));
    }

    return { updatePage, updateCurrentNoteData }
}