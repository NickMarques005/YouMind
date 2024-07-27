import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { PatientHistory } from 'types/history/PatientHistory_Types';

type PatientHistoryAction =
    | { type: 'SET_PATIENT_HISTORY'; payload: PatientHistory[] }
    | { type: 'ADD_PATIENT_HISTORY'; payload: PatientHistory }
    | { type: 'UPDATE_PATIENT_HISTORY'; payload: PatientHistory }
    | { type: 'DELETE_PATIENT_HISTORY'; payload: string }
    | { type: 'CLEAR_PATIENT_HISTORY'};

interface PatientHistoryState {
    patientHistory: PatientHistory[];
}

const initialPatientHistory: PatientHistory[] = [];

const initialState: PatientHistoryState = {
    patientHistory: initialPatientHistory,
};

const PatientHistoryReducer = (state: PatientHistoryState, action: PatientHistoryAction): PatientHistoryState => {
    switch (action.type) {
        case 'SET_PATIENT_HISTORY':
            return { ...state, patientHistory: action.payload };
        case 'ADD_PATIENT_HISTORY':
            return state.patientHistory.some(item => item.patientId === action.payload.patientId)
                ? state
                : { ...state, patientHistory: [...state.patientHistory, action.payload] };
        case 'UPDATE_PATIENT_HISTORY':
            return {
                ...state,
                patientHistory: state.patientHistory.map(item =>
                    item.patientId === action.payload.patientId ? action.payload : item
                ),
            };
        case 'DELETE_PATIENT_HISTORY':
            return {
                ...state,
                patientHistory: state.patientHistory.filter(item => item.treatmentId !== action.payload),
            };
        case 'CLEAR_PATIENT_HISTORY':
            return { ...state, patientHistory: [] };
        default:
            return state;
    }
};

interface PatientHistoryContextType {
    state: PatientHistoryState;
    dispatch: React.Dispatch<PatientHistoryAction>;
}

const PatientHistoryContext = createContext<PatientHistoryContextType | undefined>(undefined);

interface PatientHistoryProviderProps {
    children: ReactNode;
}

export const PatientHistoryProvider: React.FC<PatientHistoryProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(PatientHistoryReducer, initialState);

    return (
        <PatientHistoryContext.Provider value={{ state, dispatch }}>
            {children}
        </PatientHistoryContext.Provider>
    );
};

export const usePatientHistory = () => {
    const context = useContext(PatientHistoryContext);
    if (!context) {
        throw new Error('Context precisa ser dentro do provider! (usePatientHistory)');
    }
    return context;
};