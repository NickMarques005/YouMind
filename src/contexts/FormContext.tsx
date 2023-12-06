import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormData {
    id: string;
    email: string;
    name: string;
    phone: number | null;
}

interface FormContextData {
    formData: FormData;
    updateFormData: (data: {
        id: string;
        email: string;
        name: string;
        phone: number | null; 
    }) => void;
}

const FormContext = createContext<FormContextData | undefined>(undefined);

interface FormProviderProps {
    children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({children}) => {
    const [formData, setFormData] = useState<FormData>({
        id: '',
        email: '',
        name: '',
        phone: null,
    });

    const updateFormData = (data: {id: string; email: string; name: string; phone: number | null}) => {
        setFormData(data);
    };

    return (
        <FormContext.Provider value={{formData, updateFormData }}>
            {children}
        </FormContext.Provider>
    )
};

export const UseForm = () => {
    const context = useContext(FormContext);
    if(!context){
        throw new Error('Context precisa ser dentro do Provider! (UseForm)')
    }
    return context;
}