import { useNavigation } from '@react-navigation/native';
import { PriorityStackNavigation, PriorityStackTypes } from 'types/navigation/Navigation_Types'; // Ajuste o caminho conforme necessário

export const UsePriorityNavigation = () => {
    const navigation = useNavigation<PriorityStackTypes>();

    const navigateToPriorityScreen = (screenName: keyof PriorityStackNavigation, params?: any) => {
        navigation.navigate(screenName, { params });
    };

    return { navigateToPriorityScreen };
};