

export const EmailValidation = (email?: string) => {
    if(!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const PhoneValidation = (phone?: string) => {
    if(!phone) return false;
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return phoneRegex.test(phone);
};

export const CRMValidation = (crm?: string) => {
    if(!crm) return false;
    const crmRegex = /^\d+\/[A-Z]{2}$/;
    return crmRegex.test(crm);
};

export const ISODateValidation = (isoDate?: string) => {
    if (!isoDate) return false;
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!isoDateRegex.test(isoDate)) return false;

    const date = new Date(isoDate);
    return date.toISOString().startsWith(isoDate);
};

export const DDMMYYYYDateValidation = (date?: string) => {
    if (!date) return false;
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(date)) return false;

    const [day, month, year] = date.split('/').map(Number);

    const dateObject = new Date(year, month - 1, day);
    return (
        dateObject.getFullYear() === year &&
        dateObject.getMonth() === month - 1 &&
        dateObject.getDate() === day
    );
};