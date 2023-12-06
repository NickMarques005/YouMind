import React from 'react';
import { View, Dimensions, Platform, Text, StyleSheet, TextInput, Image, KeyboardAvoidingView } from 'react-native';

import MainTreatments from '../search_chat/MainTreatments';
//retorna as dimensões do dispositivo 
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Patient_Treatment = () => {


  return (
    <View style={stylePatientChat.screen_Chat}>
      <MainTreatments />
    </View>
  );
};

const stylePatientChat = StyleSheet.create({
  screen_Chat: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

});

export default Patient_Treatment;