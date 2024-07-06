import { useCallback } from 'react';
import { useMedicationPending } from '@features/app/providers/patient/MedicationPendingProvider';
import { MedicationPending } from 'types/app/patient/health/Medicine_Types';

const UseMedicationSocket = () => {
    const { handleMedicationPending } = useMedicationPending();

    const handleNewMedicationAlert = useCallback((data: MedicationPending) => {
        console.log("Novo alerta: ", data);
        handleMedicationPending(data);
    }, []);

    return { handleNewMedicationAlert };
};

export default UseMedicationSocket;