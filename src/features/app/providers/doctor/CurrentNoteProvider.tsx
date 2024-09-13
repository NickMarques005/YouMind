import React, { createContext, useContext, useState } from 'react';
import { NoteTemplate, UpdateCurrentNote } from 'types/app/doctor/notepad/Notepad_Types';

interface CurrentNoteContextProps {
    currentNote?: NoteTemplate;
    setCurrentNote: React.Dispatch<React.SetStateAction<NoteTemplate | undefined>>;
    newNote?: NoteTemplate;
    setNewNote: React.Dispatch<React.SetStateAction<NoteTemplate | undefined>>;
    editContent: string[];
    setEditContent: React.Dispatch<React.SetStateAction<string[]>>;
    handleUpdateNewContent: (updatedContent: string[]) => void;
    handleUpdateCurrentNote: (updatedNote: UpdateCurrentNote) => void;
    handleInitiateCurrentNote: (selectedNote: NoteTemplate) => void;
    handleUpdateAndAddPagesInCurrentNote: (noteId: string, updatedContent: string[]) => void;
    clearCurrentNote: () => void;
}

interface CurrentNoteProviderProps {
    children: React.ReactNode;
}

const CurrentNoteContext = createContext<CurrentNoteContextProps | undefined>(undefined);

export const CurrentNoteProvider: React.FC<CurrentNoteProviderProps> = ({ children }) => {
    const [currentNote, setCurrentNote] = useState<NoteTemplate | undefined>(undefined);
    const [newNote, setNewNote] = useState<NoteTemplate | undefined>(undefined);
    const [editContent, setEditContent] = useState<string[]>([]);

    const handleInitiateCurrentNote = (selectedNote: NoteTemplate) => {
        setCurrentNote(selectedNote);
        setNewNote(selectedNote);
        setEditContent(selectedNote.content);
    }

    const handleUpdateNewContent = (updatedContent: string[]) => {
        setNewNote(prev => prev ? {
            ...prev,
            content: updatedContent,
        } : undefined);
    };

    const handleUpdateCurrentNote = ({ updatedTitle, updatedDescription, updatedContent }: UpdateCurrentNote) => {
        setCurrentNote(prev => prev ? {
            ...prev,
            title: updatedTitle || prev.title,
            description: updatedDescription || prev.description,
            content: updatedContent || prev.content,
        } : undefined);
    };

    const handleAddUpdatedPagesInNewContent = (pages: string[]) => {
        setNewNote(prev => {
            if (!prev) return prev;
            const newContent = [...prev.content];
            pages.forEach(page => {
                if (!newContent.includes(page)) {
                    newContent.push(page);
                }
            });
            setEditContent(prevEditContent => {
                const updatedEditContent = [...prevEditContent];
                pages.forEach(page => {
                    if (!updatedEditContent.includes(page)) {
                        updatedEditContent.push(page);
                    }
                });
                return updatedEditContent;
            });
            return { ...prev, content: newContent };
        });
    }

    const handleUpdateAndAddPagesInCurrentNote = (noteId: string, updatedContent: string[]) => {
        if (!newNote || !currentNote) return;

        if (currentNote._id !== noteId && newNote._id !== noteId) {
            console.log("A nota atualizada não é igual a atual, nenhuma alteração será feita.");
            return;
        }

        setCurrentNote(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                content: updatedContent
            };
        });
        handleAddUpdatedPagesInNewContent(updatedContent);
        console.log("A nota atual foi sincronizada com a nota atualizada");
    };

    const clearCurrentNote = () => {
        console.log("clear current note");
        setCurrentNote(undefined);
        setNewNote(undefined);
        setEditContent([]);
    }

    return (
        <CurrentNoteContext.Provider
            value={{
                currentNote,
                newNote,
                editContent,
                setCurrentNote,
                setNewNote,
                setEditContent,
                handleUpdateNewContent,
                handleUpdateCurrentNote,
                handleInitiateCurrentNote,
                handleUpdateAndAddPagesInCurrentNote,
                clearCurrentNote
            }}
        >
            {children}
        </CurrentNoteContext.Provider>
    );
};

export const useCurrentNote = () => {
    const context = useContext(CurrentNoteContext);
    if (!context) {
        throw new Error('contexto precisa ser dentro provider! (useCurrentNote)');
    }
    return context;
};