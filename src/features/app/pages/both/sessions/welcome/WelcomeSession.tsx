import images from '@assets/images';
import { UseAppNavigation } from '@features/app/hooks/UseAppNavigation';
import React, { useState } from 'react'
import { Text, View } from 'react-native';
import WelcomeMenu from './components/WelcomeMenu';
import TreatmentInstructions from './components/TreatmentInstructions';
import DoctorInstructions from './components/DoctorInstructions';
import PatientInstructions from './components/PatientInstructions';
import NoInstruction from './components/NoInstruction';

export type WelcomeMenuSelectOption = 'Tratamento' | 'Paciente' | 'Doutor';

const menuOptions: WelcomeMenuSelectOption[] = [ "Tratamento", "Paciente", "Doutor" ];

const WelcomeSession = () => {
    const { navigateToAppScreen } = UseAppNavigation();
    const [selectedOption, setSelectedOption] = useState<WelcomeMenuSelectOption | null>(null);
    const youMindLogo = images.generic_images.logo.logo_mobile_default;

    const goBackToHome = () => {
        navigateToAppScreen("main_page");
    }

    const handleSelectOption = (option: WelcomeMenuSelectOption) =>{
        setSelectedOption(option);
    }

    const renderWelcomeContent = () => {
        if (!selectedOption) {
            return <WelcomeMenu menuOptions={menuOptions} youMindLogo={youMindLogo} goBackToHome={goBackToHome} handleSelectOption={handleSelectOption} />
        }

        switch (selectedOption)
        {
            case "Tratamento":
                return <TreatmentInstructions/>;
            case "Doutor":
                return <DoctorInstructions/>;
            case "Paciente":
                return <PatientInstructions/>;
            default:
                return <NoInstruction/>;
        }
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