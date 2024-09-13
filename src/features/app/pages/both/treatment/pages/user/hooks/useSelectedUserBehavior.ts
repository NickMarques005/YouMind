import { UseTreatmentNavigation } from "@features/app/pages/both/treatment/hooks/UseTreatmentNavigation";
import { useState } from "react";
import { SearchUserData } from "types/treatment/Search_Types";

interface UseSelectedUserBehaviorParams {
    searchUserData: SearchUserData;
}

export const useSelectedUserBehavior = ({ searchUserData }: UseSelectedUserBehaviorParams) => {
    const { navigateToTreatmentScreen } = UseTreatmentNavigation();
    const [showDoctorTreatments, setShowDoctorTreatments] = useState(false);
    const [selectedUser, setSelectedUser] = useState<SearchUserData>(searchUserData);

    const handleSelectedUser = (user: SearchUserData) => {
        setSelectedUser(prevSelectedUser => {
            // Combina os dados do usuário com os dados já existentes no usuário selecionado
            const updatedUser = {
                ...prevSelectedUser,
                ...user
            };
            return updatedUser;
        });
    }

    const handleShowDoctorTreatments = () => {
        setShowDoctorTreatments(value => !value);
    }

    const handleBackSearch = () => {
        navigateToTreatmentScreen('main_treatment');
    }

    return { 
        showDoctorTreatments, 
        handleShowDoctorTreatments,
        selectedUser,
        handleSelectedUser,
        handleBackSearch
    }
}