import { TreatmentScreenName, TreatmentStackTypes } from "types/navigation/Navigation_Types";
import { useNavigation } from '@react-navigation/native';

export const UseTreatmentNavigation = () => {
    const navigation = useNavigation<TreatmentStackTypes>();

    const navigateToTreatmentScreen = (screenName: TreatmentScreenName) => {
        navigation.navigate(screenName);
    }

    return { navigateToTreatmentScreen };
}