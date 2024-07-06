import { UserType } from "types/user/User_Types";

export interface ErrorModalProps {
    isVisible: boolean;
    message: string;
    onClose: () => void;
    userType: UserType;
}