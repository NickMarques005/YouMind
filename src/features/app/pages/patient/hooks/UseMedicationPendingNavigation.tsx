import { UseAppNavigation } from "@features/app/hooks/UseAppNavigation";
import { useMedicationPending } from "@features/app/providers/patient/MedicationPendingProvider"
import { UseForm } from "@features/app/providers/sub/UserProvider";
import { useEffect } from "react";
import { MedicationPending } from "types/app/patient/health/Medicine_Types";


export const useMedicationPendingNavigation = () => {
    const { medicationPending, handleMedicationPending } = useMedicationPending();
    const { navigateToAppScreen } = UseAppNavigation();
    const { userData } = UseForm();

    useEffect(() => {
        if(medicationPending && userData && userData.type === 'patient')
        {
            navigateToAppScreen('alert_medication');
        }

    }, [medicationPending, userData]);

    return null;
}