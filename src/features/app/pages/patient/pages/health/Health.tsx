import { UseHealthPage } from '@features/app/providers/patient/HealthProvider';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Menu from './components/menu/Menu';
import MedicationStack from '@navigation/stacks/app/patient/health/MedicationStack';
import QuestionStack from '@navigation/stacks/app/patient/health/QuestionStack';
import CallStack from '@navigation/stacks/app/patient/health/CallStack';

const Health = () => {
    const { currentHealthPage, handleCurrentHealthPage } = UseHealthPage();

    const renderCurrentPage = () => {
        switch (currentHealthPage) {
            case 'Medicamentos':
                return <MedicationStack />
            case "Questionários":
                return <QuestionStack />
            case "Call":
                return <CallStack/>
            default:
                break;
        }
    }

    return (
        <View style={stylehealth.container}>
                <Menu setCurrentPage={handleCurrentHealthPage} />
                {renderCurrentPage()}
                
        </View>
    );
};

const stylehealth = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Health;