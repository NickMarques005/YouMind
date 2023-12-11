import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Treatment {
    _id: string;
    name: string;
    email: string;
}

interface State {
    treatments: Treatment[];
}

interface Action {
    type: string;
    payload?: any;
}

interface TreatmentContextProps {
    treatment_state: State;
    addTreatment: (treatment: Treatment) => void;
    removeTreatment: (treatment: Treatment) => void;
}

interface TreatmentProviderProps {
    children: ReactNode
}

const initialState: State = {
    treatments: [],
};

const initialTreatments: Treatment[] = [];

const actionTypes = {
    ADD_TREATMENT: 'ADD_TREATMENT',
    REMOVE_TREATMENT: 'REMOVE_TREATMENT',
};

const TreatmentContext = createContext<TreatmentContextProps | undefined>(undefined);

const TreatmentReducer = (prevState: State, action: Action): State => {
    switch (action.type) {
        case actionTypes.ADD_TREATMENT:
            console.log("ADD_DISPATCH");
            return { ...prevState, treatments: [...prevState.treatments, action.payload] };
        case actionTypes.REMOVE_TREATMENT:
            console.log("REMOVE DISPATCH!");
            return { ...prevState, treatments: prevState.treatments.filter(treatment => treatment !== action.payload) };
        default:
            return prevState;
    }
}

export const TreatmentProvider: React.FC<TreatmentProviderProps> = ({ children }) => {
    const [treatment_state, dispatch] = useReducer(TreatmentReducer, { treatments: initialTreatments });

    const addTreatment = (treatment: Treatment) => {
        dispatch({ type: actionTypes.ADD_TREATMENT, payload: treatment });
    };

    const removeTreatment = (treatment: Treatment) => {
        dispatch({ type: actionTypes.REMOVE_TREATMENT, payload: treatment });
    };

    return (
        <TreatmentContext.Provider value={{ treatment_state, addTreatment, removeTreatment }}>
            {children}
        </TreatmentContext.Provider>
    );
};

export const UseTreatment = (): TreatmentContextProps => {
    const context = useContext(TreatmentContext);
    if (!context) {
        throw new Error("Context precisa ser dentro de Provider! (UseTreatment)");
    }
    return context;
}


