import { MessageIconTypes } from "types/icon/Icon_Types";
import { UserType } from "types/user/User_Types";

export interface MessageModalProps {
    isVisible: boolean;
    message: string;
    onClose: () => void;
    userType: UserType;
    messageType?:  keyof MessageIconTypes;
}