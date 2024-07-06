import { useNavigation, StackActions } from "@react-navigation/native";
import { UseChat } from "../../../../../../../../providers/ChatProvider";
import { TreatmentStackTypes } from "types/navigation/Navigation_Types";
import { TreatmentInfoTemplate } from "types/treatment/Treatment_Types";
import { UseTreatmentNavigation } from "../../../hooks/UseTreatmentNavigation";

export const UseHandleActiveChat = () => {
    const { setCurrentChat } = UseChat();
    const { navigateToTreatmentScreen } = UseTreatmentNavigation();

    const HandleActiveChat = (member: TreatmentInfoTemplate) => {
        console.log("MEMBRO: ", member);
        const members = {
            members: [member]
        };

        setCurrentChat(members);
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
