import { useState } from "react";
import { TreatmentStatusScreenName } from "types/treatment/Status_Types";


const useDoctorStatusRendering = () => {
    const [currentScreen, setCurrentScreen] = useState<TreatmentStatusScreenName>('main');

    const handleDoctorStatusNavigation = (screenName: TreatmentStatusScreenName) => {
        setCurrentScreen(screenName);
    };

    return { handleDoctorStatusNavigation, currentScreen };
}

export default useDoctorStatusRendering;