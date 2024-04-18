import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Medicine {
    id: number;
    type: string;
    name: string;
    start_period: string;
    final_period: string;
    last_period: string;
    frequency: string;
    quantity: number;
    value: number | null;
    checked: boolean;
}

type MedicineAction =
    | { type: 'ADD_MEDICINE'; medicine: Medicine }
    | { type: 'REMOVE_MEDICINE'; id: number };

const initialState: Medicine[] = [
    {
        id: 1,
        type: 'pill',
        name: 'Medicamento 1',
        start_period: '2023-11-21', 
        final_period: '2023-12-30', 
        last_period: '2023-11-18', 
        frequency: '3',
        quantity: 1,
        value: 10,
        checked: false,
    },
    // Medicamento 2
    {
        id: 2,
        type: 'bottle',
        name: 'Medicamento 2',
        start_period: '2023-11-23',
        final_period: '2023-12-06',
        last_period: '2023-11-23',
        frequency: '3',
        quantity: 30,
        value: 2,
        checked: false,
    },
    {
        id: 3,
        type: 'pill',
        name: 'Medicamento 3',
        start_period: '2023-11-06',
        final_period: '2023-12-02',
        last_period: '2023-11-20',
        frequency: '2',
        quantity: 1,
        value: 1,
        checked: false,
    },
    {
        id: 4,
        type: 'pills',
        name: 'Medicamento 4',
        start_period: '2023-09-14',
        final_period: '2023-11-30',
        last_period: '2023-11-21',
        frequency: '5',
        quantity: 4,
        value: 2,
        checked: true,
    },
    {
        id: 5,
        type: 'bottle',
        name: 'Medicamento 5',
        start_period: '2023-11-14',
        final_period: '2023-12-06',
        last_period: '2023-11-14',
        frequency: '7',
        quantity: 2,
        value: 5,
        checked: false,
    },
    {
        id: 6,
        type: 'pills',
        name: 'Medicamento 6',
        start_period: '2023-10-20',
        final_period: '2023-12-06',
        last_period: '2023-11-17',
        frequency: '3',
        quantity: 3,
        value: 2,
        checked: true,
    },
];

const MedicineReducer = (state: Medicine[], action: MedicineAction): Medicine[] => {
    switch (action.type) {
        case 'ADD_MEDICINE':
            return [...state, action.medicine];
        case 'REMOVE_MEDICINE':
            return state.filter((medicine) => medicine.id !== action.id);
        default:
            return state;
    }
}

interface MedicineContextType {
    medicines: Medicine[];
    dispatch: React.Dispatch<MedicineAction>;
}

type MedicineProviderProps = {
    children: ReactNode;
}

const MedicineContext = createContext<MedicineContextType | undefined>(undefined);

export const UseMedicines = () => {
    const context = useContext(MedicineContext);
    if (!context) {
        throw new Error("Context precisa ser dentro do Provider correspondente (MedicineContext)");
    }
    return context;
};

export const MedicineProvider = ({ children }: MedicineProviderProps) => {
    const [medicines, dispatch] = useReducer(MedicineReducer, initialState);

    return (
        <MedicineContext.Provider value={{ medicines, dispatch }}>
            {children}
        </MedicineContext.Provider>
    )
}

