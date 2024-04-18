import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface NotepadType {
    _id: string;
    title: string;
    description: string;
    content: string[];
    createdAt: string;
    updatedAt: string;
}

interface NotepadState {
    notepadData: NotepadType[];
}

interface NotepadContextType {
    notepadData: NotepadType[];
    addNotepad: (notepad: NotepadType) => void;
    updateNotepad: (updatedNotepads: NotepadType[] | NotepadType) => void;
}

const NotepadContext = createContext<NotepadContextType | undefined>(undefined);

export const UseNotepad = () => {
    const context = useContext(NotepadContext);
    if (!context) {
        throw new Error('Context deve ser dentro do Provider! (UseNotepad)');
    }
    return context;
};

interface NotepadProviderProps {
    children: ReactNode;
}

export const NotepadProvider: React.FC<NotepadProviderProps> = ({ children }) => {
    const [notepadData, setNotepadData] = useState<NotepadType[]>([]);

    const addNotepad = (notepad: NotepadType) => {
        setNotepadData((prevData) => [...prevData, notepad]);
    };

    const updateNotepad = (updatedNotepads: NotepadType[] | NotepadType) => {
        
        console.log(updateNotepad);
        const updatedNotepadArray = Array.isArray(updatedNotepads)
            ? updatedNotepads
            : [updatedNotepads];

        setNotepadData((prevData) =>
            prevData.map((note) =>
                updatedNotepadArray.find((updatedNote) => updatedNote._id === note._id) || note
            )
        );
    };

    const removeNotepad = () => {
        
    }

    const contextValue: NotepadContextType = {
        notepadData,
        addNotepad,
        updateNotepad,
    };

    return (
        <NotepadContext.Provider value={contextValue}>
            {children}
        </NotepadContext.Provider>
    );
};



