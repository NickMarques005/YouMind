import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { InnerStack } from '../../stack/Stack';
import MainTreatmentDoctor from './treatment_doctor/MainTreatmentDoctor';
import MainTreatmentPatient from './treatment_pacient/MainTreatmentPatient';
import { UseAuth } from '../../../contexts/AuthContext';
import ChatEnvironment from './ChatEnvironment';
import { screenHeight, screenWidth } from '../../screen_size/Screen_Size';
import { UseChat } from '../../../contexts/ChatContext';


function MainTreatments() {
    const { authData } = UseAuth();
    const { redirectChat, currentChat} = UseChat();

    const [initialTreatmentRoute, setInitialTreatmentRoute] = useState<string | null>("");
    console.log(initialTreatmentRoute);

    useEffect(() => {
        console.log("HAS REDIRECT CHAT: ", redirectChat);
        if (redirectChat || currentChat) {
            setInitialTreatmentRoute("treatmentChat");
            
        } else {
            setInitialTreatmentRoute("mainTreatment");
        }
    }, [redirectChat]);

    return (
        <View style={{ flex: 1, width: screenWidth }}>
            {
                initialTreatmentRoute ?
                    authData.type === 'patient' ?
                        <InnerStack.Navigator initialRouteName={initialTreatmentRoute} screenOptions={{ headerShown: false }}>
                            <InnerStack.Screen name="mainTreatment" component={MainTreatmentPatient} />
                            <InnerStack.Screen name="treatmentChat" component={ChatEnvironment} />
                        </InnerStack.Navigator>
                        :
                        <InnerStack.Navigator initialRouteName={initialTreatmentRoute} screenOptions={{ headerShown: false }}>
                            <InnerStack.Screen name="mainTreatment" component={MainTreatmentDoctor} />
                            <InnerStack.Screen name="treatmentChat" component={ChatEnvironment} />
                        </InnerStack.Navigator>
                    : ""
            }
        </View>
    )
}

export default MainTreatments;