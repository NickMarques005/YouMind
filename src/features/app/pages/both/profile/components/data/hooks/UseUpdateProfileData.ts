import { UseUserService } from "@hooks/api/UseUserService";
import { FormatISOToStringDate, FormatStringToISODate } from "@utils/date/DateFormatting";
import { FormatDate, FormatPhone, UnformatPhoneNumber } from "@utils/user/DataFormatting";
import { DDMMYYYYDateValidation, PhoneValidation } from "@utils/user/DataValidation";
import { useState } from "react";
import { MessageIconTypeKey } from "types/icon/Icon_Types";
import { GenderType, UserData, UserDoctor, UserGender, UserPatient } from "types/user/User_Types";

export interface UserDataToUpdate {
    name?: string;
    birth?: string;
    phone?: string;
    gender?: UserGender;
    genderType?: GenderType;
}

interface UseUpdateProfileDataProps {
    userData?: UserData;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    closeModal: () => void;
    HandleResponseAppError: (value: string) => void;
    HandleResponseAppSuccess: (message: string, messageType: MessageIconTypeKey) => void;
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
        console.log("Changes UpdateData");
        if (!userData) return false;

        const isNameDifferent = userDataToUpdate.name !== userData.name;
        const isBirthDifferent = userDataToUpdate.birth !== userData.birth;
        const isPhoneDifferent = userDataToUpdate.phone !== userData.phone;
        const isGenderDifferent = userDataToUpdate.gender !== userData.gender;

        // Validações adicionais para phone e birth
        const isPhoneValid = PhoneValidation(userDataToUpdate.phone);
        const isBirthValid = DDMMYYYYDateValidation(userDataToUpdate.birth);

        return (
            isNameDifferent ||
            (isBirthDifferent && isBirthValid) ||
            (isPhoneDifferent && isPhoneValid) ||
            isGenderDifferent
        );
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
        if (updateData.phone !== userData?.phone && updateData.phone) {
            const validationPhone = PhoneValidation(updateData.phone);
            if (!validationPhone) return HandleResponseAppError("Formato do número de telefone inválido");
            dataToUpdate.phone = UnformatPhoneNumber(updateData.phone);
        }
        if (updateData.gender !== userData?.gender) {
            dataToUpdate.gender = updateData.gender;
        }
        if (updateData.birth !== userData?.birth) {
            console.log("Birth validation");
            const validationBirth = DDMMYYYYDateValidation(updateData.birth);
            if (!validationBirth) return HandleResponseAppError("Formato da data de aniversário inválido");
            dataToUpdate.birth = FormatStringToISODate(updateData.birth);
        }

        if (Object.keys(dataToUpdate).length === 0) {
            console.log("Nenhuma alteração foi detectada.");
            return undefined;
        }

        return dataToUpdate;
    }

    const handleUpdateProfileData = async (updateData: UserDataToUpdate, onSuccess?: () => void) => {
        const dataToUpdate = handleVerifyUpdatedData(updateData);
        if (!dataToUpdate) return;

        try {
            const response = await performUpdateUserDetails(dataToUpdate);
            if (response.success) {
                if (response.data) {
                    updateProfileData({
                        ...response.data,
                        birth: response.data.birth ? FormatISOToStringDate(response.data.birth) : undefined,
                        phone: response.data.phone ? response.data.phone : undefined,
                    });

                    if (onSuccess) {
                        onSuccess();
                    }
                    console.log("\nProfile atualizado!!!\n");
                    if (response.message) HandleResponseAppSuccess(response.message, response.type as MessageIconTypeKey);
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