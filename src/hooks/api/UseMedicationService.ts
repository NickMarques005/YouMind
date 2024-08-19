import { MedicationService } from "@api/services/health/medication/MedicationService";
import { FormattedMedicationForm } from "types/app/patient/health/Medicine_Types";
import { UseRequest } from "./UseRequest";
import { SetLoading } from "types/loading/Loading_Types";

export const UseMedicationService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const performGetMedications = async (stopLoading?: boolean) => {
        return HandleRequest({
            serviceFunction: MedicationService.getMedications,
            setLoading,
            params: [],
            stopLoading
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

    const performGetMedicationPending = async (stopLoading?: boolean) => {
        return HandleRequest({
            serviceFunction: MedicationService.getMedicationPending,
            setLoading,
            params: [],
            stopLoading
        });
    };

    const performConfirmMedicationAlert = async (medicationHistoryId: string) => {
        return HandleRequest({
            serviceFunction: MedicationService.confirmMedicationAlert,
            setLoading,
            params: [medicationHistoryId]
        });
    };

    const performGetMedicationsToConsumeOnDate = async (selectedDate: string) => {
        return HandleRequest({
            serviceFunction: MedicationService.getMedicationsToConsumeOnDate,
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
        performGetMedicationsToConsumeOnDate
    };
};