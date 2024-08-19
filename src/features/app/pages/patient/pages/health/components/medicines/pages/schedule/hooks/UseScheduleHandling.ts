import { MessageIcon } from "@components/modals/message/types/type_message_modal";
import { FormattedMedicationForm, MedicationDurationType, MedicationFormType, MedicationFrequencyType } from "types/app/patient/health/Medicine_Types";
import useFetchMedication from "@hooks/api/axios/UseMedicationService";
import { UseMedicationService } from "@hooks/api/UseMedicationService";
import { UseMedications } from "@features/app/providers/patient/MedicationProvider";
import { convertFrequencyToNumber, FormatExpiresAtParams, formatFrequency } from "@utils/health/HandlingMedication";
import { formatISOToDate } from "@utils/date/DateFormatting";

interface UseScheduleHandlingProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setFetchLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    HandleResponseAppError: (value: string) => void;
    HandleResponseAppSuccess: (message: string, messageType?: MessageIcon) => void;
    setSuggestions?: React.Dispatch<React.SetStateAction<string[] | undefined>>;
    formatExpiresAt: ({ start, frequency, frequencyType, durationType, duration, onError }: FormatExpiresAtParams) => Date | undefined;
    frequencyType: MedicationFrequencyType;
    durationType: MedicationDurationType;
    duration?: string;
}

export const useScheduleHandling = ({
    setLoading,
    setFetchLoading,
    HandleResponseAppError,
    HandleResponseAppSuccess,
    formatExpiresAt,
    setSuggestions,
    frequencyType,
    durationType,
    duration
}: UseScheduleHandlingProps) => {

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

        if (missingKeys.length > 0) {
            console.log("Campos faltando");
            HandleResponseAppError(`Campos obrigatórios faltando: ${missingKeys.join(', ')}`);
            return;
        }

        if (!duration) {
            HandleResponseAppError("O campo Duração não foi especificado");
            return;
        }

        const convertedFrequency = convertFrequencyToNumber(form.frequency);
        if(!convertedFrequency) {
            HandleResponseAppError("Valor de frequência inválido");
            return;
        }

        let formattedForm: FormattedMedicationForm = {
            name: form.name,
            dosage: form.dosage,
            type: form.type,
            schedules: form.schedules,
            alarmDuration: form.alarmDuration,
            reminderTimes: form.reminderTimes,
            start: formatISOToDate(form.start) || undefined,
            frequency: formatFrequency(convertedFrequency, frequencyType)
        };

        console.log("Form formatado");

        const formattedExpiresAt = formatExpiresAt(
            {
                start: form.start,
                frequency: convertedFrequency,
                frequencyType,
                duration,
                durationType,
                onError: HandleResponseAppError
            });
        if (!formattedExpiresAt) {
            return;
        }

        formattedForm = { ...formattedForm, expiresAt: formattedExpiresAt };

        try {
            const response = await performAddMedication(formattedForm);
            if (response.success) {
                if (response.data) {
                    dispatch({ type: 'ADD_MEDICATION', medication: response.data });
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

    const handleUpdateMedication = async (form: MedicationFormType, id: string, onSuccess?: () => void) => {
        const formKeys = Object.keys(form);
        const requiredKeys = ['name', 'type', 'dosage', 'frequency', 'expiresAt', 'start'];
        const missingKeys = requiredKeys.filter(key => !formKeys.includes(key));

        if (missingKeys.length > 0) {
            HandleResponseAppError(`Campos obrigatórios faltando: ${missingKeys.join(', ')}`);
            return;
        }

        if (!duration) {
            HandleResponseAppError("O campo Duração não foi especificado");
            return;
        }

        if (!form.expiresAt) {
            HandleResponseAppError("Encerramento do agendamento não especificado");
            return;
        }

        const convertedFrequency = convertFrequencyToNumber(form.frequency);

        if(!convertedFrequency) {
            HandleResponseAppError("Valor de frequência inválido");
            return;
        }

        let formattedForm: FormattedMedicationForm = {
            name: form.name,
            dosage: form.dosage,
            type: form.type,
            schedules: form.schedules,
            alarmDuration: form.alarmDuration,
            reminderTimes: form.reminderTimes,
            start: formatISOToDate(form.start) || undefined,
            frequency: formatFrequency(convertedFrequency, frequencyType)
        };


        const formattedExpiresAt = formatExpiresAt(
            {
                start: form.start,
                frequency: convertedFrequency,
                frequencyType,
                duration,
                durationType,
                onError: HandleResponseAppError
            });
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