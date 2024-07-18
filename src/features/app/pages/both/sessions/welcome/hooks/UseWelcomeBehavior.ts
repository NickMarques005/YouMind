import { AppScreenName } from "types/navigation/Navigation_Types";
import { WelcomeMenuSelectOption } from "../WelcomeSession";
import { useState } from "react";

interface UseWelcomeBehaviorParams {
    navigateToAppScreen: (screenName: AppScreenName) => void;
}

const useWelcomeBehavior = ({ navigateToAppScreen }: UseWelcomeBehaviorParams) => {

    const [selectedOption, setSelectedOption] = useState<WelcomeMenuSelectOption | null>(null);

    const goBackToHome = () => {
        navigateToAppScreen("main_page");
    }

    const goBackToMenu = () => {
        setSelectedOption(null);
    }

    const handleSelectOption = (option: WelcomeMenuSelectOption) => {
        setSelectedOption(option);
    }

    return { goBackToHome, goBackToMenu, handleSelectOption, selectedOption }
}

export default useWelcomeBehavior;