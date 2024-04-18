import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type InitStackNavigation = {
    explanation: undefined;
    welcome: undefined;
};

type AuthStackNavigation = {
    login: undefined;
    register: undefined;
    choose_type: undefined;
    otp: undefined;
}

type AppStackNavigation = {
    main_page: undefined;
    notifications: undefined;
}

type DoctorStackNavigation = {
    home: undefined;
    treatment: undefined;
    profile: undefined;
    analysis: undefined;
    notepad: undefined;
}

type PatientStackNavigation = {
    home: undefined;
    treatment: undefined;
    profile: undefined;
    health: undefined;
    ble: undefined;
}

type TreatmentStackNavigation = {
    main_treatment: undefined;
    chat_treatment: undefined;
}

export type InitStackTypes = NativeStackNavigationProp<InitStackNavigation>;
export type AuthStackTypes = NativeStackNavigationProp<AuthStackNavigation>;
export type AppStackTypes = NativeStackNavigationProp<AppStackNavigation>;
export type TreatmentStackTypes = NativeStackNavigationProp<TreatmentStackNavigation>;
export type DoctorStackTypes = NativeStackNavigationProp<DoctorStackNavigation>;
export type PatientStackTypes = NativeStackNavigationProp<PatientStackNavigation>;