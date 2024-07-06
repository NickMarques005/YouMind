import { NotepadScreenName, NotepadStackTypes } from "types/navigation/Navigation_Types";
import { useNavigation } from '@react-navigation/native';

export const UseNotepadNavigation = () => {
    const navigation = useNavigation<NotepadStackTypes>();

    const navigateToNotepadScreen = (screenName: NotepadScreenName) => {
        navigation.navigate(screenName);
    }

    return { navigateToNotepadScreen };
}