import React, { useState, useEffect } from 'react';
import {
    View, Animated, Text, StyleSheet, SafeAreaView, FlatList
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { screenHeight, screenWidth } from '../../../../screen_size/Screen_Size';
import CardPatientAnalysis from './CardPatientAnalysis';
import { PatientAnalysis } from '../../../../../contexts/AnalysisContext';
import { UseTreatment } from '../../../../../contexts/TreatmentContext';


function MainAnalysis() {
    const { treatment_state } = UseTreatment();


    const [scrollX] = useState(new Animated.Value(0));
    const [samplePatientData, setSamplePatientData] = useState<PatientAnalysis[] | undefined>(undefined);

    useEffect(() => {

        const updatedSamplePatientData: PatientAnalysis[] = treatment_state.treatments.map((treatment, index) => ({
            name: treatment.name,
            email: treatment.email,
            photo: '',
            current_health_state: 0.75,
            medicines: {
                total_medicines: 10,
                current_medicines: 8,
            },
            questionaires: {
                total_questionaires: 15,
                current_questionaires: 12,
            },
        }));

        setSamplePatientData(updatedSamplePatientData);
    }, [treatment_state]);


    return (
        <View style={{ display: 'flex', flex: 1, width: screenWidth, height: screenHeight * 0.9, alignItems: 'center', }}>
            <LinearGradient colors={['#24404d', '#4195a6']}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 0.3, y: 0.28 }} style={{ width: '100%', height: '100%', paddingTop: 20, }}>
                <View style={{ width: '100%', height: 'auto', alignItems: 'center', paddingVertical: 60 }}>
                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#f1e1f2' }}>Análises</Text>
                </View>

                <View style={{ width: '100%', alignItems: 'center', borderTopEndRadius: 30, borderTopStartRadius: 30, backgroundColor: '#faf5fc', paddingVertical: 40, }}>
                    <View style={{ width: '100%', height: '100%', display: 'flex', gap: 20, }}>
                        <View style={{ paddingHorizontal: 30, width: '100%', alignItems: 'flex-start', paddingBottom: 10, borderBottomWidth: 0.5 }}>
                            <Text style={{ fontSize: 20, }}>Pacientes</Text>
                        </View>

                        <View style={{ width: screenWidth, minHeight: '50%' }}>
                            <FlatList
                                horizontal
                                data={samplePatientData} // Supondo que samplePatientData seja uma array de objetos de pacientes
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <Animated.View
                                        style={{
                                            width: screenWidth,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: 25,
                                            transform: [
                                                {
                                                    scale: scrollX.interpolate({
                                                        inputRange: [
                                                            (index - 1) * screenWidth,
                                                            index * screenWidth,
                                                            (index + 1) * screenWidth,
                                                        ],
                                                        outputRange: [0.8, 1, 0.8],
                                                    }),
                                                },
                                            ],
                                        }}
                                    >
                                        <CardPatientAnalysis patient_analysis={item} />
                                    </Animated.View>
                                )}
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                    { useNativeDriver: false }
                                )}
                                scrollEventThrottle={16}
                            />
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

export default MainAnalysis;