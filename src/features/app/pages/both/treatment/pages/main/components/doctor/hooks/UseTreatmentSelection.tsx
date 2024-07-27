import { UseNavigateOnSuccess } from "@hooks/navigation/UseNavigateSuccess";
import { useState } from "react";
import { TreatmentInfoTemplate } from "types/treatment/Treatment_Types";


export const UseTreatmentSelection = () => {
    const { treatmentNavigateOnSuccess } = UseNavigateOnSuccess();
    const [selectedTreatment, setSelectedTreatment] = useState<TreatmentInfoTemplate | null>(null);
    
    const handleSelectTreatment = (treatment: TreatmentInfoTemplate) => {
        console.log("TREATMENT SELECTED: ", treatment);
        treatmentNavigateOnSuccess('selected_treatment', { currentTreatment: treatment });
    };

    const handleCloseCurrentTreatment = () => {
        console.log("CLOSE CURRENT TREATMENT");
    }
    
    return { selectedTreatment, handleSelectTreatment, handleCloseCurrentTreatment }
}