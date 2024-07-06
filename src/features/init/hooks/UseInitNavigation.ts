import { InitStackNavigation, InitStackTypes } from "types/navigation/Navigation_Types";
import { useNavigation } from '@react-navigation/native';

type InitScreenName = keyof InitStackNavigation;

export const UseInitNavigation = () => {
    const navigation = useNavigation<InitStackTypes>();

    const navigateToInitScreen = (screenName: InitScreenName) => {
        navigation.navigate(screenName);
    }

    return { navigateToInitScreen };
}
