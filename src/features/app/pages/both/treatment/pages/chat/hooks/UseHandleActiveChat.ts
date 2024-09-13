import { useNavigation } from "@react-navigation/native";
import { UseChat } from "../../../../../../providers/bridge/ChatProvider";
import { TreatmentStackTypes } from "types/navigation/Navigation_Types";
import { TreatmentInfoTemplate } from "types/treatment/Treatment_Types";
import { UseTreatmentNavigation } from "../../../hooks/UseTreatmentNavigation";

export const UseHandleActiveChat = () => {
    const { setCurrentChat } = UseChat();
    const { navigateToTreatmentScreen } = UseTreatmentNavigation();

    const HandleActiveChat = (treatmentChat: TreatmentInfoTemplate) => {
        console.log("TREATMENT CHAT: ", treatmentChat);

        setCurrentChat(treatmentChat);
        navigateToTreatmentScreen('chat_treatment');
        console.log("NAVIGATE TO CHAT!!");
    }

    return { HandleActiveChat };
}

export const UseHandleNavigateChat = () => {
    const navigation = useNavigation<TreatmentStackTypes>();

    const HandleNavigateToTreatment = () => {
        navigation.navigate('main_treatment');
    }

    return { HandleNavigateToTreatment };
}
