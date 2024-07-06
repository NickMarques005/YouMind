import images from "@assets/images";
import { UserType } from "types/user/User_Types";
import { FormData } from "types/auth/Form_Types";

export interface FormField {
    key: keyof FormData;
    placeholder: string;
    icon: any;
    isPassword?: boolean;
}

export const GetRegisterFormFields = (userType: UserType): FormField[] => {
    const register_icon = {
        name: userType === 'doctor' ? images.generic_images.auth.doctor.user_doctor : images.generic_images.auth.patient.user_patient,
        email: userType === 'doctor' ? images.generic_images.auth.doctor.email_doctor : images.generic_images.auth.patient.email_patient,
        phone: userType === 'doctor' ? images.generic_images.auth.doctor.phone_doctor : images.generic_images.auth.patient.phone_patient,
        doctor_crm: images.generic_images.auth.doctor.crm_doctor,
        password: userType === 'doctor' ? images.generic_images.auth.doctor.pass_doctor : images.generic_images.auth.patient.pass_patient
    };

    const fields: FormField[] = [
        { key: 'name', placeholder: 'Nome', icon: register_icon.name },
        { key: 'email', placeholder: 'E-mail', icon: register_icon.email },
        { key: 'phone', placeholder: 'Telefone', icon: register_icon.phone },
        { key: 'password', placeholder: 'Senha', icon: register_icon.password, isPassword: true },
        ...(userType === 'doctor' ? [{ key: 'doctor_crm' as keyof FormData, placeholder: 'Registro CRM', icon: register_icon.doctor_crm }] : [])
    ];

    return fields;
};

export const GetLoginFormFields = (userType: UserType) => {
    const login_icon = {
        email: userType === 'doctor' ? images.generic_images.auth.doctor.email_doctor : images.generic_images.auth.patient.email_patient,
        password: userType === 'doctor' ? images.generic_images.auth.doctor.pass_doctor : images.generic_images.auth.patient.pass_patient
    }

    const fields: FormField[] = [
        { key: 'email', placeholder: 'E-mail', icon: login_icon.email },
        { key: 'password', placeholder: 'Senha', icon: login_icon.password, isPassword: true },
    ]

    return fields;
}