import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';

export interface TreatmentEndedState {
    endedTreatments: TreatmentInfoTemplate[];
}

export type TreatmentEndedActions =
    | { type: 'SET_ENDED_TREATMENTS'; payload: TreatmentInfoTemplate[] }
    | { type: 'ADD_ENDED_TREATMENT'; payload: TreatmentInfoTemplate }
    | { type: 'REMOVE_ENDED_TREATMENT'; payload: string }
    | { type: 'REMOVE_ALL_ENDED_TREATMENTS' };

interface TreatmentEndedContextProps {
    treatmentEndedState: TreatmentEndedState;
    setEndedTreatments: (treatments: TreatmentInfoTemplate[]) => void;
    addEndedTreatment: (treatment: TreatmentInfoTemplate) => void;
    removeEndedTreatment: (treatmentId: string) => void;
    removeAllEndedTreatments: () => void;
}

interface TreatmentEndedProviderProps {
    children: ReactNode;
}

const initialEndedTreatments: TreatmentInfoTemplate[] = [];

const actionTypes = {
    SET_ENDED_TREATMENTS: 'SET_ENDED_TREATMENTS',
    ADD_ENDED_TREATMENT: 'ADD_ENDED_TREATMENT',
    REMOVE_ENDED_TREATMENT: 'REMOVE_ENDED_TREATMENT',
    REMOVE_ALL_ENDED_TREATMENTS: 'REMOVE_ALL_ENDED_TREATMENTS',
};

const TreatmentEndedContext = createContext<TreatmentEndedContextProps | undefined>(undefined);

const TreatmentEndedReducer = (prevState: TreatmentEndedState, action: TreatmentEndedActions): TreatmentEndedState => {
    switch (action.type) {
        case 'SET_ENDED_TREATMENTS':
            return { ...prevState, endedTreatments: action.payload };
        case 'ADD_ENDED_TREATMENT':
            if (!prevState.endedTreatments.some(treatment => treatment._id === action.payload._id)) {
                console.log("Adicionando Tratamento Encerrado: ", action.payload);
                return { ...prevState, endedTreatments: [...prevState.endedTreatments, action.payload] };
            }
            console.error(`Tratamento com ID ${action.payload._id} já existe em endedTreatments.`);
            return prevState;
        case 'REMOVE_ENDED_TREATMENT':
            if (prevState.endedTreatments.some(treatment => treatment._id === action.payload)) {
                console.log("Removendo Tratamento Encerrado: ", action.payload);
                return {
                    ...prevState,
                    endedTreatments: prevState.endedTreatments.filter(treatment => treatment._id !== action.payload),
                };
            }
            return prevState;
        case 'REMOVE_ALL_ENDED_TREATMENTS':
            return { ...prevState, endedTreatments: [] };
        default:
            return prevState;
    }
};

export const TreatmentEndedProvider: React.FC<TreatmentEndedProviderProps> = ({ children }) => {
    const [treatmentEndedState, dispatch] = useReducer(TreatmentEndedReducer, { endedTreatments: initialEndedTreatments });

    const setEndedTreatments = (treatments: TreatmentInfoTemplate[]) => {
        dispatch({ type: 'SET_ENDED_TREATMENTS', payload: treatments });
    };

    const addEndedTreatment = (treatment: TreatmentInfoTemplate) => {
        dispatch({ type: 'ADD_ENDED_TREATMENT', payload: treatment });
    };

    const removeEndedTreatment = (treatmentId: string) => {
        dispatch({ type: 'REMOVE_ENDED_TREATMENT', payload: treatmentId });
    };

    const removeAllEndedTreatments = () => {
        dispatch({ type: 'REMOVE_ALL_ENDED_TREATMENTS' });
    };

    return (
        <TreatmentEndedContext.Provider value={{
            treatmentEndedState,
            setEndedTreatments,
            addEndedTreatment,
            removeEndedTreatment,
            removeAllEndedTreatments
        }}>
            {children}
        </TreatmentEndedContext.Provider>
    );
};

export const UseTreatmentEnded = (): TreatmentEndedContextProps => {
    const context = useContext(TreatmentEndedContext);
    if (!context) {
        throw new Error("Context precisa ser dentro de Provider! (UseTreatmentEnded)");
    }
    return context;
};