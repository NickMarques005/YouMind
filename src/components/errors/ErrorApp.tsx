import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { screenHeight, screenWidth } from '../screen_size/Screen_Size';
import { LinearGradient } from 'expo-linear-gradient';
import { UseAuth } from '../../contexts/AuthContext';

function ErrorApp({errors, message, reloadData}: {errors?: string[], message?: string, reloadData?: () => void}) {
    const { signOut, authData } = UseAuth();
    
    return (
        <View style={{ height: screenHeight, width: screenWidth, alignItems: 'center', justifyContent: 'center', display: 'flex', gap: 30, paddingHorizontal: 30, }}>
            <View style={{position: 'absolute', top: 20,right: 20}}>
                <TouchableOpacity style={{width: '100%'}} onPress={() => authData.type ? signOut() : console.error("Houve um erro: usuário não possui tipo definido!")}>
                    <Image style={{width: 55, height: 55}} source={require('../../assets/init/back/default_back_type1.png')}/>
                </TouchableOpacity>
            </View>
            <Image style={{width: 200, height: 200, marginBottom: 15,}} source={require('../../assets/YouMind_MobileError.jpg')}/>
            
            <View style={{ width: '100%', display: 'flex', gap: 10,}}>
                <Text style={{ fontSize: 22, textAlign: 'center', color: '#928ed1' }}>Houve um erro ao conectar ao servidor</Text>
                <Text style={{ fontSize: 16, textAlign: 'center', color: '#b7b6cf' }}>{errors ? `${errors}` : message ? message : ""}</Text>
            </View>
            <LinearGradient colors={["rgba(162, 85, 173, 0.8)", "#5954b0"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.05, y: 1 }} style={{ borderRadius: 40, marginTop: 15,}}>
                <TouchableOpacity style={{width: '100%', paddingVertical: 20, paddingHorizontal: 30,}} onPress={() => reloadData ? reloadData() : console.log("Houve um erro")}>
                    <Text style={{ fontSize: 20, textTransform: 'uppercase', fontWeight: 'bold', color: 'white' }}>Tentar novamente</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

export default ErrorApp