//Importa todas as bibliotecas necessárias para a execução do aplicativo
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainRouter from './src/routes/MainRouter';
import { WelcomeProvider } from './src/contexts/WelcomeContext';
import { NavigationContainer } from '@react-navigation/native';
import { RootProvider } from './src/contexts/RootContext';
import { AuthProvider } from './src/contexts/AuthContext';

//Pilha criada para navegação entre telas

//Função principal do aplicativo, onde retornará todas as funções, widgets e eventos
//dentro da tela. A movimentação e mudança de telas será executado através do navigator
//Representa a estrutura geral do app YouMind
export default function App() {
  return (

    <WelcomeProvider>
      <AuthProvider>
        <NavigationContainer>
          <RootProvider>
            <MainRouter />
          </RootProvider>
        </NavigationContainer>
      </AuthProvider>
    </WelcomeProvider>
  );
}