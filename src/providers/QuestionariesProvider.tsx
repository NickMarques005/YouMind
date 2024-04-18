import React, { createContext, useContext, ReactNode, useReducer, useEffect } from 'react';

type Questionaire = {
    id: number;
    name: string;
    date: string;
    expired: boolean;
    checked: boolean;
    new: boolean;
    total_questions: number;
    positive_questions: number;
};

type QuestionaireAction =
    | { type: 'ADD_QUESTIONAIRE'; payload: Questionaire }
    | { type: 'REMOVE_QUESTIONAIRE'; payload: { id: number } };

type QuestionaireState = Questionaire[];

type QuestionaireContextType = {
    questionaires: QuestionaireState;
    dispatch: React.Dispatch<QuestionaireAction>;
}

const QuestionaireContext = createContext<QuestionaireContextType | undefined>(undefined);

export const UseQuestionaire = () => {
    const context = useContext(QuestionaireContext);
    if (!context) {
        throw new Error('Context precisa ser dentro do Provider! (UseQuestionaire)');
    }
    return context;
};

const QuestionaireReducer = (state: QuestionaireState, action: QuestionaireAction): QuestionaireState => {
    switch (action.type) {
        case "ADD_QUESTIONAIRE":
            return [...state, action.payload];
        case "REMOVE_QUESTIONAIRE":
            return state.filter((questionaire) => questionaire.id !== action.payload.id);
        default:
            return state;

    }
};

type QuestionaireProviderProps = {
    children: ReactNode;
};

export const QuestionaireProvider: React.FC<QuestionaireProviderProps> = ({ children }) => {
    const [questionaires, dispatch] = useReducer(QuestionaireReducer, [
        {
            id: 0,
            name: 'Questionário 1',
            date: '2023-11-01',
            expired: false,
            checked: false,
            new: false,
            total_questions: 10,
            positive_questions: 7,
        },
        {
            id: 1,
            name: 'Questionário 2',
            date: '2023-11-15',
            expired: false,
            checked: true,
            new: false,
            total_questions: 8,
            positive_questions: 4,
        },
        {
            id: 2,
            name: 'Questionário 3',
            date: '2023-10-25',
            expired: true,
            checked: true,
            new: true,
            total_questions: 12,
            positive_questions: 9,
        },
        {
            id: 3,
            name: 'Questionário 4',
            date: '2023-10-25',
            expired: true,
            checked: true,
            new: true,
            total_questions: 12,
            positive_questions: 9,
        },
    ]);

    return (
        <QuestionaireContext.Provider value={{ questionaires, dispatch }}>
            {children}
        </QuestionaireContext.Provider>
    )
}