import React from 'react';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveSize } from '@utils/layout/Screen_Size';

interface PatientPerformanceDetailsProps {
    medicationPerformance?: number;
    questionnairePerformance?: number;
    overallPerformance?: number;
    overallPerformanceMessage: string;
}

const PatientPerformanceDetails: React.FC<PatientPerformanceDetailsProps> = ({
    medicationPerformance,
    questionnairePerformance,
    overallPerformance,
    overallPerformanceMessage
}) => {
    const iconSize = responsiveSize * 0.085;
    const overallPerformanceSize = responsiveSize * 0.2;

    return (
        <View style={{ width: '100%', flex: 1, backgroundColor: '#dce1e3', borderRadius: 20, marginBottom: '4%', justifyContent: 'space-between', overflow: 'hidden' }}>
            <View style={{ width: '100%', flex: 1, paddingHorizontal: '4%', paddingVertical: '3%', gap: 5, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', gap: 3, alignItems: 'center' }}>
                        <MaterialIcons name="medication" size={iconSize * 0.7} color="#254345" />
                        <Text style={{ fontSize: 16, color: '#3e6669' }}>Desempenho dos Medicamentos: </Text>
                    </View>
                    <Text style={{ fontSize: 17, color: '#3e6669', fontWeight: '900', flex: 1, textAlign: 'right' }}>{medicationPerformance || 0}%</Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', gap: 3, alignItems: 'center' }}>
                        <MaterialIcons name="assignment" size={iconSize * 0.7} color="#254345" />
                        <Text style={{ fontSize: 16, color: '#3e6669' }}>Desempenho dos Questionários: </Text>
                    </View>
                    <Text style={{ fontSize: 17, color: '#3e6669', fontWeight: '900', textAlign: 'right' }}>{questionnairePerformance || 0}%</Text>
                </View>
            </View>
            <LinearGradient colors={['#4195a6', '#316663']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }} style={{ width: '100%', height: '50%', flexDirection: 'row' }}>
                <View style={{ flex: 1, paddingVertical: '3%', paddingHorizontal: '5%' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#c9e0f0' }}>Desempenho Geral</Text>
                    <Text style={{ fontSize: 13, color: '#bdcdd9' }}>{overallPerformanceMessage}</Text>
                </View>
                <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}>
                    <AnimatedCircularProgress
                        size={overallPerformanceSize}
                        width={overallPerformanceSize / 5}
                        rotation={0}
                        fill={overallPerformance || 0}
                        tintColor="#c9e0f0"
                        onAnimationComplete={() => []}
                        backgroundColor="rgba(155, 186, 194, 0.4)"
                    >
                        {(fill) => (
                            <Text style={{ fontWeight: '900', fontSize: 18, color: '#c9e0f0' }}>{`${Math.round(fill)}%`}</Text>
                        )}
                    </AnimatedCircularProgress>
                </View>
            </LinearGradient>
        </View>
    );
};

export default PatientPerformanceDetails;