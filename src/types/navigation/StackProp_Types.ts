import { User } from "firebase/auth";
import { UserType } from "../user/User_Types";

export interface AppStackProps {
    type: UserType;
}

export interface MainStackProps {
    Init: boolean,
    loading: boolean,
    LeaveModalVisible: boolean,
    HandleLeaveDecision: (leave: boolean) => void,
    user: string | null; 
}

