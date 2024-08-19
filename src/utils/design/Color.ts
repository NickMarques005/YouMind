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