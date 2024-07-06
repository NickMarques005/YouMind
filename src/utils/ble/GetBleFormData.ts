import { UserData } from "types/user/User_Types";
import { FormBleUser } from "types/ble/Ble_Types";

export const getFormBleUser = (user?: UserData): FormBleUser => {
    if(!user) return {};
    
    const nameParts = user.name.split(' ');
    const name = nameParts[0];
    const surname = nameParts[nameParts.length - 1];
    const email = user.email;

    return {
        name, 
        surname,
        email
    }
}