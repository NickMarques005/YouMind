import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type NavigationWithParams = undefined | { params?: any };

export type NavigationWithSpecificScreenConfig<StackScreenType> = {
    screen: StackScreenType;
    params?: any;
};

/*
### Stack Navigations:
*/

export type InitStackNavigation = {
    explanation: undefined;
    welcome: undefined;
};

export type MainStackNavigation = {
    main_app: NavigationWithSpecificScreenConfig<BridgeScreenName>;
    auth: NavigationWithSpecificScreenConfig<AuthScreenName>;
    init: NavigationWithParams;
    loading: NavigationWithParams;
}

export type AuthStackNavigation = {
    login: NavigationWithParams;
    register: NavigationWithParams;
    choose_type: NavigationWithParams;
    otp: NavigationWithParams;
}

export type AppStackNavigation = {
    main_page: NavigationWithParams;
    notifications: NavigationWithParams;
    welcome: NavigationWithParams;
}

export type PriorityStackNavigation = {
    answer_questionnaire: NavigationWithParams;
    alert_medication: NavigationWithParams;
    motivational_phrase: NavigationWithParams;
    voice_call: NavigationWithParams;
};

export type BridgeStackNavigation = {
    app: NavigationWithSpecificScreenConfig<AppScreenName>;
    priority: NavigationWithSpecificScreenConfig<PriorityScreenName>;
};

export type DoctorTabNavigatorParamList = {
    Home: NavigationWithParams;
    Tratamento: NavigationWithParams;
    Perfil: NavigationWithParams;
    Análises: NavigationWithParams;
    Notepad: NavigationWithParams;
}

export type DoctorTabTypes = BottomTabNavigationProp<DoctorTabNavigatorParamList>;

export type PatientTabNavigatorParamList = {
    Home: NavigationWithParams;
    Tratamento: NavigationWithParams;
    Perfil: NavigationWithParams;
    Saúde: NavigationWithParams;
    Bluetooth: NavigationWithParams;
}

export type PatientTabTypes = BottomTabNavigationProp<PatientTabNavigatorParamList>

export type TreatmentStackNavigation = {
    main_treatment: NavigationWithParams;
    chat_treatment: NavigationWithParams;
    selected_treatment: NavigationWithParams;
    status: NavigationWithParams;
    selected_user: NavigationWithParams;
}

export type NotepadStackNavigation = {
    main_notepad: NavigationWithParams;
    current_note: NavigationWithParams;
}

export type ChatStackNavigation = {
    current_chat: NavigationWithParams;
    tagged_messages: NavigationWithParams;
    send_to_notes: NavigationWithParams;
}

export type ProfileStackNavigation = {
    main_profile: NavigationWithParams;
    profile_data: NavigationWithParams;
    profile_restrictions: NavigationWithParams;
}

export type BleStackNavigation = {
    main_ble: NavigationWithParams;
    device_data: NavigationWithParams;
}

export type MedicationStackNavigation = {
    main_medication: NavigationWithParams;
    schedule_medication: NavigationWithParams;
    add_medication: NavigationWithParams;
    update_medication: NavigationWithParams;
}

export type QuestionStackNavigation = {
    main_questions: NavigationWithParams;
    visualize_question: NavigationWithParams;
}

export type CallStackNavigation = {
    main_call: NavigationWithParams;
    cvv_call: NavigationWithParams;
}

export type AnalysisStackNavigation = {
    main_analysis: NavigationWithParams;
    current_patient: NavigationWithParams;
    history_patient_questionnaires: NavigationWithParams;
    current_questionnaire: NavigationWithParams;
    history_patient_medications: NavigationWithParams;
    current_medication: NavigationWithParams;
}

/*
### Stack Types:
*/

export type InitStackTypes = NativeStackNavigationProp<InitStackNavigation>;
export type AuthStackTypes = NativeStackNavigationProp<AuthStackNavigation>;
export type AppStackTypes = NativeStackNavigationProp<AppStackNavigation>;
export type PriorityStackTypes = NativeStackNavigationProp<PriorityStackNavigation>;
export type BridgeStackTypes = NativeStackNavigationProp<BridgeStackNavigation>;

export type TreatmentStackTypes = NativeStackNavigationProp<TreatmentStackNavigation>;
export type NotepadStackTypes = NativeStackNavigationProp<NotepadStackNavigation>;
export type ChatStackTypes = NativeStackNavigationProp<ChatStackNavigation>;
export type ProfileStackTypes = NativeStackNavigationProp<ProfileStackNavigation>;
export type BleStackTypes = NativeStackNavigationProp<BleStackNavigation>;
export type MedicationStackTypes = NativeStackNavigationProp<MedicationStackNavigation>;
export type QuestionStackTypes = NativeStackNavigationProp<QuestionStackNavigation>;
export type AnalysisStackTypes = NativeStackNavigationProp<AnalysisStackNavigation>;
export type CallStackTypes = NativeStackNavigationProp<CallStackNavigation>;

export type GlobalStackTypes = InitStackTypes | AuthStackTypes | AppStackTypes | TreatmentStackTypes | ProfileStackTypes;

// Screen Names:

export type AuthScreenName = keyof AuthStackNavigation;
export type AppScreenName = keyof AppStackNavigation;
export type BridgeScreenName = keyof BridgeStackNavigation;
export type PriorityScreenName = keyof PriorityStackNavigation;
export type PatientScreenName = keyof PatientTabNavigatorParamList;
export type DoctorScreenName = keyof DoctorTabNavigatorParamList;

export type TreatmentScreenName = keyof TreatmentStackNavigation;
export type NotepadScreenName = keyof NotepadStackNavigation;
export type ProfileScreenName = keyof ProfileStackNavigation;
export type ChatScreenName = keyof ChatStackNavigation;
export type BleScreenName = keyof BleStackNavigation;
export type MedicationScreenName = keyof MedicationStackNavigation;
export type QuestionScreenName = keyof QuestionStackNavigation;
export type AnalysisScreenName = keyof AnalysisStackNavigation;
export type CallScreenName = keyof CallStackNavigation;

export type GlobalScreenName = AuthScreenName | AppScreenName | TreatmentScreenName | ProfileScreenName;