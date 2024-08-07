import React, { createContext, useContext, useReducer, ReactNode, useState } from 'react';
import { UpdatedInitialChat } from 'types/chat/Chat_Types';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';


export interface TreatmentState {
    treatments: TreatmentInfoTemplate[];
}

interface Action {
    type: string;
    payload?: any;
}

interface TreatmentContextProps {
    treatment_state: TreatmentState;
    setTreatments: (treatments: TreatmentInfoTemplate[]) => void;
    addTreatment: (treatment: TreatmentInfoTemplate) => void;
    addMultipleTreatments: (treatments: TreatmentInfoTemplate[]) => void;
    removeTreatment: (treatmentId: string) => void;
    updateInitialChat: (updatedInitialChat: UpdatedInitialChat) => void;
    decrementMessageNotRead: (chatId: string) => void;
}

interface TreatmentProviderProps {
    children: ReactNode
}

const initialState: TreatmentState = {
    treatments: [],
};

const initialTreatments: TreatmentInfoTemplate[] = [];

const actionTypes = {
    SET_TREATMENTS: 'SET_TREATMENTS',
    ADD_TREATMENT: 'ADD_TREATMENT',
    REMOVE_TREATMENT: 'REMOVE_TREATMENT',
    ADD_MULTIPLE_TREATMENTS: 'ADD_MULTIPLE_TREATMENTS',
    UPDATE_INITIAL_CHAT: 'UPDATE_INITIAL_CHAT',
    DECREMENT_MSG_COUNT: 'DECREMENT_MSG_COUNT',
};

const TreatmentContext = createContext<TreatmentContextProps | undefined>(undefined);

const TreatmentReducer = (prevState: TreatmentState, action: Action): TreatmentState => {
    switch (action.type) {
        case actionTypes.SET_TREATMENTS:
            console.log("SET TREATMENTS DISPATCH!");
            return { ...prevState, treatments: action.payload };
        case actionTypes.ADD_TREATMENT:
            console.log("ADD_DISPATCH");
            return { ...prevState, treatments: [...prevState.treatments, action.payload] };
        case actionTypes.REMOVE_TREATMENT:
            console.log("REMOVE DISPATCH!");
            return { ...prevState, treatments: prevState.treatments.filter(treatment => treatment._id !== action.payload) };
        case actionTypes.ADD_MULTIPLE_TREATMENTS:
            console.log("ADD MULTIPLE DISPATCH!");
            return { ...prevState, treatments: [...prevState.treatments, ...action.payload] };
        case actionTypes.UPDATE_INITIAL_CHAT:
            console.log("UPDATE INITIAL CHAT DISPATCH!");
            return {
                ...prevState,
                treatments: prevState.treatments.map(treatment =>
                    treatment._id === action.payload.treatmentId
                        ? { ...treatment, chat: action.payload.chat }
                        : treatment
                )
            };
        case actionTypes.DECREMENT_MSG_COUNT:
            return {
                ...prevState,
                treatments: prevState.treatments.map(treatment =>
                    treatment._id === action.payload.chatId && treatment.chat?.msg_count 
                        ? {
                            ...treatment,
                            chat: {
                                ...treatment.chat,
                                msg_count: Math.max(treatment.chat.msg_count - 1, 0)
                            }
                        }
                        : treatment
                )
            };
        default:
            return prevState;
    }
}

export const TreatmentProvider: React.FC<TreatmentProviderProps> = ({ children }) => {
    const [treatment_state, dispatch] = useReducer(TreatmentReducer, { treatments: initialTreatments });

    const setTreatments = (treatments: TreatmentInfoTemplate[]) => {
        dispatch({ type: actionTypes.SET_TREATMENTS, payload: treatments });
    }

    const addTreatment = (treatment: TreatmentInfoTemplate) => {
        dispatch({ type: actionTypes.ADD_TREATMENT, payload: treatment });
    };

    const addMultipleTreatments = (treatments: TreatmentInfoTemplate[]) => {
        dispatch({ type: actionTypes.ADD_MULTIPLE_TREATMENTS, payload: treatments });
    }

    const removeTreatment = (treatmentId: string) => {
        dispatch({ type: actionTypes.REMOVE_TREATMENT, payload: treatmentId });
    };

    const updateInitialChat = (updatedInitialChat: UpdatedInitialChat) => {
        dispatch({ type: actionTypes.UPDATE_INITIAL_CHAT, payload: updatedInitialChat });
    };

    const decrementMessageNotRead = (chatId: string) => {
        dispatch({ type: actionTypes.DECREMENT_MSG_COUNT, payload: { chatId } });
    };

    return (
        <TreatmentContext.Provider value={{ treatment_state, setTreatments, addTreatment, addMultipleTreatments, removeTreatment, updateInitialChat, decrementMessageNotRead }}>
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


