import { useEffect, useState } from "react"
import { TreatmentScreenName } from "types/navigation/Navigation_Types";
import { UseTreatmentNavigation } from "./UseTreatmentNavigation";
import { UseChat } from "@features/app/providers/bridge/ChatProvider";

export const UseRedirectTreatmentRoute = () => {
    const { currentChat } = UseChat();
    const { navigateToTreatmentScreen } = UseTreatmentNavigation();
    const [initialRoute, setInitialRoute] = useState<TreatmentScreenName>('main_treatment');

    const handleRedirectTreatment = () => {
        console.log("HAS REDIRECT CHAT: ", currentChat);
        if (currentChat) {
            navigateToTreatmentScreen('chat_treatment');
        } else {
            navigateToTreatmentScreen('main_treatment');
        }
    }

    useEffect(() => {
        handleRedirectTreatment();
    }, [currentChat]);

    return { initialRoute, handleRedirectTreatment }
}