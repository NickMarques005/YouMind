export interface LoadingState {
    login: boolean;
    register: boolean;
    logout: boolean;
    otpValidation: boolean;
}

export type LoadingAction = keyof LoadingState;