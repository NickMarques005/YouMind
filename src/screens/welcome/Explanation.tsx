import React, { useState } from 'react'; //importa biblioteca React
import { View, Image, Dimensions, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native'; //importa as bibliotecas de widgets de React Native
import { useNavigation } from '@react-navigation/native';
import { WelcomeStackTypes } from '../../routes/MainRouter';
import { LinearGradient } from 'expo-linear-gradient';
import { UseWelcome } from '../../contexts/WelcomeContext';
import InitialHeader from '../../components/headers/InitialHeader';

//retorna as dimensões do dispositivo 
import { screenHeight, screenWidth } from '../../components/screen_size/Screen_Size';

const Explanation = () => {

    const { setWelcome } = UseWelcome();

    //Utilização do navigation: widget para o funcionamento da navegação entre telas através de Pilhas.
    //Será assim pelo navigation que tornará possível a mudança de widgets que retornarão na tela do dispositivo
    const navigation = useNavigation<WelcomeStackTypes>();

    //Função para alterar a página atual e voltar para a página anterior
    const BackPage = () => {
        //Alterna para a próxima página
        navigation.navigate('welcome');
    }

    //Função para alterar a página atual e passar para a próxima
    const NextPage = () => {
        //Alterna para a próxima página
        console.log("NEXT PAGE");
        setWelcome(true);
    }

    //O que irá retornar na tela Funcionamento:
    return (
        <View style={styleexplanation.screen}>

            <InitialHeader onBackPress={BackPage} />

            <LinearGradient colors={['#ab32a5', '#8f228a', 'rgba(113, 46, 158, 0.2)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }} style={styleexplanation.containerFuncionamento}>
                <Text style={styleexplanation.textFuncionamento}>Funcionamento</Text>
            </LinearGradient>

            <View style={styleexplanation.containerLongText}>
                <Text style={[styleexplanation.longText, { fontWeight: 'bold', color: '#6e2e82' }]}>Olá, bem-vindo ao YouMind!</Text>

                <Text numberOfLines={6} style={styleexplanation.longText}>Esse aplicativo foi criado pela FWT, com a intenção de ajudar você, que enfrenta o transtorno de ansiedade e depressão, a vencer co o tratamento médico adequado. </Text>

                <Text numberOfLines={7} style={styleexplanation.longText}>Aqui você pode ter uma melhor visualização do seu desempenho, sendo feito questionários de como você está se sentindo, além de proporcionar verificações de batimentos cardíacos com o propósito de alertar caso sua ansiedade esteja muito elevada.</Text>

                <Text numberOfLines={9} style={styleexplanation.longText}>Utilizando a parte de anotações, você pode marcar como você se sente a cada dia com cada etapa de tratamento e na função do medicamento registrador poderá ser adicionado horários para remédios, se você faz o uso de algum, sendo assim alertado para evitar que você esqueça. O intuito é que você consiga obter o melhor resultado para a melhora da sua saúde.</Text>

                <Text numberOfLines={6} style={styleexplanation.longText}>Para garantir a obtenção desses resultados, é solicitado que se inscreva e responda com sinceridade ao breve questionário, para que assim seja possível ter uma melhor precisão de cada resultado.</Text>
            </View>

            <LinearGradient colors={['#4b99d1', '#2f4e9c']}
                start={{ x: 0.1, y: 0 }}
                end={{ x: 1, y: 0 }} style={styleexplanation.containerbuttonNext}>
                <TouchableOpacity onPress={NextPage} style={styleexplanation.buttonNext}>
                    <Text style={styleexplanation.textNext}>PRÓXIMO</Text>
                </TouchableOpacity>
            </LinearGradient>

        </View>
    );
};

//Estilo da tela Funcionamento:
const styleexplanation = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerFuncionamento: {
        width: screenWidth * 0.8,
        height: screenHeight * 0.08,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        marginTop: 120,
        backgroundColor: 'white',
        elevation: 15,
    },
    textFuncionamento: {
        fontSize: 20,
        color: '#fce3fb'
    },
    containerLongText: {
        maxWidth: screenWidth * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
        flexWrap: 'wrap',

    },
    longText: {
        fontSize: 14,
        textAlign: 'center',
        padding: 5,

    },
    containerbuttonNext: {
        width: screenWidth * 0.8,
        height: screenHeight * 0.1,
        marginTop: -20,
        borderRadius: 15,
    },
    buttonNext: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        

    },
    textNext: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },

});

export default Explanation; //Retorna e exporta a tela Explanation