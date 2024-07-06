import { UseChat } from "@providers/ChatProvider";
import { useEffect, useState } from "react"
import { TreatmentScreenName } from "types/navigation/Navigation_Types";
import { UseTreatmentNavigation } from "./UseTreatmentNavigation";


export const UseRedirectRoute = () => {
    const { redirectChat } = UseChat();
    const { navigateToTreatmentScreen } = UseTreatmentNavigation();
    const [initialRoute, setInitialRoute] = useState<TreatmentScreenName>('main_treatment');
    console.log("\nInitial Route: ", initialRoute);

    const handleRedirectTreatment = () => {
        console.log("HAS REDIRECT CHAT: ", redirectChat);
        if (redirectChat) {
            navigateToTreatmentScreen('chat_treatment');
        } else {
            navigateToTreatmentScreen('main_treatment');
        }
    }

    useEffect(() => {
        handleRedirectTreatment();
    }, [redirectChat]);

    return { initialRoute, handleRedirectTreatment }
}