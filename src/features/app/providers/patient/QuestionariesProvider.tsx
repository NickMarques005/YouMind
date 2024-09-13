import React, { createContext, useContext, ReactNode, useReducer } from 'react';
import { QuestionnaireItem } from 'types/app/patient/health/Question_Types';

const initialState: QuestionnaireItem[] = [];

type QuestionnaireAction =
    | { type: 'ADD_QUESTIONNAIRE'; payload: QuestionnaireItem }
    | { type: 'REMOVE_QUESTIONNAIRE'; payload: { _id: string } }
    | { type: 'ADD_MANY'; payload: QuestionnaireItem[] }
    | { type: 'UPDATE_QUESTIONNAIRE'; payload: QuestionnaireItem }
    | { type: 'REMOVE_MANY'; payload: string[] }
    | { type: 'CLEAR_QUESTIONNAIRES' }


type QuestionnaireState = QuestionnaireItem[];

type QuestionnaireContextType = {
    questionnaires: QuestionnaireState;
    dispatch: React.Dispatch<QuestionnaireAction>;
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

export const UseQuestionnaire = () => {
    const context = useContext(QuestionnaireContext);
    if (!context) {
        throw new Error('Context precisa ser dentro do Provider! (UseQuestionnaire)');
    }
    return context;
};

const QuestionnaireReducer = (state: QuestionnaireState, action: QuestionnaireAction): QuestionnaireState => {
    switch (action.type) {
        case "ADD_QUESTIONNAIRE":
            if (!action.payload.currentQuestionnaire || !action.payload.currentQuestionnaire._id) {
                console.log("Dado do questionário inválido: ", action.payload);
                return state; 
            }
            if (state.some(item => item.currentQuestionnaire._id === action.payload.currentQuestionnaire._id)) {
                return state;
            }
            return [action.payload, ...state];
        case "REMOVE_QUESTIONNAIRE":
            return state.filter((item) => item.currentQuestionnaire._id !== action.payload._id);
        case 'ADD_MANY':
            const newQuestionnaires = action.payload.filter(q => {
                if (!q.currentQuestionnaire || !q.currentQuestionnaire._id) {
                    console.log("Questionário inválido encontrado:", q);
                    return false;
                }
                return !state.some(existing => existing.currentQuestionnaire._id === q.currentQuestionnaire._id);
            });
            return [...newQuestionnaires, ...state];
        case 'UPDATE_QUESTIONNAIRE':
            return state.map(item =>
                item.currentQuestionnaire._id === action.payload.currentQuestionnaire._id
                    ? action.payload
                    : item
            );
        case 'REMOVE_MANY':
            return state.filter(item =>
                !action.payload.includes(item.currentQuestionnaire._id)
            );
        case 'CLEAR_QUESTIONNAIRES':
            return []
        default:
            return state;

    }
};

type QuestionnaireProviderProps = {
    children: ReactNode;
};

export const QuestionnaireProvider: React.FC<QuestionnaireProviderProps> = ({ children }) => {
    const [questionnaires, dispatch] = useReducer(QuestionnaireReducer, initialState);

    return (
        <QuestionnaireContext.Provider value={{ questionnaires, dispatch }}>
            {children}
        </QuestionnaireContext.Provider>
    )
}