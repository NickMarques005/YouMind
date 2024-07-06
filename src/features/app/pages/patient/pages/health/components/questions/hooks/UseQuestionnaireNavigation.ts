import { QuestionScreenName, QuestionStackTypes } from "types/navigation/Navigation_Types";
import { useNavigation } from '@react-navigation/native';

export const UseQuestionnaireNavigation = () => {
    const navigation = useNavigation<QuestionStackTypes>();

    const navigateToQuestionScreen = (screenName: QuestionScreenName) => {
        navigation.navigate(screenName);
    }

    return { navigateToQuestionScreen };
}
