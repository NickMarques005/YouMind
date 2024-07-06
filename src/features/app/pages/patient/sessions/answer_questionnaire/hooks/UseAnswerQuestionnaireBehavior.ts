import { UseAppNavigation } from "@features/app/hooks/UseAppNavigation"
import { useState } from "react";


export const useAnswerQuestionnaireBehavior = () => {
    const [confirmBackToApp, setConfirmBackToApp] = useState(false);
    const [introduction, setIntroduction] = useState(true);
    const { navigateToAppScreen } = UseAppNavigation();

    const handleConfirmBackToAppModal = () => {
        setConfirmBackToApp(prev => !prev);
    }

    const handleIntroduction = () => {
        setIntroduction(prev => !prev);
    }

    const handleNavigateBackToApp = () => {
        navigateToAppScreen('main_page');
    }

    return {
        confirmBackToApp,
        handleConfirmBackToAppModal,
        handleNavigateBackToApp,
        introduction,
        handleIntroduction
    }
}