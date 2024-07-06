import { MessageIcon } from "@components/modals/message/types/type_message_modal";
import { UseUserService } from "@hooks/api/UseUserService";
import { FormatISOToStringDate, FormatStringToISODate } from "@utils/date/DateFormatting";
import { FormatDate, FormatPhone } from "@utils/user/DataFormatting";
import { useEffect, useState } from "react";
import { UserData, UserDoctor, UserGender, UserPatient } from "types/user/User_Types";

export interface UserDataToUpdate {
    name?: string;
    birth?: string;
    phone?: number;
    gender?: UserGender;
}

interface UseUpdateProfileDataProps {
    userData?: UserData;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    closeModal: () => void;
    HandleResponseAppError: (value: string) => void;
    HandleResponseAppSuccess: (message: string, messageType: MessageIcon) => void;
    updateProfileData: (newData: Partial<UserDoctor> | Partial<UserPatient>) => void;
}

export const UseUpdateProfileData = ({ userData, setLoading, closeModal, HandleResponseAppError, updateProfileData, HandleResponseAppSuccess }: UseUpdateProfileDataProps) => {
    const { performUpdateUserDetails } = UseUserService(setLoading);
    const [prevPhone, setPrevPhone] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [userDataToUpdate, setUserDataToUpdate] = useState<UserDataToUpdate>({
        name: userData?.name,
        birth: userData?.birth,
        phone: userData?.phone,
        gender: userData?.gender
    });

    const hasChanges = () => {
        console.log(userData);
        console.log(userDataToUpdate);
        return userData ? (
            userDataToUpdate.name !== userData.name ||
            userDataToUpdate.birth !== userData.birth ||
            userDataToUpdate.phone !== userData.phone ||
            userDataToUpdate.gender !== userData.gender
        ) : false;
    }

    const handleChangeText = (field: keyof UserDataToUpdate, value: string) => {
        
        let formattedValue = value;

        switch (field) {
            case "phone":
                formattedValue = FormatPhone(value, prevPhone);
                setPrevPhone(formattedValue);
                break;
            case "birth":
                formattedValue = FormatDate(value);
                break;
            default:
                break;
        }
        
        setUserDataToUpdate(prevState => ({
            ...prevState,
            [field]: formattedValue
        }));
    };

    const handleUpdateProfileData = async (updateData: UserDataToUpdate) => {
        const dataToUpdate = {
            ...updateData,
            birth: updateData.birth ? FormatStringToISODate(updateData.birth) : undefined
        };
        
        try {
            console.log("Dados a serem atualizados: ", updateData);
            const response = await performUpdateUserDetails(dataToUpdate);
            if (response.success) {
                console.log(response);
                if (response.data) {
                    updateProfileData({
                        ...response.data,
                        birth: response.data.birth ? FormatISOToStringDate(response.data.birth) : undefined,
                        phone: response.data.phone ? response.data.phone : undefined,
                    });
                    console.log("\nProfile atualizado!!!\n");
                    if(response.message) HandleResponseAppSuccess(response.message, response.type as MessageIcon);
                }
            }

            if (response.error) {
                console.log("Houve um erro!");
                HandleResponseAppError(response.error);
            }
        }
        catch (err) {
            const error = err as Error;
            console.log("Erro ao atualizar dados: ", error.message);
            HandleResponseAppError(error.message);
        }
    }

    const handleChangeGender = (value: UserGender) => {
        setUserDataToUpdate(prevState => ({
            ...prevState,
            gender: value
        }));
    }

    useEffect(() => {
        setIsButtonEnabled(hasChanges());
    }, [userDataToUpdate, userData]);

    return { userDataToUpdate, handleChangeText, handleUpdateProfileData, isButtonEnabled, prevPhone, handleChangeGender }
}