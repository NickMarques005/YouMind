import React, { useState } from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import Health_Menu from '../../health_screen/Health_Menu';
import Health_Questionaries from '../../health_screen/Health_Questionaries';
import Health_Medicines from '../../health_screen/Health_Medicines';
import Health_Call from '../../health_screen/Health_Call';
import { UseHealthPage } from '../../../providers/HealthProvider';

//retorna as dimensões do dispositivo 
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Patient_Health = () => {
  const {currentHealthPage, handleCurrentHealthPage} = UseHealthPage();
  
  const renderCurrentPage = () => {
    switch (currentHealthPage) {
      case 'Medicamentos':
        return <Health_Medicines />
      case "Questionários":
        return <Health_Questionaries />
      case "Call":
        return <Health_Call/>
      default:
        break;
    }
  }

  return (
    <View style={stylehealth.screen_Health}>
      <View style={stylehealth.health}>
        <Health_Menu setCurrentPage={handleCurrentHealthPage} />
        {renderCurrentPage()}
      </View>
    </View>
  );
};

const stylehealth = StyleSheet.create({
  screen_Health: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  health: {
    width: screenWidth,
    backgroundColor: 'white',
    height: screenHeight,
    alignItems: 'center'
  },
  header_Chat: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#b049c9',
    width: screenWidth,
    height: screenHeight * 0.136,
    position: 'absolute',
    top: 0,
    zIndex: 1,
    padding: 10,
    paddingBottom: screenHeight * 0.01,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 7,
    shadowRadius: 3.84,
    elevation: 80,

  },

});

export default Patient_Health;