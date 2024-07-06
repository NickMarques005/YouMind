import { UseProfileNavigation } from "./UseProfileNavigation";
import { useNavigation } from '@react-navigation/native';

export const UseProfile = () => {
    const { navigateToProfileScreen} = UseProfileNavigation();
    const navigation = useNavigation();

    const GoToProfileData = () => {
        navigateToProfileScreen("profile_data");
    };

    const GoBackProfile = () => {
        navigation.goBack();
    };

    return { GoToProfileData, GoBackProfile };
};