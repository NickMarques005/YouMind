import { TreatmentInfoTemplate } from "types/treatment/Treatment_Types";
import { TreatmentSelectedParams } from "../SelectedTreatment";
import { PatientHistory } from "types/history/PatientHistory_Types";

interface UseCurrentTreatmentProps{
    params: {
        currentTreatment: TreatmentInfoTemplate | undefined,
    }
}

export const UseCurrentTreatment = ({ params }: UseCurrentTreatmentProps) => {
    
    const currentTreatment: TreatmentInfoTemplate | undefined = params.currentTreatment;

    return { currentTreatment }
}