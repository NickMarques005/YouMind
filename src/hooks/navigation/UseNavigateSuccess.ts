import { useNavigation } from '@react-navigation/native';
import { AnalysisScreenName, AnalysisStackTypes, AppScreenName, AuthScreenName, MedicationScreenName, MedicationStackTypes, NotepadScreenName, NotepadStackTypes, ProfileScreenName, QuestionScreenName, QuestionStackTypes, TreatmentScreenName } from 'types/navigation/Navigation_Types';
import { AppStackTypes, AuthStackNavigation, AuthStackTypes, ProfileStackTypes, TreatmentStackTypes } from 'types/navigation/Navigation_Types';

interface ResponseParams {
    message?: string;
    type?: string;
    error?: string;
    data?: any;
}

export const UseNavigateOnSuccess = () => {
    const authNavigation = useNavigation<AuthStackTypes>();
    const treatmentNavigation = useNavigation<TreatmentStackTypes>();
    const profileNavigation = useNavigation<ProfileStackTypes>();
    const appNavigation = useNavigation<AppStackTypes>();
    const notepadNavigation = useNavigation<NotepadStackTypes>();
    const medicationNavigation = useNavigation<MedicationStackTypes>();
    const questionNavigation = useNavigation<QuestionStackTypes>();
    const analysisNavigation = useNavigation<AnalysisStackTypes>();

    const authNavigateOnSuccess = (screenName: AuthScreenName, params: ResponseParams) => {

        authNavigation.navigate(screenName, { params });
    };

    const profileNavigateOnSuccess = (screenName: ProfileScreenName, params: any) => {
        profileNavigation.navigate(screenName, { params });
    };

    const treatmentNavigateOnSuccess = (screenName: TreatmentScreenName, params: any) => {
        treatmentNavigation.navigate(screenName, { params });
    };

    const notepadNavigateOnSuccess = (screenName: NotepadScreenName, params: any) => {
        notepadNavigation.navigate(screenName, { params });
    }

    const medicationNavigateOnSuccess = (screenName: MedicationScreenName, params: any) => {
        medicationNavigation.navigate(screenName, { params });
    }

    const questionNavigateOnSuccess = (screenName: QuestionScreenName, params: any) => {
        questionNavigation.navigate(screenName, { params });
    }

    const analysisNavigateOnSuccess = (screenName: AnalysisScreenName, params: any) => {
        analysisNavigation.navigate(screenName, { params });
    }

    const appNavigateOnSuccess = (screenName: AppScreenName, params: any) => {
        appNavigation.navigate(screenName, { params });
    }

    return { 
        authNavigateOnSuccess, 
        appNavigateOnSuccess, 
        profileNavigateOnSuccess,
        treatmentNavigateOnSuccess,
        notepadNavigateOnSuccess,
        medicationNavigateOnSuccess,
        questionNavigateOnSuccess,
        analysisNavigateOnSuccess
    };
};