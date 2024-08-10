import { MessageIcon } from "@components/modals/message/types/type_message_modal";
import { UseUserService } from "@hooks/api/UseUserService";
import { FormatISOToStringDate, FormatStringToISODate } from "@utils/date/DateFormatting";
import { FormatDate, FormatPhone } from "@utils/user/DataFormatting";
import { useEffect, useState } from "react";
import { GenderType, UserData, UserDoctor, UserGender, UserPatient } from "types/user/User_Types";

export interface UserDataToUpdate {
    name?: string;
    birth?: string;
    phone?: number;
    gender?: UserGender;
    genderType?: GenderType;
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
    const [userDataToUpdate, setUserDataToUpdate] = useState<UserDataToUpdate>({
        name: userData?.name,
        birth: userData?.birth,
        phone: userData?.phone,
        gender: userData?.gender,
        genderType: (userData?.gender && ["Masculino", "Feminino", "Prefiro não informar"].includes(userData.gender))
            ? userData.gender as GenderType
            : "Outro",
    });

    const hasChanges = () => {
        console.log("Verify updateUserData Changes");
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

    const handleVerifyUpdatedData = (updateData: UserDataToUpdate) => {
        const dataToUpdate: Partial<UserDataToUpdate> = {};

        // Verifica cada campo e, se for diferente, adiciona ao objeto dataToUpdate
        if (updateData.name !== userData?.name) {
            dataToUpdate.name = updateData.name;
        }
        if (updateData.phone !== userData?.phone) {
            dataToUpdate.phone = updateData.phone;
        }
        if (updateData.gender !== userData?.gender) {
            dataToUpdate.gender = updateData.gender;
        }
        if (updateData.birth !== userData?.birth) {
            dataToUpdate.birth = FormatStringToISODate(updateData.birth);
        }

        if (Object.keys(dataToUpdate).length === 0) {
            console.log("Nenhuma alteração foi detectada.");
            return undefined;
        }

        return dataToUpdate;
    }

    const handleUpdateProfileData = async (updateData: UserDataToUpdate) => {
        const dataToUpdate = handleVerifyUpdatedData(updateData);
        if(!dataToUpdate) return;

        console.log("Dados a serem atualizados: ", dataToUpdate);

        try {
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
                    if (response.message) HandleResponseAppSuccess(response.message, response.type as MessageIcon);
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

    const handleChangeGenderType = (value: GenderType) => {
        setUserDataToUpdate(prevState => ({
            ...prevState,
            genderType: value
        }));
    }

    const isButtonEnabled = hasChanges();

    return { userDataToUpdate, handleChangeText, handleUpdateProfileData, isButtonEnabled, prevPhone, handleChangeGender, handleChangeGenderType }
}