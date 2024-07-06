

export const formatName = (fullName: string) => {
    const nameParts = fullName.split(' ');
    if (nameParts.length > 1) {
        return `${nameParts[0]} ${nameParts[1]}`;
    }
    return fullName;  
};