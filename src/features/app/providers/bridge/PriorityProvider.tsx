import { UseBridgeNavigation } from '@features/app/hooks/navigation/UseBridgeNavigation';
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Priority = 'medicationPending' | 'voiceCall' | 'motivationalPhrase' | 'questionnaireAnswer';

interface PriorityContextType {
    priorityList: Priority[];
    addPriority: (priority: Priority) => void;
    removePriority: (priority: Priority) => void;
    highestPriority: Priority | null;
}

const PriorityContext = createContext<PriorityContextType | undefined>(undefined);

// Hierarquia de prioridade
const priorityHierarchy: Priority[] = [
    'medicationPending',
    'voiceCall',
    'motivationalPhrase',
    'questionnaireAnswer'
];

export const PriorityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [priorityList, setPriorityList] = useState<Priority[]>([]);
    const [highestPriority, setHighestPriority] = useState<Priority | null>(null);

    // Adiciona uma prioridade à lista, mantendo a ordem correta com base na hierarquia
    const addPriority = (priority: Priority) => {
        setPriorityList(prev => {
            if (prev.includes(priority)) {
                return prev; // Se a prioridade já estiver na lista, não a adiciona novamente
            }

            // Encontrar o índice onde essa prioridade deve ser inserida
            const newPriorityIndex = priorityHierarchy.indexOf(priority);
            let insertIndex = prev.length; // Por padrão, inserir no final

            // Procurar a posição correta para inserir, respeitando a hierarquia
            for (let i = 0; i < prev.length; i++) {
                if (priorityHierarchy.indexOf(prev[i]) > newPriorityIndex) {
                    insertIndex = i;
                    break;
                }
            }

            // Inserir a prioridade na posição correta
            const newPriorityList = [...prev];
            newPriorityList.splice(insertIndex, 0, priority);

            return newPriorityList;
        });
    };

    // Remove uma prioridade da lista
    const removePriority = (priority: Priority) => {
        setPriorityList(prev => prev.filter(p => p !== priority));
    };

    // Atualiza o estado de highestPriority sempre que priorityList muda
    useEffect(() => {
        if (priorityList.length > 0) {
            setHighestPriority(priorityList[0]);
        } else {
            setHighestPriority(null);
        }
    }, [priorityList]);

    return (
        <PriorityContext.Provider value={{ priorityList, 
            addPriority, removePriority, 
            highestPriority }}>
            {children}
        </PriorityContext.Provider>
    );
};

export const usePriority = (): PriorityContextType => {
    const context = useContext(PriorityContext);
    if (context === undefined) {
        throw new Error('Context precisa ser dentro de Provider! (usePriority) ');
    }
    return context;
};