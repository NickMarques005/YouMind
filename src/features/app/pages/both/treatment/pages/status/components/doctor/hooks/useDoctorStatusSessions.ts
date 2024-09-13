import { useState } from "react";
import { TreatmentInfoTemplate } from "types/treatment/Treatment_Types";


const useDoctorStatusSessions = () => {
    const [currentTreatment, setCurrentTreatment] = useState<TreatmentInfoTemplate | undefined>(undefined);
    const [isModalVisible, setModalVisible] = useState(false);

    const handleOpenSessions = (treatment?: TreatmentInfoTemplate) => {
        if(!treatment)
        {
            setCurrentTreatment(undefined);
        }
        else {
            setCurrentTreatment(treatment);
        }
        
        setModalVisible(true);
    };

    const clearTreatmentSessions = () => {
        setCurrentTreatment(undefined);
        setModalVisible(false);
    }

    return { currentTreatment, isModalVisible, handleOpenSessions, clearTreatmentSessions }
}

export default useDoctorStatusSessions;