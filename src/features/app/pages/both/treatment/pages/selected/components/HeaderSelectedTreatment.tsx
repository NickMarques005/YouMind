import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TreatmentScreenName } from 'types/navigation/Navigation_Types';

interface HeaderSelectedTreatmentProps {
    loading: boolean;
    backIcon: any;
    navigateToTreatmentScreen: (screenName: TreatmentScreenName) => void;
    screenHeight: number;
}

const HeaderSelectedTreatment: React.FC<HeaderSelectedTreatmentProps> = ({ loading, backIcon, navigateToTreatmentScreen, screenHeight }) => {
    return (
        <LinearGradient colors={['#3f8a99', '#62aeb3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }} style={{ width: '100%', height: screenHeight * 0.25, padding: 35, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}>
            <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: 14 }}>
                <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}>Tratamento Atual</Text>
            </View>
            <View style={{ position: 'absolute', left: '6%', top: '20%' }}>
                <TouchableOpacity disabled={loading} onPress={() => navigateToTreatmentScreen('main_treatment')} style={{ opacity: loading ? 0.5 : 1 }}>
                    <Image style={{ height: 35, width: 35 }} source={backIcon} />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

export default HeaderSelectedTreatment;