import { Token, Tokens } from "../../../providers/AuthenticationProvider";

export interface SignOutData {
    tokens: Tokens | undefined;
    type: string;
}

interface ProfilePatientFunctionsProps {
    LogoutUser: (tokens: Tokens | undefined, type: string) => Promise<void>;
}

interface ProfileDoctorFunctionsProps {
    LogoutUser: (tokens: Tokens | undefined, type: string) => Promise<void>;
}

export class ProfilePatientFunctions {
    private ProfilePatientData: ProfilePatientFunctionsProps;

    constructor (ProfilePatientData: ProfilePatientFunctionsProps) {
        this.ProfilePatientData = ProfilePatientData;
    }


    handleNotifications = () => {
        console.log("Notifications");
    }

    handleSecurity = () => {
        console.log("Security");
    }

    handleAccebility = () => {
        console.log("Accessibility");
    }

    handlePermissions = () => {
        console.log("permissions");
    }

    handlePolicyPrivacy = () => {
        console.log("PolicyPrivacy");
    }

    handleContractUser = () => {
        console.log("ContractUser");
    }

    handleSupport = () => {
        console.log("Support");
    }

    handleAbout = () => {
        console.log("About");
    }

    handleLogout = (data: SignOutData) => {
        console.log("Logout");
        if(!data.tokens)
        {
            console.log("Houve um erro. AccessToken não existe ou foi expirado");
            return;
        }
        this.ProfilePatientData.LogoutUser(data.tokens, data.type);
    }
}

export class ProfileDoctorFunctions {
    private ProfileDoctorData: ProfileDoctorFunctionsProps;

    constructor (ProfileDoctorData: ProfileDoctorFunctionsProps) {
        this.ProfileDoctorData = ProfileDoctorData;
    }


    handleNotifications = () => {
        console.log("Notifications");
    }

    handleSecurity = () => {
        console.log("Security");
    }

    handleAccebility = () => {
        console.log("Accessibility");
    }

    handlePermissions = () => {
        console.log("permissions");
    }

    handlePolicyPrivacy = () => {
        console.log("PolicyPrivacy");
    }

    handleContractUser = () => {
        console.log("ContractUser");
    }

    handleSupport = () => {
        console.log("Support");
    }

    handleAbout = () => {
        console.log("About");
    }

    handleLogout = ( data: SignOutData ) => {
        console.log("(ProfileOptionFunctions) Logout");
        if(!data.tokens)
        {
            console.log("Houve um erro. AccessToken não existe ou foi expirado");
            return;
        }
        this.ProfileDoctorData.LogoutUser(data.tokens, data.type);
    }
}

