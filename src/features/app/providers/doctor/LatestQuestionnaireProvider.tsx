import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { LatestQuestionnaire } from 'types/history/PatientHistory_Types';

type LatestQuestionnaireAction =
    | { type: 'SET_LATEST_QUESTIONNAIRES'; payload: LatestQuestionnaire[] }
    | { type: 'ADD_LATEST_QUESTIONNAIRE'; payload: LatestQuestionnaire }
    | { type: 'UPDATE_LATEST_QUESTIONNAIRE'; payload: LatestQuestionnaire }
    | { type: 'DELETE_LATEST_QUESTIONNAIRE'; payload: string };

interface LatestQuestionnaireState {
    latestQuestionnaire: LatestQuestionnaire[];
}

const initialLatestQuestionnaire: LatestQuestionnaire[] = [];

const initialState: LatestQuestionnaireState = {
    latestQuestionnaire: initialLatestQuestionnaire,
};

const LatestQuestionnaireReducer = (state: LatestQuestionnaireState, action: LatestQuestionnaireAction): LatestQuestionnaireState => {
    switch (action.type) {
        case 'SET_LATEST_QUESTIONNAIRES':
            return { ...state, latestQuestionnaire: action.payload };
        case 'ADD_LATEST_QUESTIONNAIRE':
            return { ...state, latestQuestionnaire: [...state.latestQuestionnaire, action.payload] };
        case 'UPDATE_LATEST_QUESTIONNAIRE':
            return {
                ...state,
                latestQuestionnaire: state.latestQuestionnaire.map(item =>
                    item._id === action.payload._id ? action.payload : item
                ),
            };
        case 'DELETE_LATEST_QUESTIONNAIRE':
            return {
                ...state,
                latestQuestionnaire: state.latestQuestionnaire.filter(item => item._id !== action.payload),
            };
        default:
            return state;
    }
};

interface LatestQuestionnaireContextType {
    state: LatestQuestionnaireState;
    dispatch: React.Dispatch<LatestQuestionnaireAction>;
}

const LatestQuestionnaireContext = createContext<LatestQuestionnaireContextType | undefined>(undefined);

interface LatestQuestionnaireProviderProps {
    children: ReactNode;
}

export const LatestQuestionnaireProvider: React.FC<LatestQuestionnaireProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(LatestQuestionnaireReducer, initialState);

    return (
        <LatestQuestionnaireContext.Provider value={{ state, dispatch }}>
            {children}
        </LatestQuestionnaireContext.Provider>
    );
};

export const useLatestQuestionnaire = () => {
    const context = useContext(LatestQuestionnaireContext);
    if (!context) {
        throw new Error('Context precisa ser dentro do provider! (useLatestQuestionnaire)');
    }
    return context;
};