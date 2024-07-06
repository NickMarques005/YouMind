

export const EmailValidation = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const PhoneValidation = (phone: string) => {
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return phoneRegex.test(phone);
};

export const CRMValidation = (crm: string) => {
    const crmRegex = /^\d+\/[A-Z]{2}$/;
    return crmRegex.test(crm);
};