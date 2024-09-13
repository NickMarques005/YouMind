import { TreatmentInfoTemplate } from "types/treatment/Treatment_Types";

interface UseCurrentTreatmentProps{
    params: {
        currentTreatment: TreatmentInfoTemplate | undefined,
    }
}

export const UseCurrentTreatment = ({ params }: UseCurrentTreatmentProps) => {
    
    const currentTreatment: TreatmentInfoTemplate | undefined = params.currentTreatment;

    return { currentTreatment }
}