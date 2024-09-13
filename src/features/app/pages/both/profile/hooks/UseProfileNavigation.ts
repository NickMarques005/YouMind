import { ProfileScreenName, ProfileStackTypes } from "types/navigation/Navigation_Types";
import { useNavigation } from '@react-navigation/native';

export const UseProfileNavigation = () => {
    const navigation = useNavigation<ProfileStackTypes>();

    const navigateToProfileScreen = (screenName: ProfileScreenName, params?: any) => {
        navigation.navigate(screenName, params);
    }

    const navigateBack = () => {
        navigation.canGoBack() ?
        navigation.goBack() : navigation.navigate('main_profile');
    }

    return { navigateToProfileScreen, navigateBack };
}