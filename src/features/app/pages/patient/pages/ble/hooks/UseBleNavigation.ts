import { BleScreenName, BleStackNavigation, BleStackTypes,  } from "types/navigation/Navigation_Types";
import { useNavigation } from '@react-navigation/native';

export const useBleNavigation = () => {
    const navigation = useNavigation<BleStackTypes>();

    const navigateToBleScreen = (screenName: BleScreenName) => {
        navigation.navigate(screenName);
    }

    return { navigateToBleScreen };
}