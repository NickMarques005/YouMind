import { PatientHistory } from "types/history/PatientHistory_Types";
import { TreatmentInfoTemplate } from "types/treatment/Treatment_Types";

const calculateDampingFactor = (questionnaireTotal: number, medicationTotal: number, minDataPoints: number) => {
    const dataPoints = questionnaireTotal + medicationTotal;
    return dataPoints < minDataPoints ? (dataPoints / minDataPoints) : 1;
};

export const calculateAllPerformances = (treatments: TreatmentInfoTemplate[], doctorId?: string): number => {
    if (!doctorId) {
        console.error("Id do doutor não definida!");
        return 0;
    }

    const minDataPoints = 3; // Número mínimo de registros para confiança no desempenho

    const activePerformances = treatments
        .filter(treatment => treatment.treatmentStatus === 'active')
        .map(treatment => {
            const currentPerformance = treatment.status?.currentPerformance || 0;

            console.log(currentPerformance);
            const questionnaireTotal = treatment.status?.questionnaires || 0;
            const medicationTotal = treatment.status?.medications || 0;
            const dampingFactor = calculateDampingFactor(questionnaireTotal, medicationTotal, minDataPoints);
            return currentPerformance * dampingFactor;
        });

    const endedPerformances = treatments
        .filter(treatment => treatment.treatmentStatus === 'completed')
        .map(treatment => {
            const relevantSessions = treatment.sessions?.filter(session =>
                session.engagedDoctor?.uid === doctorId
            );
            // A última sessão que o paciente teve com esse doutor
            const lastSession = relevantSessions?.slice(-1)[0];

            const finalPerformance = lastSession?.finalPerformance ?? 0;
            const questionnaireTotal = treatment.status?.questionnaires || 0;
            const medicationTotal = treatment.status?.medications || 0;
            const dampingFactor = calculateDampingFactor(questionnaireTotal, medicationTotal, minDataPoints);
            return finalPerformance * dampingFactor;
        });

    // Junção dos desempenhos
    const allPerformances = [...activePerformances, ...endedPerformances];

    // Exclui desempenhos que não têm dados suficientes (tratamentos iniciais)
    const validPerformances = allPerformances.filter(performance => performance > 0);

    // Cálculo da média do total de desempenhos
    const totalPerformance = validPerformances.reduce((total, perf) => total + perf, 0);
    return validPerformances.length > 0 ? totalPerformance / validPerformances.length : 0;
};

export const calculateCurrentTreatmentsPerformances = (currentTreatments: TreatmentInfoTemplate[]) => {
    const minDataPoints = 3; // Número mínimo de registros para confiança no desempenho

    const activePerformances = currentTreatments
        .filter(treatment => treatment.treatmentStatus === 'active')
        .map(treatment => {
            const currentPerformance = treatment.status?.currentPerformance || 0;

            const questionnaireTotal = treatment.status?.questionnaires || 0;
            const medicationTotal = treatment.status?.medications || 0;
            const dampingFactor = calculateDampingFactor(questionnaireTotal, medicationTotal, minDataPoints);
            return currentPerformance * dampingFactor;
        });

    // Exclui desempenhos que não têm dados suficientes (tratamentos iniciais)
    const validPerformances = activePerformances.filter(performance => performance > 0);

    // Cálculo da média do total de desempenhos dos tratamentos atuais
    const totalPerformance = validPerformances.reduce((total, perf) => total + perf, 0);

    return validPerformances.length > 0 ? totalPerformance / validPerformances.length : 0;
}

export const calculateTreatmentPerformance = (treatment: TreatmentInfoTemplate, minDataPoints: number) => {
    const currentPerformance = treatment.status?.currentPerformance || 0;
    const questionnaireTotal = treatment.status?.questionnaires || 0;
    const medicationTotal = treatment.status?.medications || 0;
    const dampingFactor = calculateDampingFactor(questionnaireTotal, medicationTotal, minDataPoints);
    return currentPerformance * dampingFactor;
}
