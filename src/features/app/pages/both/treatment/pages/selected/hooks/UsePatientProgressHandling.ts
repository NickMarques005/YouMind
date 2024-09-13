import { usePatientHistory } from "@features/app/providers/doctor/PatientHistoryProvider";
import { calculatePerformanceMessage, calculateProductivityLevel } from "@utils/treatment/HandlingHistory";
import { calculateTreatmentPerformance } from "@utils/treatment/HandlingPerformance";
import { useEffect, useState } from "react";
import { PatientHistory } from "types/history/PatientHistory_Types";
import { TreatmentInfoTemplate } from "types/treatment/Treatment_Types";

interface UsePatientProgressHandlingParams {
    currentTreatment?: TreatmentInfoTemplate;
}


export const UsePatientProgressHandling = ({ currentTreatment }: UsePatientProgressHandlingParams) => {

    const { state } = usePatientHistory();

    const [patientProgress, setPatientProgress] = useState(0);
    const [history, setHistory] = useState<PatientHistory | undefined>(undefined);
    const [productivityLevel, setProductivityLevel] = useState('');
    const [performanceMessage, setPerformanceMessage] = useState('');

    useEffect(() => {
        if (history) {
            setProductivityLevel(calculateProductivityLevel(history));
            setPerformanceMessage(calculatePerformanceMessage(history.overallPerformance));
        }
    }, [history]);
    
    useEffect(() => {
        if(currentTreatment?.uid && state.patientHistory.length !== 0)
        {
            const currentHistory = state.patientHistory.find(history => history.patientId === currentTreatment?.uid);
            
            if(currentHistory && currentTreatment)
            {
                const minDataPoints = 3;
                const newPatientProgress = calculateTreatmentPerformance(currentTreatment, minDataPoints);
                setHistory(currentHistory);
                setPatientProgress(newPatientProgress);
            }
        }
    }, [state.patientHistory]);


    return { patientProgress, history, performanceMessage, productivityLevel }
}