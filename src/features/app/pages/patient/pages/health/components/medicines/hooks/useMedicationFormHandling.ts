import { validateAndFormatISODate } from "@utils/date/DateFormatting";
import { Medication, MedicationFormType } from "types/app/patient/health/Medicine_Types";
import { UseMedicationNavigation } from "./UseMedicationNavigation";
import { UserPatient } from "types/user/User_Types";

interface UseMedicationFormHandlingParams {
    userPatient: UserPatient,
    updateMedication: ((form: MedicationFormType, id: string, onSuccess?: () => void) => void) | undefined;
    addMedication: ((form: MedicationFormType, onSuccess?: () => void) => void) | undefined;
}

const useMedicationFormHandling = ({ updateMedication, addMedication, userPatient }: UseMedicationFormHandlingParams) => {
    const { navigateToMedicationScreen } = UseMedicationNavigation();

    const backToMedications = () => {
        navigateToMedicationScreen('schedule_medication');
    }

    const formValidation = (form: MedicationFormType, currentMedication?: Medication) => {
        let result: boolean;

        const isBasicFormValid =
            form.name &&
                form.type &&
                form.dosage &&
                form.alarmDuration &&
                form.reminderTimes
                ? true
                : false;

        const isCompleteFormValid =
            isBasicFormValid &&
                form.frequency &&
                form.start &&
                form.schedules.length !== 0 &&
                form.expiresAt
                ? true
                : false;

        if (userPatient.is_treatment_running) {
            result = currentMedication
                ? (
                    (form.name !== currentMedication.name ||
                        form.type !== currentMedication.type ||
                        form.dosage !== currentMedication.dosage ||
                        form.expiresAt !== validateAndFormatISODate(currentMedication.expiresAt) ||
                        form.frequency !== currentMedication.frequency?.toString() ||
                        JSON.stringify(form.schedules) !== JSON.stringify(currentMedication.schedules) ||
                        form.start !== validateAndFormatISODate(currentMedication.start) ||
                        form.alarmDuration !== currentMedication.alarmDuration ||
                        form.reminderTimes !== currentMedication.reminderTimes)
                    && isCompleteFormValid
                )
                : isCompleteFormValid;
        } else {
            result = currentMedication ? (
                (
                    form.name !== currentMedication.name ||
                    form.type !== currentMedication.type ||
                    form.dosage !== currentMedication.dosage ||
                    form.alarmDuration !== currentMedication.alarmDuration ||
                    form.reminderTimes !== currentMedication.reminderTimes
                )
            ) : isBasicFormValid;
        }

        return result;
    }

    const onSubmit = (form: MedicationFormType, currentMedication?: Medication) => {
        console.log("SUBMIT: ", form);
        currentMedication ?
            updateMedication ?
                updateMedication(form, currentMedication._id, backToMedications)
                : console.log("Houve algum erro ")
            : addMedication && addMedication(form, backToMedications)
    }

    return { formValidation, onSubmit }
}

export default useMedicationFormHandling;