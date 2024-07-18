import images from '@assets/images';
import { UseAppNavigation } from '@features/app/hooks/UseAppNavigation';
import React, { useState } from 'react'
import { View } from 'react-native';
import WelcomeMenu from './components/WelcomeMenu';
import MainInstructions from './components/MainInstructions';

export type WelcomeMenuSelectOption = 'Tratamento' | 'Paciente' | 'Doutor';

const menuOptions: WelcomeMenuSelectOption[] = ["Tratamento", "Paciente", "Doutor"];

const WelcomeSession = () => {
    const { navigateToAppScreen } = UseAppNavigation();
    const [selectedOption, setSelectedOption] = useState<WelcomeMenuSelectOption | null>(null);
    const youMindLogo = images.generic_images.logo.logo_mobile_default;

    const goBackToHome = () => {
        navigateToAppScreen("main_page");
    }

    const goBackToMenu = () => {
        setSelectedOption(null);
    }

    const handleSelectOption = (option: WelcomeMenuSelectOption) => {
        setSelectedOption(option);
    }

    const renderWelcomeContent = () => {
        if (!selectedOption) {
            return <WelcomeMenu
                menuOptions={menuOptions}
                youMindLogo={youMindLogo}
                goBackToHome={goBackToHome}
                handleSelectOption={handleSelectOption}
            />
        }

        return <MainInstructions selectedOption={selectedOption} goBackToMenu={goBackToMenu} />;
    }

    return (
        <View style={{ flex: 1 }}>
            {
                renderWelcomeContent()
            }
        </View>
    )
}

export default WelcomeSession;