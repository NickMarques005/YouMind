import { MakeRequest } from "@api/services/Request";
import { GetAccessToken } from "@utils/token/GetAccessToken";
import { DeleteMedicationResponse, FormattedMedicationForm, MedicationPending } from "types/app/patient/health/Medicine_Types";
import { Medication, TakenMedication } from "types/app/patient/health/Medicine_Types";

export const MedicationService = {
    getMedications: async () => {
        const token = await GetAccessToken();
        return MakeRequest<Medication[]>(
            'health/medication/',
            'GET',
            undefined,
            token
        );
    },
    addMedication: async (medicationData: FormattedMedicationForm) => {
        const token = await GetAccessToken();
        return MakeRequest<Medication>(
            'health/medication/create',
            'POST',
            {...medicationData},
            token
        );
    },
    updateMedication: async (medicationData: FormattedMedicationForm, id: string) => {
        const token = await GetAccessToken();
        return MakeRequest<Medication>(
            'health/medication/update',
            'PUT',
            {...medicationData, id},
            token
        );
    },
    deleteMedication: async (id: string) => {
        const token = await GetAccessToken();
        return MakeRequest<DeleteMedicationResponse>(
            'health/medication/delete',
            'DELETE',
            { id },
            token
        );
    },
    deleteManyMedications: async (medicationIds: string[]) => {
        const token = await GetAccessToken();
        return MakeRequest<void>(
            'health/medication/delete/many',
            'DELETE',
            { ids: medicationIds },
            token
        );
    },
    getMedicationPending: async () => {
        const token = await GetAccessToken();
        return MakeRequest<MedicationPending>(
            'health/medication/pending',
            'GET',
            undefined,
            token
        );
    },
    confirmMedicationAlert: async (medicationHistoryId: string) => {
        const token = await GetAccessToken();
        return MakeRequest<void>(
            'health/medication/pending/confirm',
            'POST',
            { medicationHistoryId },
            token
        );
    },
    getMedicationsTakenOnDate: async (selectedDate: string) => {
        const token = await GetAccessToken();
        return MakeRequest<TakenMedication[]>(
            'health/medication/taken',
            'GET',
            undefined,
            token,
            { selectedDate }
        );
    }
};