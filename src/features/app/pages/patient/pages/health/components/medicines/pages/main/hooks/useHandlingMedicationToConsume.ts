import { useEffect, useState } from 'react';
import { Medication } from 'types/app/patient/health/Medicine_Types';

interface UseHandlingMedicationsToConsumeProps{
    medications: Medication[];
    selectedDate: Date;
}

const useHandlingMedicationsToConsume = ({medications, selectedDate}: UseHandlingMedicationsToConsumeProps) => {
    const [medicationsToConsume, setMedicationsToConsume] = useState<Medication[] | undefined>([]);

    useEffect(() => {
        const filterMedications = () => {
            console.log("Filter Medications");
            const filteredMedications = medications.filter(medication => {
                const startDate = new Date(medication.start);
                const expiresAt = new Date(medication.expiresAt);
                const frequency = medication.frequency;

                if (selectedDate >= startDate && selectedDate <= expiresAt) {
                    const differenceInMilliseconds = selectedDate.getTime() - startDate.getTime();
                    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 3600 * 24));

                    return differenceInDays % frequency === 0;
                }

                return false;
            });

            if (filteredMedications.length === 0) {
                setMedicationsToConsume(undefined);
                return;
            }

            setMedicationsToConsume(filteredMedications);
        };

        filterMedications();
    }, [selectedDate, medications]);

    return { medicationsToConsume };
};

export default useHandlingMedicationsToConsume;