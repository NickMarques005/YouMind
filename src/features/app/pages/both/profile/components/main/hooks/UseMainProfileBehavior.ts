import { useNavigation } from '@react-navigation/native';
import { UseProfileNavigation } from '../../../hooks/UseProfileNavigation';

export const UseMainProfileBehavior = () => {
    const { navigateToProfileScreen} = UseProfileNavigation();
    const navigation = useNavigation();

    const goToProfileData = () => {
        navigateToProfileScreen("profile_data");
    };

    const goBackProfile = () => {
        navigation.goBack();
    };

    return { goToProfileData, goBackProfile };
};