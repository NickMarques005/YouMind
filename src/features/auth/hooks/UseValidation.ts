import { CRMValidation, EmailValidation, PhoneValidation } from "@utils/user/DataValidation";
import { FormData } from "types/auth/Form_Types";
import { UserType } from "types/user/User_Types";

export interface AuthValidationErrors {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    doctor_crm?: string;
}

export const HandleValidation = (formData: FormData, userType: UserType,) => {

    let errors: AuthValidationErrors = {};

    if ('name' in formData && (!formData.name || formData.name.trim() === "")) {
        errors.name = "O campo nome é obrigatório";
    }
    if ('email' in formData) {
        if (!formData.email) {
            errors.email = "O campo email é obrigatório"; 
        }
        else if (!EmailValidation(formData.email)) {
            errors.email="O formato do email é inválido";
        }
    }

    if ('password' in formData && (!formData.password || formData.password.trim() === "")) {
        errors.password = "O campo senha é obrigatório";
    }
    if ('phone' in formData ) {
        if(!formData.phone) {
            errors.phone = "O campo telefone é obrigatório"; 
        }
        else if(!PhoneValidation(formData.phone)){
            errors.phone = "O formato do telefone é inválido";
        }
    }

    if (userType === 'doctor' && 'doctor_crm' in formData ) {
        if(!formData.doctor_crm){
            errors.doctor_crm = "O campo CRM é obrigatório.";
        }
        else if(!CRMValidation(formData.doctor_crm)) {
            errors.doctor_crm = "O formato do CRM é inválido.";
        }
        
    }

    return Object.keys(errors).length === 0 ? true : errors;
}

