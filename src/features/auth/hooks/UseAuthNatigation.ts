import { AuthScreenName, AuthStackTypes } from "types/navigation/Navigation_Types";
import { useNavigation } from '@react-navigation/native';

export const UseAuthNavigation = () => {
    const navigation = useNavigation<AuthStackTypes>();

    const navigateToAuthScreen = (screenName: AuthScreenName) => {
        navigation.navigate(screenName);
    }

    return { navigateToAuthScreen };
}

