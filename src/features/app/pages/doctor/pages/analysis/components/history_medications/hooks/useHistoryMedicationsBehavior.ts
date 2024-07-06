import { UseNavigateOnSuccess } from "@hooks/navigation/UseNavigateSuccess";
import { FormatISOToStringDate } from "@utils/date/DateFormatting";
import { HistoryMedication, PatientHistory } from "types/history/PatientHistory_Types";


interface UseHistoryMedicationBehaviorProps {
    HandleResponseAppError: (value: string) => void;
}

export const useHistoryMedicationBehavior = ({ HandleResponseAppError }: UseHistoryMedicationBehaviorProps) => {
    const { analysisNavigateOnSuccess } = UseNavigateOnSuccess();

    const selectMedication = (medication: HistoryMedication, patientHistory: PatientHistory) => {
        if (medication.pending) {
            HandleResponseAppError(`Medicamento pendente para ser tomado ${medication.consumeDate === new Date().toISOString() ? 'Hoje' : `no dia ${FormatISOToStringDate(medication.consumeDate)}` } às ${medication.currentSchedule}`)
        }
        else if (!medication.taken) {
            HandleResponseAppError(`O paciente ${patientHistory.patientName} não tomou o medicamento às ${medication.currentSchedule} no dia ${FormatISOToStringDate(medication.consumeDate || medication.updatedAt)}`)
        }
        else{
            analysisNavigateOnSuccess('current_medication', {medication, patientHistory});
        }
        
    }

    return { selectMedication };
}