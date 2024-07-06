import { usePatientHistory } from "@features/app/providers/doctor/PatientHistoryProvider";
import { calculatePerformanceMessage, calculateProductivityLevel } from "@utils/treatment/HandlingHistory";
import { useEffect, useState } from "react";
import { PatientHistory } from "types/history/PatientHistory_Types";



export const UsePatientProgressHandling = (patientId?: string) => {

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
        if(patientId && state.patientHistory.length !== 0)
        {
            const currentHistory = state.patientHistory.find(history => history.patientId === patientId);
            if(currentHistory)
            {
                setHistory(currentHistory);
                setPatientProgress(currentHistory.overallPerformance);
            }
        }
    }, [state.patientHistory]);


    return { patientProgress, history, performanceMessage, productivityLevel }
}