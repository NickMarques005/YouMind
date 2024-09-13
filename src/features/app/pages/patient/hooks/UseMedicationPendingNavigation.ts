import { usePriority } from "@features/app/providers/bridge/PriorityProvider";
import { useMedicationPending } from "@features/app/providers/patient/MedicationPendingProvider"
import { UseForm } from "@features/app/providers/sub/UserProvider";
import { useEffect } from "react";

export const useMedicationPendingNavigationRedirection = () => {
    const { medicationPending } = useMedicationPending();
    const { addPriority } = usePriority();
    const { userData } = UseForm();

    useEffect(() => {
        if(medicationPending && userData && userData.type === 'patient')
        {
            // Se houver medicationPending e usuário estiver autenticado como paciente 
            //então ativar a prioridade medicationPending            
            addPriority('medicationPending');
        }

    }, [medicationPending, userData]);

    return null;
}