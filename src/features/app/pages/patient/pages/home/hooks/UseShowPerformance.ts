import { useQuestionPerformance } from "@features/app/providers/patient/QuestionPerformanceProvider";
import { useEffect, useState } from "react";
import { QuestionPerformance } from "types/history/PatientHistory_Types";


export const useShowQuestionPerformance = () => {
    const { questionPerformance } = useQuestionPerformance();
    const [performance, setPerformance] = useState<QuestionPerformance>(0);

    useEffect(() => {
        if(questionPerformance !== performance)
        {
            setPerformance(questionPerformance);
        }
    }, [questionPerformance]);

    return { performance }
}