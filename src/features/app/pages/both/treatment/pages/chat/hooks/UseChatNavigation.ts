import { ChatScreenName, ChatStackTypes } from "types/navigation/Navigation_Types";
import { useNavigation } from '@react-navigation/native';

export const UseChatNavigation = () => {
    const navigation = useNavigation<ChatStackTypes>();

    const navigateToChatScreen = (screenName: ChatScreenName) => {
        navigation.navigate(screenName);
    }

    return { navigateToChatScreen };
}