import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { MessageIcon } from '@components/modals/message/types/type_message_modal';
import { UseLoading } from '@hooks/loading/UseLoading';

interface SuccessMessage {
    message?: string;
    messageType?: MessageIcon;
}

interface ResponseContextType {
    responseAppError?: string;
    connectionAppError?: string;
    responseAppSuccess?: SuccessMessage;
    ClearResponseAppError: () => void;
    ClearConnectionAppError: () => void;
    ClearResponseAppSuccess: () => void;
    HasAppError: () => boolean;
    HandleResponseAppError: (value: string) => void;
    HandleConnectionAppError: (value: string) => void;
    HandleResponseAppSuccess: (message: string, messageType?: MessageIcon) => void;
    stateAppLoading: {
        loading: boolean;
        setLoading: Dispatch<SetStateAction<boolean>>;
    };
}

const ResponseContext = createContext<ResponseContextType | undefined>(undefined);

interface ResponseProviderProps {
    children: ReactNode;
}

export const ResponseProvider: React.FC<ResponseProviderProps> = ({ children }) => {
    const [responseAppError, setResponseAppError] = useState<string | undefined>(undefined);
    const [connectionAppError, setConnectionAppError] = useState<string | undefined>(undefined);
    const [responseAppSuccess, setResponseAppSuccess] = useState<SuccessMessage | undefined>(undefined);
    const stateAppLoading = UseLoading();

    const ClearResponseAppError = () => {
        setResponseAppError(undefined);
    };

    const ClearConnectionAppError = () => {
        setConnectionAppError(undefined);
    }

    const ClearResponseAppSuccess = () => {
        setResponseAppSuccess(undefined);
    };

    const HasAppError = () => {
        return !!responseAppError;
    };

    const HandleResponseAppError = (value: string) => {
        console.log("Set Response Error");
        setResponseAppError(value);
    };

    const HandleConnectionAppError = (value: string) => {
        console.log("Set Connection Error");
        setConnectionAppError(value);
    }

    const HandleResponseAppSuccess = (message: string, messageType?: MessageIcon) => {
        setResponseAppSuccess({ message, messageType });
    };

    return (
        <ResponseContext.Provider value={{
            responseAppError,
            connectionAppError,
            responseAppSuccess,
            ClearResponseAppError,
            ClearConnectionAppError,
            ClearResponseAppSuccess,
            HasAppError,
            HandleResponseAppError,
            HandleConnectionAppError,
            HandleResponseAppSuccess,
            stateAppLoading
        }}>
            {children}
        </ResponseContext.Provider>
    );
};


export const UseGlobalResponse = (): ResponseContextType => {
    const context = useContext(ResponseContext);
    if (context === undefined) {
        throw new Error('Error Context precisa estar dentro do provider (ResponseProvider)');
    }
    return context;
};