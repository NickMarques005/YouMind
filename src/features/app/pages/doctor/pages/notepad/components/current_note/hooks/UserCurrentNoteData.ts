import { NoteTemplate } from "types/app/doctor/notepad/Notepad_Types";

interface UseCurrentNoteDataProps {
    setCurrentNote: React.Dispatch<React.SetStateAction<NoteTemplate>>;
}   

export const useCurrentNoteData = ({ setCurrentNote }: UseCurrentNoteDataProps) => {

    const updatePage = (index: number) => setCurrentNote(prev => ({
        ...prev,
        content: prev.content.map((item, idx) => idx === index ? item : item)
    }))


    return { updatePage }
}