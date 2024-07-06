export interface ProfileFunctionsProps {
    signOut: () => void;
}

export class ProfilePatientFunctions {
    private ProfileData: ProfileFunctionsProps;

    constructor(ProfileData: ProfileFunctionsProps) {
        this.ProfileData = ProfileData;
    }

    handleNotifications = () => {
        console.log("Notifications");
    }

    handleSecurity = () => {
        console.log("Security");
    }

    handleAccessibility = () => {
        console.log("Accessibility");
    }

    handlePermissions = () => {
        console.log("Permissions");
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

    handleLogout = () => {
        console.log("(ProfileOptionFunctions) Logout");
        this.ProfileData.signOut();
    }
}

export class ProfileDoctorFunctions {
    private ProfileData: ProfileFunctionsProps;

    constructor(ProfileData: ProfileFunctionsProps) {
        this.ProfileData = ProfileData;
    }

    handleNotifications = () => {
        console.log("Notifications");
    }

    handleSecurity = () => {
        console.log("Security");
    }

    handleAccessibility = () => {
        console.log("Accessibility");
    }

    handlePermissions = () => {
        console.log("Permissions");
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

    handleLogout = () => {
        console.log("(ProfileOptionFunctions) Logout");
        this.ProfileData.signOut();
    }
}