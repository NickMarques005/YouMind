import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { PatientHistory } from 'types/history/PatientHistory_Types';
import { Bar } from 'react-native-progress';
import { getProductivityLevel } from '@utils/treatment/HandlingHistory';

interface PatientPerformanceDataContainerProps {
    title: string;
    data: string | number;
    hasDataBelow?: boolean;
    dataType: 'medication' | 'questionnaire' | 'productivity',
    history?: PatientHistory;
}

const PatientPerformanceDataContainer: React.FC<PatientPerformanceDataContainerProps> = ({ title, data, hasDataBelow, dataType, history }) => {

    const [performance, setPerformance] = useState<number>(0);

    const renderPerformanceDataIcon = () => {
        switch (dataType) {
            case 'medication':
                return <Ionicons name="medical" size={24} color="#cae4eb" />;
            case 'questionnaire':
                return <MaterialIcons name="list-alt" size={24} color="#cae4eb" />;
            case 'productivity':
                return <MaterialIcons name="trending-up" size={24} color="#cae4eb" />;
            default:
                return null;
        }
    };

    const calculatePerformance = (history?: PatientHistory) => {
        if (!history) return 0;

        switch (dataType) {
            case 'medication':
                return history.medicationHistory.total > 0
                    ? history.medicationHistory.taken / history.medicationHistory.total
                    : 0;
            case 'questionnaire':
                return history.questionnaireHistory.total > 0
                    ? history.questionnaireHistory.answered / history.questionnaireHistory.total
                    : 0;
            case 'productivity':
                console.log('productivity')
                const performance = getProductivityLevel(history) ?? 0;
                return performance/100;
            default:
                return 0;
        }
    };

    useEffect(() => {
        const newPerformance = calculatePerformance(history);
        setPerformance(newPerformance);
    }), [history];

    return (
        <View style={[{ display: 'flex', width: '100%', paddingVertical: '3%' }, hasDataBelow && { borderBottomWidth: 1.5, borderColor: 'rgba(200, 213, 219, 0.5)' }]}>
            <View style={{ gap: 10, flexDirection: 'row', marginBottom: 15, }}>
                {renderPerformanceDataIcon()}
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#cae4eb' }}>{title}</Text>
            </View>
            <View style={{}}>
                <View style={{}}>
                    <Text style={{ fontSize: 16, color: '#dce6e8' }}>{data}</Text>
                </View>
                <View style={{ paddingVertical: '5%', }}>
                    <Bar
                        width={null}
                        height={10}
                        borderRadius={5}
                        color={'#cae4eb'}
                        unfilledColor={'rgba(200, 213, 219, 0.5)'}
                        progress={performance || 0}
                    />
                </View>
            </View>
        </View>
    );
};

export default PatientPerformanceDataContainer;