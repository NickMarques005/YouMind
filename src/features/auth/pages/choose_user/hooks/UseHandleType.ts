import { useNavigation } from '@react-navigation/native';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import { AuthStackNavigation } from 'types/navigation/Navigation_Types';

export const UseTypeChoice = (authNavigation: (screenName: keyof AuthStackNavigation) => void) => {
    const { handleUserType } = UseAuth();

    const HandleTypeChoice = (type: 'patient' | 'doctor' | '') => {
        if(type === '') return console.log("Algo de errado aconteceu. Tipo de usuário indefinido");
        
        handleUserType(type);
        authNavigation('login');
    }

    return { HandleTypeChoice };
}


