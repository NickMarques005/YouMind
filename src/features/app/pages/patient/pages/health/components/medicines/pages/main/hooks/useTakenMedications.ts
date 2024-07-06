import { useEffect, useState } from 'react';
import { TakenMedication } from 'types/app/patient/health/Medicine_Types';
import { UseMedicationService } from '@hooks/api/UseMedicationService';
import { SetLoading } from 'types/loading/Loading_Types';

interface UseTakenMedicationsProps{
    selectedDate: Date;
    setLoading: SetLoading
}

const useTakenMedications = ({selectedDate, setLoading}: UseTakenMedicationsProps) => {
    const [takenMedications, setTakenMedications] = useState<TakenMedication[] | undefined>([]);
    const { performGetMedicationsTakenOnDate } = UseMedicationService(setLoading);

    const fetchTakenMedications = async (selectedDate: Date) => {
        const response = await performGetMedicationsTakenOnDate(selectedDate.toISOString().split('T')[0]);
        if(response.success)
        {
            if(response.data)
            {   
                console.log("Taken Medications: ", response.data);
                setTakenMedications(response.data);
            }
            else{
                setTakenMedications(undefined);
            }
        }
    };


    useEffect(() => {
        fetchTakenMedications(selectedDate);
    }, [selectedDate]);

    return { takenMedications }
};

export default useTakenMedications;