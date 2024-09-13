import { useEffect, useState } from 'react';
import { TreatmentInfoTemplate } from 'types/treatment/Treatment_Types';
import { calculateAllPerformances } from '@utils/treatment/HandlingPerformance';

interface UseDoctorStatusBehaviorParams {
    currentTreatments: TreatmentInfoTemplate[],
    endedTreatments: TreatmentInfoTemplate[],
    doctorId: string | undefined
}

export const useDoctorStatusBehavior = (
    { currentTreatments,
        endedTreatments,
        doctorId }: UseDoctorStatusBehaviorParams) => {
    const [allTreatments, setAllTreatments] = useState<TreatmentInfoTemplate[]>([...currentTreatments, ...endedTreatments]);
    const [finalPerformance, setFinalPerformance] = useState<number>(0);


    useEffect(() => {
        setAllTreatments([...currentTreatments, ...endedTreatments]);
    }, [currentTreatments, endedTreatments]);

    useEffect(() => {
        if (doctorId) {
            const performance = calculateAllPerformances(allTreatments, doctorId);
            setFinalPerformance(performance);
        }
    }, [allTreatments, doctorId]);

    return {
        allTreatments,
        finalPerformance,
    };
};