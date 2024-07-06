import React, { createContext, useContext, useState } from "react";
import { QuestionPerformance } from "types/history/PatientHistory_Types";

interface QuestionPerformanceContextType {
    questionPerformance: QuestionPerformance;
    handleQuestionPerformance: (performance: QuestionPerformance) => void;
    clearQuestionPerformance: () => void;
}

interface QuestionPerformanceProvider {
    children: React.ReactNode;
}

const defaultQuestionPerformance: QuestionPerformance = 0;

const QuestionPerformanceContext = createContext<QuestionPerformanceContextType | undefined>(undefined);

export const QuestionPerformanceProvider: React.FC<QuestionPerformanceProvider> = ({ children }) => {
    const [questionPerformance, setQuestionPerformance] = useState<QuestionPerformance>(defaultQuestionPerformance);

    const handleQuestionPerformance = (performance: QuestionPerformance) => {
        setQuestionPerformance(performance);
    }

    const clearQuestionPerformance = () => {
        setQuestionPerformance(0);
    }

    return (
        <QuestionPerformanceContext.Provider value={{ questionPerformance, handleQuestionPerformance, clearQuestionPerformance }}>
            {children}
        </QuestionPerformanceContext.Provider>
    );
};

export const useQuestionPerformance = () => {
    const context = useContext(QuestionPerformanceContext);
    if (!context) {
        throw new Error("useQuestionPerformance deve ser dentro QuestionPerformanceProvider");
    }
    return context;
};