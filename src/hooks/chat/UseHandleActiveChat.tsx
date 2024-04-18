import { useNavigation, StackActions } from "@react-navigation/native";
import { UseChat } from "../../providers/ChatProvider";
import { Treatment } from "../../providers/TreatmentProvider";
import { TreatmentStackTypes } from "../../navigation/stacks/MainStack";

export const UseHandleActiveChat = () => {
    const navigation = useNavigation<TreatmentStackTypes>();
    const { setCurrentChat } = UseChat();

    const HandleActiveChat = (other_members: Treatment) => {
        console.log("MEMBRO: ", other_members);
        const members = {
            members: [other_members]
        };

        setCurrentChat(members);
        navigation.navigate('treatmentChat');
        console.log("NAVIGATE TO CHAT!!");
    }

    return HandleActiveChat;
}

export const UseHandleNavigateChat = () => {
    const navigation = useNavigation<TreatmentStackTypes>();

    const HandleNavigateChat = () => {
        navigation.navigate('mainTreatment');
    }

    return HandleNavigateChat;
}
