import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Medication } from 'types/app/patient/health/Medicine_Types';

type MedicationAction =
    | { type: 'ADD_MEDICATION'; medication: Medication }
    | { type: 'REMOVE_MEDICATION'; id: string }
    | { type: 'UPDATE_MEDICATION'; id: string; medication: Medication }
    | { type: 'ADD_MULTIPLE_MEDICATIONS'; medications: Medication[] }
    | { type: 'REMOVE_MULTIPLE_MEDICATIONS'; ids: string[] };

const initialState: Medication[] = [];

const MedicationReducer = (state: Medication[], action: MedicationAction): Medication[] => {
    switch (action.type) {
        case 'ADD_MEDICATION':
            return [...state, action.medication];
        case 'REMOVE_MEDICATION':
            return state.filter((medication) => medication._id !== action.id);
        case 'UPDATE_MEDICATION':
            return state.map((medication) =>
                medication._id === action.id ? { ...action.medication, _id: action.id } : medication
            );
        case 'ADD_MULTIPLE_MEDICATIONS':
            return [...state, ...action.medications];
        case 'REMOVE_MULTIPLE_MEDICATIONS':
            return state.filter((medication) => !action.ids.includes(medication._id));
        default:
            return state;
    }
}

interface MedicationContextType {
    medications: Medication[];
    dispatch: React.Dispatch<MedicationAction>;
}

type MedicationProviderProps = {
    children: ReactNode;
}

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

export const UseMedications = () => {
    const context = useContext(MedicationContext);
    if (!context) {
        throw new Error("Context precisa ser dentro do Provider correspondente (MedicationContext)");
    }
    return context;
};

export const MedicationProvider = ({ children }: MedicationProviderProps) => {
    const [medications, dispatch] = useReducer(MedicationReducer, initialState);

    return (
        <MedicationContext.Provider value={{ medications, dispatch }}>
            {children}
        </MedicationContext.Provider>
    )
}

