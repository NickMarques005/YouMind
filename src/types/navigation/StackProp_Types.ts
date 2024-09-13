import { UserType } from "../user/User_Types";
import { AppScreenName, BridgeScreenName, PriorityScreenName } from "./Navigation_Types";

export interface AppStackProps {
    type: UserType;
}

export interface PriorityStackProps {
    type: UserType;
}

export interface BridgeStackProps {
    type: UserType;
}

export interface MainStackProps {
    Init: boolean,
    loading: boolean,
    LeaveModalVisible: boolean,
    HandleLeaveDecision: (leave: boolean) => void,
    user: string | null; 
}

