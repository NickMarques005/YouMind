import { AnalysisScreenName, AnalysisStackTypes } from "types/navigation/Navigation_Types";
import { useNavigation } from '@react-navigation/native';

export const UseAnalysisNavigation = () => {
    const navigation = useNavigation<AnalysisStackTypes>();

    const navigateToAnalysisScreen = (screenName: AnalysisScreenName) => {
        navigation.navigate(screenName);
    }

    return { navigateToAnalysisScreen };
}
