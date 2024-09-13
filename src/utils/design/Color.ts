import { UserType } from "types/user/User_Types";

interface HandleColorTypeParams {
    patientColor: string;
    doctorColor: string;
    userType: UserType;
}

export const handleColorType = ({ patientColor, doctorColor, userType }: HandleColorTypeParams) => {
    switch (userType) {
        case 'doctor':
            return doctorColor;
        case 'patient':
            return patientColor;
        default:
            return patientColor;
    }
}

export type CallStatus = 'call' | 'receiving' | 'waiting';

export const gradientCallColors = (type: UserType) => {
    const gradientsStart = [
        "rgba(32, 42, 66, 1)",
        "rgba(62, 140, 140, 1)",
        type === 'doctor' ? "rgba(48, 110, 97, 1)" : "rgba(117, 40, 111, 1)"
    ];

    const gradientsEnd = [
        "rgba(8, 10, 15, 1)",
        "rgba(35, 34, 64, 1)",
        type === 'doctor' ? "rgba(17, 44, 46, 1)" : "rgba(40, 17, 46, 1)"
    ];

    return { gradientsStart, gradientsEnd };
}

export const gradientMotivacionalPhrasesColors = () => {

}