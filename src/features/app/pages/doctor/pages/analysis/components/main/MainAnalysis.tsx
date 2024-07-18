import React from 'react';
import {
    View, Animated, Text, FlatList,
    ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { responsiveSize, screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import CardPatientAnalysis from './components/CardPatientAnalysis';
import NoPatientsToAnalyze from './components/NoPatientsToAnalyze';
import LatestHistory from './components/LatestHistory';
import { usePatientHistoryHandling } from './hooks/usePatientHistoryHandling';
import { useMainAnalysisAnimations } from './hooks/useMainAnalysisAnimations';
import { useMainAnalysisBehavior } from './hooks/useMainAnalysisBehavior';
import DefaultLoading from '@components/loading/DefaultLoading';

function MainAnalysis() {
    const { patientsUnderAnalysis, state } = usePatientHistoryHandling();
    const { scrollX, getAnimationStyles } = useMainAnalysisAnimations();
    const { selectPatientToAnalyze, selectLatestMedication, selectLatestQuestionnaire } = useMainAnalysisBehavior();
    const loadingSize = responsiveSize * 0.15;

    return (
        <View style={{ display: 'flex', flex: 1, width: screenWidth, height: screenHeight * 0.9, alignItems: 'center', }}>
            <ScrollView nestedScrollEnabled={true} style={{flex: 1}}>
                <LinearGradient colors={['#24404d', '#4195a6']}
                    start={{ x: 0.1, y: 0 }}
                    end={{ x: 0.3, y: 0.15 }} style={{ width: '100%', height: '100%', paddingTop: '3.5%', }}>
                    <View style={{ width: '100%', height: 'auto', alignItems: 'center', paddingVertical: '14%' }}>
                        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#f1e1f2' }}>Análises</Text>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', borderTopEndRadius: 30, borderTopStartRadius: 30, backgroundColor: '#faf5fc', paddingTop: '10%', }}>
                        <View style={{ width: '100%', height: '100%', display: 'flex', gap: 20, }}>
                            <View style={{ paddingHorizontal: '8%', width: '100%', alignItems: 'flex-start', paddingBottom: 10, borderBottomWidth: 0.5 }}>
                                <Text style={{ fontSize: 20, }}>Pacientes</Text>
                            </View>
                            <View style={{ width: screenWidth, flex: 1 }}>
                                <View style={{ minHeight: screenHeight * 0.65, justifyContent: 'center' }}>
                                {
                                        state.patientHistory.length !== 0 ?
                                        patientsUnderAnalysis && patientsUnderAnalysis.length !== 0 ?
                                            <FlatList
                                                horizontal
                                                data={patientsUnderAnalysis}
                                                keyExtractor={(item, index) => index.toString()}
                                                renderItem={({ item, index }) => (
                                                    <Animated.View style={getAnimationStyles(index, screenWidth)}>
                                                        <CardPatientAnalysis selectPatientToAnalyze={selectPatientToAnalyze} patientUnderAnalysis={item} />
                                                    </Animated.View>
                                                )}
                                                showsHorizontalScrollIndicator={false}
                                                pagingEnabled
                                                onScroll={Animated.event(
                                                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                                    { useNativeDriver: false }
                                                )}
                                                scrollEventThrottle={16}
                                                contentContainerStyle={{paddingVertical: '3%'}}
                                            />
                                            :
                                            <DefaultLoading size={loadingSize} color={'#396a80'} />
                                            :
                                            <NoPatientsToAnalyze />
                                    }
                                </View>
                                <View style={{ flex: 1 }}>
                                    <LatestHistory 
                                        selectLatestMedication={selectLatestMedication} 
                                        selectLatestQuestionnaire={selectLatestQuestionnaire}
                                        loadingSize={loadingSize}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
        </View>
    )
}

export default MainAnalysis;