import { AppScreenName } from "types/navigation/Navigation_Types";
import { WelcomeMenuSelectOption } from "../WelcomeSession";
import { useState } from "react";
import { WelcomeInstructionsData } from "types/welcome/Welcome_Types";
import { instructionsData } from "@utils/welcome_treatment/Instructions";
import FirebaseStorageService from "src/__firebase__/services/FirebaseStorageService";

interface UseWelcomeBehaviorParams {
    navigateToAppScreen: (screenName: AppScreenName) => void;
}

const useWelcomeBehavior = ({ navigateToAppScreen }: UseWelcomeBehaviorParams) => {
    
    const [selectedOption, setSelectedOption] = useState<WelcomeMenuSelectOption | null>(null);
    const [instructions, setInstructions] = useState<WelcomeInstructionsData>(instructionsData);
    
    const loadInstructions = async (option: WelcomeMenuSelectOption, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
        setLoading(true);
        try {
            const fetchedImages = await FirebaseStorageService.fetchInstructionsImages(option);
            console.log(fetchedImages);
            if(fetchedImages.length === 0) return console.log("Nenhuma imagem achada");
            
            const updatedInstructions = instructionsData[option].map((instruction, index) => ({
                ...instruction,
                image: fetchedImages[index]
            }));

            setInstructions((prevInstructions) => ({
                ...prevInstructions,
                [option]: updatedInstructions
            }));
        } catch (error) {
            console.error("Erro ao buscar imagens:", error);
        } finally {
            setLoading(false);
        }
    };

    const goBackToHome = () => {
        navigateToAppScreen("main_page");
    }

    const goBackToMenu = () => {
        setSelectedOption(null);
    }

    const handleSelectOption = (option: WelcomeMenuSelectOption) => {
        setSelectedOption(option);
    }

    return { goBackToHome, goBackToMenu, handleSelectOption, selectedOption, instructions, loadInstructions }
}

export default useWelcomeBehavior;