import { PatientHistory } from "types/history/PatientHistory_Types";

export const calculatePerformanceMessage = (performance: number) => {
    if (performance >= 90) {
        return 'Excelente! Continue assim!';
    } else if (performance >= 75) {
        return 'Muito bom! Está no caminho certo!';
    } else if (performance >= 60) {
        return 'Bom! Pode melhorar!';
    } else if (performance >= 45) {
        return 'Regular! Precisa de mais esforço!';
    } else if (performance >= 30) {
        return 'Fraco! Atenção redobrada!';
    } else {
        return 'Muito abaixo! Procure ajuda!';
    }
};

export const calculateProductivityLevel = (history: PatientHistory) => {
    if (!history) return 'Não definido';

    const overallProductivity = getProductivityLevel(history);

    if (overallProductivity < 50) {
        return 'Abaixo da média';
    } else if (overallProductivity >= 50 && overallProductivity < 75) {
        return 'Na média';
    } else {
        return 'Acima da média';
    }
};

export const getProductivityLevel = (history: PatientHistory) => {
    const questionnaireAnswered = history.questionnaireHistory.answered;
    const questionnaireTotal = history.questionnaireHistory.total;
    const medicationTaken = history.medicationHistory.taken;
    const medicationTotal = history.medicationHistory.total;

    const questionnaireProductivity = (questionnaireAnswered / questionnaireTotal) * 100;
    const medicationProductivity = (medicationTaken / medicationTotal) * 100;
    const overallProductivity = (questionnaireProductivity + medicationProductivity) / 2;

    return overallProductivity;
}