import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Medication } from 'types/app/patient/health/Medicine_Types';

type MedicationAction =
    | { type: 'ADD_MEDICATION'; medication: Medication }
    | { type: 'REMOVE_MEDICATION'; id: string }
    | { type: 'UPDATE_MEDICATION'; id: string; medication: Medication }
    | { type: 'ADD_MULTIPLE_MEDICATIONS'; medications: Medication[] }
    | { type: 'REMOVE_MULTIPLE_MEDICATIONS'; ids: string[] }
    | { type: 'CLEAR_MEDICATIONS' };

const initialState: Medication[] = [];

const MedicationReducer = (state: Medication[], action: MedicationAction): Medication[] => {
    switch (action.type) {
        case 'ADD_MEDICATION':
            if (state.some(item => item._id === action.medication._id)) {
                return state;
            }
            return [...state, action.medication];
        case 'REMOVE_MEDICATION':
            return state.filter((medication) => medication._id !== action.id);
        case 'UPDATE_MEDICATION':
            return state.map((medication) =>
                medication._id === action.id ? { ...action.medication, _id: action.id } : medication
            );
        case 'ADD_MULTIPLE_MEDICATIONS':
            const newMedications = action.medications.filter(m =>
                !state.some(existing => existing._id === m._id)
            );
            return [...state, ...newMedications];
        case 'REMOVE_MULTIPLE_MEDICATIONS':
            return state.filter((medication) => !action.ids.includes(medication._id));
        case 'CLEAR_MEDICATIONS':
            return [];
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

