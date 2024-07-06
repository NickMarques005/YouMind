import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { NoteTemplate } from "types/app/doctor/notepad/Notepad_Types";


interface NotepadState {
    notes: NoteTemplate[];
}

type Action =
    | { type: 'ADD_NOTE'; payload: NoteTemplate }
    | { type: 'REMOVE_NOTE'; payload: string }
    | { type: 'UPDATE_NOTE'; payload: NoteTemplate }
    | { type: 'SET_NOTES'; payload: NoteTemplate[] };

type Dispatch = (action: Action) => void;

const NotepadContext = createContext<{ state: NotepadState; dispatch: Dispatch } | undefined>(undefined);

const notepadReducer = (state: NotepadState, action: Action): NotepadState => {
    switch (action.type) {
        case 'SET_NOTES':
            return { ...state, notes: action.payload };
        case 'ADD_NOTE':
            return { ...state, notes: [...state.notes, action.payload] };
        case 'REMOVE_NOTE':
            return { ...state, notes: state.notes.filter(note => note._id !== action.payload) };
        case 'UPDATE_NOTE':
            return {
                ...state,
                notes: state.notes.map(note => note._id === action.payload._id ? action.payload : note)
            };
        default:
            console.log("Houve um erro desconhecido");
            return state;
    }
};

export const NotepadProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(notepadReducer, { notes: [] });

    return (
        <NotepadContext.Provider value={{ state, dispatch }}>
            {children}
        </NotepadContext.Provider>
    );
};

export const useNotepad = () => {
    const context = useContext(NotepadContext);
    if (context === undefined) {
        throw new Error('Context precisa estar dentro do provider (UseNotepad');
    }
    return context;
};



