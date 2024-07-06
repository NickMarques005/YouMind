import { ProfileScreenName, ProfileStackTypes } from "types/navigation/Navigation_Types";
import { useNavigation } from '@react-navigation/native';

export const UseProfileNavigation = () => {
    const navigation = useNavigation<ProfileStackTypes>();

    const navigateToProfileScreen = (screenName: ProfileScreenName) => {
        navigation.navigate(screenName);
    }

    return { navigateToProfileScreen };
}