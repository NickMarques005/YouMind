import { useNavigation } from "@react-navigation/native";
import { UseChat } from "../../contexts/ChatContext";
import { Treatment } from "../../contexts/TreatmentContext";
import { TreatmentStackTypes } from "../../routes/MainRouter";

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

export const UseHandleBackChat = () => {
    const navigation = useNavigation<TreatmentStackTypes>();
    
    const HandleBackChat = () => {
        navigation.goBack();
    }

    return HandleBackChat;
}
