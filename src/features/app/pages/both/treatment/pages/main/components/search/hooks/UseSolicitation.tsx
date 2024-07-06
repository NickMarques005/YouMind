import { UseNotificationConfig } from "@features/app/pages/both/notifications/hooks/UseNotificationConfig";
import { UseGlobalResponse } from "@features/app/providers/sub/ResponseProvider";
import { UseNotificationService } from "@hooks/api/UseNotificationService";
import { useState } from "react";
import { SearchUserData } from "types/treatment/Search_Types";

interface UseSolicitationProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UseSolicitation = ({ setLoading }: UseSolicitationProps) => {
    const { HandleResponseAppError, HandleResponseAppSuccess} = UseGlobalResponse();
    const { handleTreatmentSolicitation } = UseNotificationConfig({setLoading, HandleResponseAppError, HandleResponseAppSuccess})
    const [modalSolicitation, setModalSolicitation] = useState(false);
    

    const handleModalSolicitation = (value: boolean) => {
        setModalSolicitation(value);
    }

    return { modalSolicitation,  handleModalSolicitation, handleTreatmentSolicitation }
}


