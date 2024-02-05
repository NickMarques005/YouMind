
export interface SignOutData {
    type: string;
}

interface ProfilePatientFunctionsProps {
    signOut: (type: string) => Promise<void>;
    
}

interface ProfileDoctorFunctionsProps {
    signOut: (type: string) => Promise<void>;
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
        this.ProfilePatientData.signOut( data.type );
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
        console.log("Logout");
        this.ProfileDoctorData.signOut(data.type);
    }
}

