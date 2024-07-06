import { useState } from "react"
import { Medication } from "types/app/patient/health/Medicine_Types"

interface UseUpdateMedicationProps {
    medication: Medication;
}

export const useUpdateMedication = ({ medication }: UseUpdateMedicationProps) => {
    const [updateMedication, setUpdateMedication] = useState<Medication>(medication);

    const handleInputChange = (key: keyof Medication, value: string) => {
        setUpdateMedication((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return {
        updateMedication,
        handleInputChange
    }
}