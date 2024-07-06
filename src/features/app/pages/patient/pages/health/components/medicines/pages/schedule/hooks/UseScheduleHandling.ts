import { MessageIcon } from "@components/modals/message/types/type_message_modal";
import { FormattedMedicationForm, MedicationDuration, MedicationFormType } from "types/app/patient/health/Medicine_Types";
import useFetchMedication from "@hooks/api/axios/UseMedicationService";
import { UseMedicationService } from "@hooks/api/UseMedicationService";
import { UseMedications } from "@features/app/providers/patient/MedicationProvider";
import { calculateDurationInDays, formatStringToDate } from "@utils/date/DateFormatting";
import { convertDurationToDays } from "@utils/date/DateConversions";

interface UseScheduleHandlingProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setFetchLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    HandleResponseAppError: (value: string) => void;
    HandleResponseAppSuccess: (message: string, messageType?: MessageIcon) => void;
    formatFrequency?: (frequency: number, frequencyType: string) => number;
    setSuggestions?: React.Dispatch<React.SetStateAction<string[] | undefined>>;
    formatExpiresAt?: (start: Date, duration: string, durationType: MedicationDuration, frequency: number) => Date;
    frequencyType?: string;
    durationType?: MedicationDuration;
}

export const useScheduleHandling = ({ setLoading, setFetchLoading, HandleResponseAppError, HandleResponseAppSuccess, formatFrequency, formatExpiresAt, setSuggestions, frequencyType, durationType }: UseScheduleHandlingProps) => {

    const fetchMedicationData = setFetchLoading ? useFetchMedication(setFetchLoading).fetchMedicationData : async () => { return { success: false, data: [], error: 'Carregamento não definido' }; };
    const { performAddMedication,
        performDeleteMedication,
        performUpdateMedication,
        performDeleteManyMedications
    } = UseMedicationService(setLoading);
    const { dispatch } = UseMedications();

    const fetchMedications = async (query: string) => {
        if (query.length === 0) {
            return [];
        }
        try {
            const response = await fetchMedicationData(query);
            console.log(response);
            if (setSuggestions) {
                if (response.success && response.data) {

                    setSuggestions(response.data as string[]);
                    return;
                }
                setSuggestions(undefined);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleAddMedication = async (form: MedicationFormType, onSuccess?: () => void) => {
        console.log("ADD MEDICATION");

        const formKeys = Object.keys(form);
        const requiredKeys = ['name', 'type', 'dosage', 'frequency', 'expiresAt', 'start'];
        const missingKeys = requiredKeys.filter(key => !formKeys.includes(key));
        console.log("ADD MEDICATION");

        if (missingKeys.length > 0) {
            console.log("Campos faltando");
            HandleResponseAppError(`Campos obrigatórios faltando: ${missingKeys.join(', ')}`);
            return;
        }

        if (!formatExpiresAt || !formatFrequency || !frequencyType) {
            console.log("Funções de formatação ou frequencia não especificadas");
            HandleResponseAppError("Funções de formatação ou frequência não fornecidas");
            return;
        }

        let formattedForm: FormattedMedicationForm = {
            name: form.name,
            dosage: form.dosage,
            type: form.type,
            schedules: form.schedules,
            alarmDuration: form.alarmDuration,
            reminderTimes: form.reminderTimes,
        };
        console.log("Form formatado");

        const formattedFrequency = formatFrequency(form.frequency, frequencyType);
        const formattedStart = formatStringToDate(form.start);

        if (!formattedStart) {
            return HandleResponseAppError("Data de início inválida");
        }
        formattedForm = {
            ...formattedForm,
            frequency: formattedFrequency,
            start: formattedStart
        };

        if (!durationType) {
            return HandleResponseAppError("Houve um erro incomum: Tipo de duração do medicamento não especificado");
        }

        const durationInDays = convertDurationToDays(form.expiresAt, durationType);
        if (durationInDays < formattedFrequency) {
            return HandleResponseAppError("A duração do uso do medicamento deve ser maior ou igual à frequência de administração");
        }

        const formattedExpiresAt = formatExpiresAt(formattedStart, form.expiresAt, durationType, formattedFrequency);
        if (!formattedExpiresAt) {
            HandleResponseAppError("Data de expiração inválida");
            return;
        }

        formattedForm = { ...formattedForm, expiresAt: formattedExpiresAt };

        console.log(formattedForm);
        try {
            const response = await performAddMedication(formattedForm);
            if (response.success) {
                if (response.data) {
                    dispatch({ type: 'ADD_MEDICATION', medication: response.data });
                }

                if (response.message) {
                    HandleResponseAppSuccess(response.message, response.type as MessageIcon)
                }
                if(onSuccess) onSuccess();
                return;
            }
            if (response.error) {
                HandleResponseAppError(response.error);
            }

        } catch (err) {
            const error = err as Error;
            HandleResponseAppError(error.message);
        }
    }

    const handleUpdateMedication = async (form: MedicationFormType, id: string, onSuccess?: () => void) => {
        const formKeys = Object.keys(form);
        const requiredKeys = ['name', 'type', 'dosage', 'frequency', 'expiresAt', 'start'];
        const missingKeys = requiredKeys.filter(key => !formKeys.includes(key));

        if (missingKeys.length > 0) {
            HandleResponseAppError(`Campos obrigatórios faltando: ${missingKeys.join(', ')}`);
            return;
        }

        if (!formatExpiresAt || !formatFrequency || !frequencyType) {
            HandleResponseAppError("Funções de formatação ou frequência não fornecidas");
            return;
        }

        let formattedForm: FormattedMedicationForm = {
            name: form.name,
            dosage: form.dosage,
            type: form.type,
            schedules: form.schedules,
            alarmDuration: form.alarmDuration,
            reminderTimes: form.reminderTimes,
        };

        const formattedFrequency = formatFrequency(form.frequency, frequencyType);
        const formattedStart = formatStringToDate(form.start);

        if (!formattedStart) {
            return HandleResponseAppError("Data de início inválida");
        }

        formattedForm = {
            ...formattedForm,
            frequency: formattedFrequency,
            start: formattedStart
        };

        if (!durationType) {
            return HandleResponseAppError("Houve um erro incomum: Tipo de duração do medicamento não especificado");
        }

        const formattedExpiresAt = formatExpiresAt(formattedStart, form.expiresAt, durationType, formattedFrequency);
        if (!formattedExpiresAt) {
            HandleResponseAppError("Data de expiração inválida");
            return;
        }

        formattedForm = { ...formattedForm, expiresAt: formattedExpiresAt };

        console.log("Update: ", formattedForm);
        try {
            const response = await performUpdateMedication(formattedForm, id);
            if (response.success) {
                if (response.data) {
                    dispatch({ type: 'UPDATE_MEDICATION', medication: response.data, id: id });
                }

                if (response.message) {
                    HandleResponseAppSuccess(response.message, response.type as MessageIcon)
                }
                if(onSuccess) onSuccess();
                return;
            }
            if (response.error) {
                HandleResponseAppError(response.error);
            }

        } catch (err) {
            const error = err as Error;
            HandleResponseAppError(error.message);
        }
    }

    const handleDeleteMedication = async (id: string, onSuccess?: () => void) => {

        try {
            const response = await performDeleteMedication(id);
            if (response.success) {
                if (response.data) {
                    dispatch({ type: 'REMOVE_MEDICATION', id: response.data.id });
                }

                if (response.message) {
                    HandleResponseAppSuccess(response.message, response.type as MessageIcon)
                }
                if (onSuccess) onSuccess();
                return;
            }
            if (response.error) {
                HandleResponseAppError(response.error);
            }

        } catch (err) {
            const error = err as Error;
            HandleResponseAppError(error.message);
        }
    }

    return {
        handleAddMedication,
        handleUpdateMedication,
        handleDeleteMedication,
        fetchMedications
    }
}