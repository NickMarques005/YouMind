import { MedicationScreenName, MedicationStackTypes } from "types/navigation/Navigation_Types";
import { useNavigation } from '@react-navigation/native';

export const UseMedicationNavigation = () => {
    const navigation = useNavigation<MedicationStackTypes>();

    const navigateToMedicationScreen = (screenName: MedicationScreenName) => {
        navigation.navigate(screenName);
    }

    return { navigateToMedicationScreen };
}
