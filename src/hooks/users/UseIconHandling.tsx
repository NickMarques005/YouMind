import images from "@assets/images";
import { UserType } from "types/user/User_Types"

interface HandleUserIconParams {
    userType: UserType;
    userAvatar?: string;
    defaultAppIcon: any;
}

export const useIconHandling = () => {
    const defaultUserPatientIcon = images.generic_images.notifications.default_chat_patient_notification_icon;
    const defaultUserDoctorIcon = images.generic_images.notifications.default_chat_doctor_notification_icon;

    const handleUserIcon = ({ userAvatar, userType, defaultAppIcon }: HandleUserIconParams) => {
        if (userAvatar) {
            return { uri: userAvatar };
        }
        else {
            let defaultUserIcon;
            if (userType) {
                defaultUserIcon = userType === 'doctor' ? defaultUserDoctorIcon : defaultUserPatientIcon;
            }
            else {
                defaultUserIcon = defaultAppIcon;
            }
            return defaultUserIcon;
        }
    }

    return { handleUserIcon }
}