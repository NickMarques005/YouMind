import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { LatestMedication } from 'types/history/PatientHistory_Types';

type LatestMedicationAction =
    | { type: 'SET_LATEST_MEDICATIONS'; payload: LatestMedication[] }
    | { type: 'ADD_LATEST_MEDICATION'; payload: LatestMedication }
    | { type: 'UPDATE_LATEST_MEDICATION'; payload: LatestMedication }
    | { type: 'DELETE_LATEST_MEDICATION'; payload: string };

interface LatestMedicationState {
    latestMedication: LatestMedication[];
}

const initialLatestMedication: LatestMedication[] = [];

const initialState: LatestMedicationState = {
    latestMedication: initialLatestMedication,
};

const LatestMedicationReducer = (state: LatestMedicationState, action: LatestMedicationAction): LatestMedicationState => {
    switch (action.type) {
        case 'SET_LATEST_MEDICATIONS':
            return { ...state, latestMedication: action.payload };
        case 'ADD_LATEST_MEDICATION':
            return { ...state, latestMedication: [...state.latestMedication, action.payload] };
        case 'UPDATE_LATEST_MEDICATION':
            return {
                ...state,
                latestMedication: state.latestMedication.map(item =>
                    item._id === action.payload._id ? action.payload : item
                ),
            };
        case 'DELETE_LATEST_MEDICATION':
            return {
                ...state,
                latestMedication: state.latestMedication.filter(item => item._id !== action.payload),
            };
        default:
            return state;
    }
};

interface LatestMedicationContextType {
    state: LatestMedicationState;
    dispatch: React.Dispatch<LatestMedicationAction>;
}

const LatestMedicationContext = createContext<LatestMedicationContextType | undefined>(undefined);

interface LatestMedicationProviderProps {
    children: ReactNode;
}

export const LatestMedicationProvider: React.FC<LatestMedicationProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(LatestMedicationReducer, initialState);

    return (
        <LatestMedicationContext.Provider value={{ state, dispatch }}>
            {children}
        </LatestMedicationContext.Provider>
    );
};

export const useLatestMedication = () => {
    const context = useContext(LatestMedicationContext);
    if (!context) {
        throw new Error('Context precisa ser dentro do provider! (useLatestMedicaiton)');
    }
    return context;
};