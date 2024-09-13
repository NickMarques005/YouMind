import { PatientHistory } from "types/history/PatientHistory_Types";

export const calculatePerformanceMessage = (performance?: number) => {
    if(!performance)
    {
        return "Não há dados suficientes para calcular o desempenho."
    }

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
    if(!overallProductivity || overallProductivity === 0)
    {
        return "Não há desempenho"
    }

    if (overallProductivity < 50) {
        return 'Abaixo da média';
    } else if (overallProductivity >= 50 && overallProductivity < 75) {
        return 'Na média';
    } else {
        return 'Acima da média';
    }
};

export const getProductivityLevel = (history: PatientHistory) => {
    const questionnaireTotal = history.questionnaireHistory.total;
    const medicationTotal = history.medicationHistory.total;

    if(medicationTotal === 0 && questionnaireTotal === 0)
    {
        return undefined;
    }

    const medicationTaken = history.medicationHistory.taken;
    const questionnaireAnswered = history.questionnaireHistory.answered;

    const questionnaireProductivity = (questionnaireAnswered / questionnaireTotal) * 100;
    const medicationProductivity = (medicationTaken / medicationTotal) * 100;
    let overallProductivity = (questionnaireProductivity + medicationProductivity) / 2;

    const minDataPoints = 3;
    const dataPoints = questionnaireTotal + medicationTotal;
    const dampingFactor = dataPoints < minDataPoints ? (dataPoints / minDataPoints) : 1;

    overallProductivity *= dampingFactor;

    return Math.round(overallProductivity);
}

// Função para calcular o desempenho geral dos pacientes
export const calculateOverallPatientProdutivity = (patientHistories: PatientHistory[]): number => {
    if (patientHistories.length === 0) return 0;

    const totalPerformance = patientHistories.reduce((sum, history) => {
        const performance = getProductivityLevel(history) || 0;
        return sum + performance;
    }, 0);

    const averagePerformance = totalPerformance / patientHistories.length;
    return averagePerformance;
}