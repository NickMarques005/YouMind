import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const NoMedicinesRegistered = () => {
    return (
        <View style={{width: '100%', height: '80%', alignItems: 'center', justifyContent: 'center', gap: 10}}>
            <Image style={{width: 100, height: 100}} source={require('../../../assets/health/medicines/noMedicinesRegisteredIcon.png')}/>
            <Text style={{width: '80%', textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#7b2d7a'}}>Você não possui medicamentos registrados...</Text>
        </View>
    )
}

const NoMedicinesToday = () => {
    return (
        <View style={{width: '100%', height: '80%', alignItems: 'center', justifyContent: 'center', gap: 10}}>
            <Image style={{width: 80, height: 80}} source={require('../../../assets/health/medicines/noMedicinesTodayIcon.png')}/>
            <Text style={{width: '60%', textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#7b2d7a'}}>Aproveite o dia sem medicamentos! </Text>
        </View>
    )
}

export default {NoMedicinesRegistered, NoMedicinesToday};