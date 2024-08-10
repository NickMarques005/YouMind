import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { PatientHistory } from 'types/history/PatientHistory_Types';
import PatientPerformanceDataContainer from './PatientPerformanceDataContainer';

interface OverallPatientPerformanceProps {
    history?: PatientHistory;
    productivityLevel: string;
    patientProgress: number;
    performanceMessage: string;
}

const OverallPatientPerformance: React.FC<OverallPatientPerformanceProps> = ({
    history,
    productivityLevel,
    patientProgress,
    performanceMessage,
}) => {
    return (
        <View style={{ width: '100%', flex: 1, borderRadius: 20, elevation: 10, backgroundColor: '#62aeb3' }}>
            <LinearGradient colors={['#3f8a99', '#62aeb3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }} style={{ width: '100%', height: '100%', borderRadius: 10 }}>
                <View style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '10%', gap: 20, }}>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flex: 1, }}>

                        <PatientPerformanceDataContainer
                            title="Medicamentos"
                            data={`Total de ${history?.medicationHistory.taken} tomados`}
                            hasDataBelow={true}
                            dataType={'medication'}
                            history={history}
                        />
                        <PatientPerformanceDataContainer
                            title="Questionários"
                            data={`Total de ${history?.questionnaireHistory.answered} respondidos`}
                            hasDataBelow={true}
                            dataType={'questionnaire'}
                            history={history}
                        />
                        <PatientPerformanceDataContainer
                            title="Nível de produtividade"
                            data={productivityLevel}
                            dataType={'productivity'}
                            history={history}
                        />
                    </View>
                    <View style={{ width: '100%', paddingHorizontal: '3%', alignItems: 'center', justifyContent: 'space-between', display: 'flex', gap: 18 }}>
                        <Text style={{ fontSize: 18, color: 'white', fontWeight: '600' }}>Desempenho Individual</Text>
                        <AnimatedCircularProgress
                            size={120}
                            width={25}
                            rotation={0}
                            fill={patientProgress}
                            tintColor="#c5e7ed"
                            onAnimationComplete={() => []}
                            backgroundColor="rgba(237, 242, 245, 0.3)"
                        >
                            {(fill) => (
                                <Text style={{ fontWeight: '900', fontSize: 20, color: '#f0f4f7' }}>{`${Math.round(fill)}%`}</Text>
                            )}
                        </AnimatedCircularProgress>
                        <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>{performanceMessage}</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

export default OverallPatientPerformance;