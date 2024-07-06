import images from "@assets/images";
import { ProfileDoctorFunctions, ProfilePatientFunctions } from "./UseProfileActions";
import { UseAuth } from "@features/root/providers/AuthenticationProvider";
import { UseSocket } from "@features/app/providers/sub/SocketProvider";
import { UseForm } from "@features/app/providers/sub/UserProvider";

interface ProfileOption {
    name: string;
    icon: any;
    function: () => void;
}

export const useProfileOptions = (userType: string | undefined): ProfileOption[] => {
    const { signOut, uid } = UseAuth();
    const { socket } = UseSocket();
    const { userData } = UseForm();

    const handleSignOut = () => {
        socket?.emit('leaveRoom', {room: uid, userId: userData?._id})
        signOut();
    }

    const profileFunctions = userType === "doctor"
        ? new ProfileDoctorFunctions({ signOut: handleSignOut })
        : new ProfilePatientFunctions({ signOut: handleSignOut });

    const notifications = userType === "doctor" ? images.app_doctor_images.profile.icon_notifications : images.app_patient_images.profile.icon_notifications;
    const safety = userType === "doctor" ? images.app_doctor_images.profile.icon_safety : images.app_patient_images.profile.icon_safety;
    const accessibility = userType === "doctor" ? images.app_doctor_images.profile.icon_accessibility : images.app_patient_images.profile.icon_accessibility;
    const permissions = userType === "doctor" ? images.app_doctor_images.profile.icon_permissions : images.app_patient_images.profile.icon_permissions;
    const privacy = userType === "doctor" ? images.app_doctor_images.profile.icon_privacy : images.app_patient_images.profile.icon_privacy;
    const contract = userType === "doctor" ? images.app_doctor_images.profile.icon_contract : images.app_patient_images.profile.icon_contract;
    const support = userType === "doctor" ? images.app_doctor_images.profile.icon_support : images.app_patient_images.profile.icon_support;
    const about = userType === "doctor" ? images.app_doctor_images.profile.icon_about : images.app_patient_images.profile.icon_about;
    const logout = userType === "doctor" ? images.app_doctor_images.profile.icon_logout : images.app_patient_images.profile.icon_logout;

    return [
        { name: 'Notificações', icon: notifications, function: profileFunctions.handleNotifications },
        { name: 'Senha e Segurança', icon: safety, function: profileFunctions.handleSecurity },
        { name: 'Acessibilidade', icon: accessibility, function: profileFunctions.handleAccessibility },
        { name: 'Permissões do App', icon: permissions, function: profileFunctions.handlePermissions },
        { name: 'Política de Privacidade', icon: privacy, function: profileFunctions.handlePolicyPrivacy },
        { name: 'Contrato do Usuário', icon: contract, function: profileFunctions.handleContractUser },
        { name: 'Suporte', icon: support, function: profileFunctions.handleSupport },
        { name: 'Sobre', icon: about, function: profileFunctions.handleAbout },
        { name: 'Sair', icon: logout, function: profileFunctions.handleLogout },
    ];
}