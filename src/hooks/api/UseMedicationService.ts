import { MedicationService } from "@api/services/health/medication/MedicationService";
import { FormattedMedicationForm } from "types/app/patient/health/Medicine_Types";
import { UseRequest } from "./UseRequest";
import { SetLoading } from "types/loading/Loading_Types";

export const UseMedicationService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const performGetMedications = async () => {
        return HandleRequest({
            serviceFunction: MedicationService.getMedications,
            setLoading,
            params: []
        });
    };

    const performAddMedication = async (medicationData: FormattedMedicationForm) => {
        return HandleRequest({
            serviceFunction: MedicationService.addMedication,
            setLoading,
            params: [medicationData]
        });
    };

    const performUpdateMedication = async (medicationData: FormattedMedicationForm, id: string) => {
        return HandleRequest({
            serviceFunction: MedicationService.updateMedication,
            setLoading,
            params: [medicationData, id]
        });
    };

    const performDeleteMedication = async (medicationId: string) => {
        return HandleRequest({
            serviceFunction: MedicationService.deleteMedication,
            setLoading,
            params: [medicationId]
        });
    };

    const performDeleteManyMedications = async (medicationIds: string[]) => {
        return HandleRequest({
            serviceFunction: MedicationService.deleteManyMedications,
            setLoading,
            params: [medicationIds]
        });
    };

    const performGetMedicationPending = async () => {
        return HandleRequest({
            serviceFunction: MedicationService.getMedicationPending,
            setLoading,
            params: []
        });
    };

    const performConfirmMedicationAlert = async (medicationHistoryId: string) => {
        return HandleRequest({
            serviceFunction: MedicationService.confirmMedicationAlert,
            setLoading,
            params: [medicationHistoryId]
        });
    };

    const performGetMedicationsTakenOnDate = async (selectedDate: string) => {
        return HandleRequest({
            serviceFunction: MedicationService.getMedicationsTakenOnDate,
            setLoading,
            params: [selectedDate]
        });
    };

    return {
        performGetMedications,
        performAddMedication,
        performUpdateMedication,
        performDeleteMedication,
        performDeleteManyMedications,
        performGetMedicationPending,
        performConfirmMedicationAlert,
        performGetMedicationsTakenOnDate
    };
};