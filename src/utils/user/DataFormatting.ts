
export const FormatPhone = (phone: string, prev_phone: string) => {
    if (!phone) return phone;

    const currentValue = phone.replace(/[^\d]/g, '');
    const prevValue = prev_phone.replace(/[^\d]/g, '');

    if (currentValue.length < prevValue.length) {
        if (currentValue.length <= 10) {
            if (currentValue.length === 0) return '';
            if (currentValue.length <= 2) return `(${currentValue}`;
            if (currentValue.length <= 6) return `(${currentValue.slice(0, 2)}) ${currentValue.slice(2)}`;
            return `(${currentValue.slice(0, 2)}) ${currentValue.slice(2, 6)}-${currentValue.slice(6)}`;
        }
    } else {
        if (currentValue.length <= 10) {
            if (currentValue.length === 0) return '';
            if (currentValue.length <= 2) return `(${currentValue}`;
            if (currentValue.length <= 6) return `(${currentValue.slice(0, 2)}) ${currentValue.slice(2)}`;
            return `(${currentValue.slice(0, 2)}) ${currentValue.slice(2, 6)}-${currentValue.slice(6)}`;
        }
    }

    // Trata casos de números com mais de 10 dígitos (como DDD 11 dígitos)
    if (currentValue.length > 10) {
        return `(${currentValue.slice(0, 2)}) ${currentValue.slice(2, 7)}-${currentValue.slice(7)}`;
    }

    return phone;
}

export const FormatDate = (value?: string) => {
    if (!value) return '';

    const onlyNums = value.replace(/[^\d]/g, ""); // Remove tudo que não é número
    if (onlyNums.length <= 2) {
        return onlyNums;
    }
    if (onlyNums.length <= 4) {
        return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2)}`;
    }
    return `${onlyNums.slice(0, 2)}/${onlyNums.slice(2, 4)}/${onlyNums.slice(4, 8)}`;
};

export const FormatCRM = (crm: string) => {
    let formattedCRM = crm.toUpperCase().replace(/[^0-9A-Z\/]/g, '');

    const slashIndex = formattedCRM.indexOf('/');

    if (slashIndex !== -1) {
        let numberPart = formattedCRM.slice(0, slashIndex);
        let statePart = formattedCRM.slice(slashIndex + 1);
        statePart = statePart.replace(/[^A-Z]/g, '').slice(0, 2);
        formattedCRM = `${numberPart}/${statePart}`;
    }

    return formattedCRM;
}