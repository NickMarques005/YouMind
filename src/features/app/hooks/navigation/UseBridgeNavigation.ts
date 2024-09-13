import { useNavigation } from '@react-navigation/native';
import { AppScreenName, AppStackNavigation, BridgeStackTypes, PriorityScreenName, PriorityStackNavigation } from 'types/navigation/Navigation_Types'; // Ajuste o caminho conforme necessário

export const UseBridgeNavigation = () => {
    const navigation = useNavigation<BridgeStackTypes>();

    const navigateToAppStackScreen = (screenName: AppScreenName, params?: any) => {
        navigation.navigate('app', { screen: screenName, params });
    };

    const replaceNavigationToAppStackScreen = (screenName: AppScreenName, params?: any) => {
        navigation.replace('app', { screen: screenName, params });
    }

    const navigateToPriorityStackScreen = (screenName: PriorityScreenName, params?: any) => {
        navigation.navigate('priority', { screen: screenName, params });
    };

    const replaceNavigationToPriorityStackScreen = (screenName: PriorityScreenName, params?: any) => {
        navigation.replace('priority', { screen: screenName, params });
    };

    return { 
        navigateToAppStackScreen, 
        navigateToPriorityStackScreen,
        replaceNavigationToAppStackScreen,
        replaceNavigationToPriorityStackScreen
    };
};