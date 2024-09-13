import { useState } from "react";
import { UseProfileNavigation } from "../../../hooks/UseProfileNavigation";

export const useProfileDataBehavior = () => {
    const { navigateToProfileScreen } = UseProfileNavigation();
    const [isUploadModalVisible, setUploadModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);

    const handleUploadModalVisible = () => {
        setUploadModalVisible(value => !value);
    }
    
    const handleEditModalVisible = () => {
        setEditModalVisible(value => !value);
    }
 
    const goToRestrictions = () => {
        navigateToProfileScreen('profile_restrictions');
    };

    const goToMainProfile = () => {
        navigateToProfileScreen('main_profile');
    }

    return { 
        goToRestrictions,
        goToMainProfile,
        handleUploadModalVisible,
        handleEditModalVisible,
        isUploadModalVisible,
        isEditModalVisible
    }
}