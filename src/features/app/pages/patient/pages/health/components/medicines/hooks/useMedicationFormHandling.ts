import { validateAndFormatISODate } from "@utils/date/DateFormatting";
import { Medication, MedicationFormType } from "types/app/patient/health/Medicine_Types";
import { UseMedicationNavigation } from "./UseMedicationNavigation";

interface UseMedicationFormHandlingParams {
    updateMedication: ((form: MedicationFormType, id: string, onSuccess?: () => void) => void) | undefined;
    addMedication: ((form: MedicationFormType, onSuccess?: () => void) => void) | undefined;
}

const useMedicationFormHandling = ({ updateMedication, addMedication }: UseMedicationFormHandlingParams) => {
    const { navigateToMedicationScreen } = UseMedicationNavigation();

    const backToMedications = () => {
        navigateToMedicationScreen('schedule_medication');
    }

    const formValidation = (form: MedicationFormType, currentMedication?: Medication) => {
        let result: boolean;

        const isFormValid =
            form.name &&
                form.type &&
                form.dosage &&
                form.frequency &&
                form.start &&
                form.alarmDuration &&
                form.reminderTimes &&
                form.schedules.length !== 0 &&
                form.expiresAt
                ? true
                : false;

        if (currentMedication) {
            const formIsDifferentFromCurrentMedication = 
                form.name !== currentMedication.name ||
                form.type !== currentMedication.type ||
                form.dosage !== currentMedication.dosage ||
                form.expiresAt !== validateAndFormatISODate(currentMedication.expiresAt) ||
                form.frequency !== currentMedication.frequency.toString() ||
                JSON.stringify(form.schedules) !== JSON.stringify(currentMedication.schedules) ||
                form.start !== validateAndFormatISODate(currentMedication.start)   ||
                form.alarmDuration !== currentMedication.alarmDuration ||
                form.reminderTimes !== currentMedication.reminderTimes;

            result = formIsDifferentFromCurrentMedication && isFormValid;
        } else {
            result = isFormValid;
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