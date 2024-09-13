import React, { createContext, useContext, useReducer, ReactNode, useState } from 'react';
import { UpdatedInitialChat } from 'types/chat/Chat_Types';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';

export interface TreatmentState {
    treatments: TreatmentInfoTemplate[];
}

export type TreatmentActions =
    | { type: 'SET_TREATMENTS'; payload: TreatmentInfoTemplate[] }
    | { type: 'ADD_TREATMENT'; payload: TreatmentInfoTemplate }
    | { type: 'REMOVE_TREATMENT'; payload: string }
    | { type: 'ADD_MULTIPLE_TREATMENTS'; payload: TreatmentInfoTemplate[] }
    | { type: 'UPDATE_INITIAL_CHAT'; payload: UpdatedInitialChat }
    | { type: 'DECREMENT_MSG_COUNT'; payload: { chatId: string } };

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

const TreatmentReducer = (prevState: TreatmentState, action: TreatmentActions): TreatmentState => {
    switch (action.type) {
        case 'SET_TREATMENTS':
            return { ...prevState, treatments: action.payload };

        case 'ADD_TREATMENT':
            if (!prevState.treatments.some(treatment => treatment._id === action.payload._id)) {
                return { ...prevState, treatments: [...prevState.treatments, action.payload] };
            }
            console.warn(`Tratamento com ID ${action.payload._id} já existe em treatments.`);
            return prevState;

        case 'REMOVE_TREATMENT':
            if (prevState.treatments.some(treatment => treatment._id === action.payload)) {
                console.log("Removendo Treatment! ", action.payload);
                return {
                    ...prevState,
                    treatments: prevState.treatments.filter(treatment => treatment._id !== action.payload),
                };
            }
            console.warn(`Tratamento com ID ${action.payload} não foi encontrado em treatments.`);
            return prevState;

        case 'ADD_MULTIPLE_TREATMENTS':
            const newTreatments = action.payload.filter(newTreatment =>
                !prevState.treatments.some(existingTreatment => existingTreatment._id === newTreatment._id)
            );
            return { ...prevState, treatments: [...prevState.treatments, ...newTreatments] };

        case 'UPDATE_INITIAL_CHAT':
            return {
                ...prevState,
                treatments: prevState.treatments.map(treatment =>
                    treatment._id === action.payload.treatmentId
                        ? { ...treatment, chat: action.payload.chat }
                        : treatment
                ),
            };

        case 'DECREMENT_MSG_COUNT':
            return {
                ...prevState,
                treatments: prevState.treatments.map(treatment =>
                    treatment._id === action.payload.chatId && treatment.chat?.msg_count
                        ? {
                            ...treatment,
                            chat: {
                                ...treatment.chat,
                                msg_count: Math.max(treatment.chat.msg_count - 1, 0),
                            },
                        }
                        : treatment
                ),
            };

        default:
            return prevState;
    }
}

export const TreatmentProvider: React.FC<TreatmentProviderProps> = ({ children }) => {
    const [treatment_state, dispatch] = useReducer(TreatmentReducer, { treatments: initialTreatments });

    const setTreatments = (treatments: TreatmentInfoTemplate[]) => {
        dispatch({ type: 'SET_TREATMENTS', payload: treatments });
    }

    const addTreatment = (treatment: TreatmentInfoTemplate) => {
        dispatch({ type: 'ADD_TREATMENT', payload: treatment });
    };

    const addMultipleTreatments = (treatments: TreatmentInfoTemplate[]) => {
        dispatch({ type: 'ADD_MULTIPLE_TREATMENTS', payload: treatments });
    }

    const removeTreatment = (treatmentId: string) => {
        dispatch({ type: 'REMOVE_TREATMENT', payload: treatmentId });
    };

    const updateInitialChat = (updatedInitialChat: UpdatedInitialChat) => {
        dispatch({ type: 'UPDATE_INITIAL_CHAT', payload: updatedInitialChat });
    };

    const decrementMessageNotRead = (chatId: string) => {
        dispatch({ type: 'DECREMENT_MSG_COUNT', payload: { chatId } });
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


