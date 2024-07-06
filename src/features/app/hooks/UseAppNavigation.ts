import { AppScreenName, AppStackTypes } from "types/navigation/Navigation_Types";
import { useNavigation } from '@react-navigation/native';

export const UseAppNavigation = () => {
    const navigation = useNavigation<AppStackTypes>();

    const navigateToAppScreen = (screenName: AppScreenName) => {
        navigation.navigate(screenName);
    }

    return { navigateToAppScreen };
}