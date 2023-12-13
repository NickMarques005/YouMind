import React from 'react';
import MainRouter from './src/routes/MainRouter';
import { WelcomeProvider } from './src/contexts/WelcomeContext';
import { NavigationContainer } from '@react-navigation/native';
import { RootProvider } from './src/contexts/RootContext';
import { AuthProvider } from './src/contexts/AuthContext';

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