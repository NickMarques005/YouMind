import { UseMedicationService } from '@hooks/api/UseMedicationService';
import { useEffect, useState } from 'react';
import { Medication, MedicationToConsume } from 'types/app/patient/health/Medicine_Types';

interface UseHandlingMedicationsToConsumeProps{
    medications: Medication[];
    selectedDate: Date;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const useHandlingMedicationsToConsume = ({medications, selectedDate, setLoading}: UseHandlingMedicationsToConsumeProps) => {
    const [medicationsToConsume, setMedicationsToConsume] = useState<MedicationToConsume[] | undefined>([]);
    const { performGetMedicationsToConsumeOnDate } = UseMedicationService(setLoading);

    const fetchTakenMedications = async (selectedDate: Date) => {
        const response = await performGetMedicationsToConsumeOnDate(selectedDate.toISOString());
        if(response.success)
        {
            if(response.data)
            {   
                let medications = undefined;
                if(response.data.length !== 0) {
                    medications = response.data;
                }
                
                setMedicationsToConsume(medications);
            }
            else{
                setMedicationsToConsume(undefined);
            }
        }
    };


    useEffect(() => {
        fetchTakenMedications(selectedDate);
    }, [selectedDate, medications]);

    return { medicationsToConsume };
};

export default useHandlingMedicationsToConsume;