import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { AppStackNavigation, AuthStackNavigation, InitStackNavigation, InitStackTypes, ProfileStackNavigation, TreatmentStackNavigation } from 'types/navigation/Navigation_Types';

export type GlobalStackParamList = InitStackNavigation & AuthStackNavigation & AppStackNavigation & TreatmentStackNavigation & ProfileStackNavigation;

export function useStackNavigation<ParamList extends ParamListBase>() {
    const navigation = useNavigation<NavigationProp<ParamList>>();

    function navigateToScreen<RouteName extends keyof ParamList>(screen: RouteName) {
        navigation.navigate(screen as any);
    }

    return { navigateToScreen };
}