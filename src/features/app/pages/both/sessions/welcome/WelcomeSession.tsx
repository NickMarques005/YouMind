import images from '@assets/images';
import { UseAppNavigation } from '@features/app/hooks/UseAppNavigation';
import React, { useState } from 'react'
import { View } from 'react-native';
import WelcomeMenu from './components/WelcomeMenu';
import MainInstructions from './components/MainInstructions';
import { responsiveSize } from '@utils/layout/Screen_Size';
import useWelcomeBehavior from './hooks/UseWelcomeBehavior';

export type WelcomeMenuSelectOption = 'Tratamento' | 'Paciente' | 'Doutor';

const menuOptions: WelcomeMenuSelectOption[] = ["Tratamento", "Paciente", "Doutor"];

const WelcomeSession = () => {
    const { navigateToAppScreen } = UseAppNavigation();
    const { selectedOption, handleSelectOption, 
            goBackToHome, goBackToMenu } = useWelcomeBehavior({ navigateToAppScreen });
    const youMindLogo = images.generic_images.logo.logo_mobile_default;
    const backIconSize = responsiveSize * 0.11;
    const loadingIconSize = responsiveSize * 0.05;
    const instructionNavigationIconSize = responsiveSize * 0.06;

    const renderWelcomeContent = () => {
        if (!selectedOption) {
            return <WelcomeMenu
                menuOptions={menuOptions}
                youMindLogo={youMindLogo}
                goBackToHome={goBackToHome}
                handleSelectOption={handleSelectOption}
                backIconSize={backIconSize}
            />
        }

        return <MainInstructions
            selectedOption={selectedOption}
            goBackToMenu={goBackToMenu}
            backIconSize={backIconSize}
            instructionNavigationIconSize={instructionNavigationIconSize}
            loadingIconSize={loadingIconSize}
        />;
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