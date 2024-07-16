import { useState } from "react";


export const useSearchUserBehavior = () => {
    const [showDoctorTreatments, setShowDoctorTreatments] = useState(false);

    const handleShowDoctorTreatments = () => {
        setShowDoctorTreatments(value => !value);
    }

    return { showDoctorTreatments, handleShowDoctorTreatments}
}