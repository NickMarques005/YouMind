import { useEffect } from 'react';
import { UseAuth } from '@features/root/providers/AuthenticationProvider';
import { UpdateUserData, UserType } from 'types/user/User_Types';
import { UseUserService } from '@hooks/api/UseUserService';
import { UsePushToken } from '@features/root/providers/PushTokenProvider';
import { FormatISOToStringDate } from '@utils/date/DateFormatting';

interface UseUserDataProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    UpdateUserData: UpdateUserData;
    HandleConnectionAppError: (value: string) => void;
    setReloadData: React.Dispatch<React.SetStateAction<(() => Promise<any | boolean>) | undefined>>;
}

const UseUserData = ({ setReloadData, setLoading, UpdateUserData, HandleConnectionAppError }: UseUserDataProps) => {
    const { performFetchUserData } = UseUserService(setLoading);
    const { handleUserType } = UseAuth();

    const fetchUserData = async () => {
        try {
            const stopLoading = false;
            const response = await performFetchUserData(stopLoading);
            if (response.success) {
                const userData = response.data;

                if (userData?.birth) {
                    userData.birth = FormatISOToStringDate(userData.birth);
                }
                console.log("(USE USER DATA) Dados usuário: ", userData);
                UpdateUserData(userData);
                handleUserType(userData?.type as UserType);
                return userData;
            }
            if (response.error) {
                console.log(response);
                HandleConnectionAppError(response.error);
                setReloadData(() => fetchUserData);
            }
            return undefined;
        } catch (err) {
            const error = err as Error;
            console.error(err);
            HandleConnectionAppError(error.message);
            setReloadData(() => fetchUserData);
            return undefined;
        }
    };

    return { fetchUserData };
};

export default UseUserData;