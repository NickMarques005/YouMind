import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { InnerStack } from '../../stack/Stack';
import MainTreatmentDoctor from './MainTreatmentDoctor';
import MainTreatmentPatient from './MainTreatmentPatient';
import { UseAuth } from '../../../contexts/AuthContext';
import ChatEnvironment from './ChatEnvironment';
import { screenHeight, screenWidth } from '../../screen_size/Screen_Size';


function MainTreatments() {
    const { authData } = UseAuth();

    
    return (
        <View style={{flex: 1, height: screenHeight, width: screenWidth}}>
            {
                authData.type === 'patient' ?
                    <InnerStack.Navigator initialRouteName='mainTreatment' screenOptions={{ headerShown: false }}>
                        <InnerStack.Screen name="mainTreatment" component={MainTreatmentPatient} />
                        <InnerStack.Screen name="treatmentChat" component={ChatEnvironment} />
                    </InnerStack.Navigator>
                    :
                    <InnerStack.Navigator initialRouteName='mainTreatment' screenOptions={{ headerShown: false }}>
                        <InnerStack.Screen name="mainTreatment" component={MainTreatmentDoctor} />
                        <InnerStack.Screen name="treatmentChat" component={ChatEnvironment} />
                    </InnerStack.Navigator>

            }
        </View>
    )
}

export default MainTreatments;