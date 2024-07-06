import { MessageIcon } from "@components/modals/message/types/type_message_modal";
import { UseAppNavigation } from "@features/app/hooks/UseAppNavigation";
import { UseTreatmentNavigation } from "@features/app/pages/both/treatment/hooks/UseTreatmentNavigation";
import { usePatientHistory } from "@features/app/providers/doctor/PatientHistoryProvider";
import { UseTreatmentService } from "@hooks/api/UseTreatmentService";
import { UseTreatment } from "@providers/TreatmentProvider";
import { useState } from "react";
import { SetLoading } from "types/loading/Loading_Types"
import { Verification } from "types/verification/Verification_Types";

interface UseTerminateTreatment {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    HandleResponseAppError: (value: string) => void;
    HandleResponseAppSuccess: (message: string, messageType?: MessageIcon) => void;
}


export const useTerminateTreatment = ({ setLoading, HandleResponseAppError, HandleResponseAppSuccess }: UseTerminateTreatment) => {
    const { state, dispatch: patientHistoryDispatch } = usePatientHistory();
    const { treatment_state, removeTreatment } = UseTreatment();
    const { navigateToTreatmentScreen } = UseTreatmentNavigation();
    const { performEndTreatment } = UseTreatmentService(setLoading);
    const [closeTreatmentVerification, setCloseTreatmentVerification] = useState<Verification | undefined>(undefined);

    const handleCloseTreatmentVerification = (handleAccept: () => void, message?: string, acceptMessage?: string) => {
        const verification: Verification = {
            handleAccept,
            message,
            acceptMessage
        }

        setCloseTreatmentVerification(verification);
    }

    const clearCloseTreatmentVerification = () => {
        setCloseTreatmentVerification(undefined);
    }

    const handleEndTreatment = async (treatmentId: string, type: string) => {
        if(closeTreatmentVerification) clearCloseTreatmentVerification();

        try {
            const response = await performEndTreatment({ treatmentId }, type);
            if (response.success && response.data) {
                console.log(response);
                if(response.data)
                {
                    const treatment = response.data.treatmentToUpdate;
                    //Excluir patientHistory e Treatment
                    if(!treatment.uid) return HandleResponseAppError("Houve um erro ao encerrar tratamento: Uid não especificado");
                    removeTreatment(treatment);
                    patientHistoryDispatch({
                        type: 'DELETE_PATIENT_HISTORY',
                        payload: treatment.uid
                    });
                }

                navigateToTreatmentScreen('main_treatment');
                if (response.message) {
                    HandleResponseAppSuccess(response.message, response.type as MessageIcon);
                }
            } else if (response.error) {
                HandleResponseAppError(response.error);
            }
        }
        catch (err) {
            const error = err as Error;
            console.log(error);
            HandleResponseAppError(error.message);
        }
    }

    return { handleEndTreatment, closeTreatmentVerification, handleCloseTreatmentVerification, clearCloseTreatmentVerification }
}