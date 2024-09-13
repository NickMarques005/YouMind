import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { DailyMotivationalPhrase } from 'types/motivational_phrase/MotivationalPhrase_Types';

interface MotivationalPhraseProviderProps {
    children: ReactNode;
}

type MotivationalPhraseAction =
    | { type: 'SET_PHRASES'; payload: DailyMotivationalPhrase[] }
    | { type: 'ADD_PHRASE'; payload: DailyMotivationalPhrase }
    | { type: 'REMOVE_PHRASE'; payload: string } // payload como Id da frase motivacional
    | { type: 'UPDATE_PHRASE'; payload: DailyMotivationalPhrase };

interface MotivationalPhraseState {
    phrases: DailyMotivationalPhrase[];
}

const MotivationalPhraseContext = createContext<{
    state: MotivationalPhraseState;
    dispatch: React.Dispatch<MotivationalPhraseAction>;
} | undefined>(undefined);


const motivationalPhraseReducer = (state: MotivationalPhraseState, action: MotivationalPhraseAction): MotivationalPhraseState => {
    switch (action.type) {
        case 'SET_PHRASES':
            return { ...state, phrases: action.payload };

        case 'ADD_PHRASE':
            return { ...state, phrases: [...state.phrases, action.payload] };

        case 'REMOVE_PHRASE':
            return { ...state, phrases: state.phrases.filter(phrase => phrase.phraseId !== action.payload) };

        case 'UPDATE_PHRASE':
            return {
                ...state,
                phrases: state.phrases.map(phrase =>
                    phrase.phraseId === action.payload.phraseId ? action.payload : phrase
                ),
            };

        default:
            return state;
    }
};

const initialState: MotivationalPhraseState = {
    phrases: []
};

export const MotivationalPhraseProvider: React.FC<MotivationalPhraseProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(motivationalPhraseReducer, initialState);

    return (
        <MotivationalPhraseContext.Provider value={{ state, dispatch }}>
            {children}
        </MotivationalPhraseContext.Provider>
    );
};

export const useMotivationalPhrase = () => {
    const context = useContext(MotivationalPhraseContext);
    if (!context) {
        throw new Error('Contexto precisa ser dentro de provider! (useMotivationalPhrase)');
    }
    return context;
};