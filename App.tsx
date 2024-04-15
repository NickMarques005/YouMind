import React from 'react';
import MainRouter from './src/routes/MainRouter';
import { WelcomeProvider } from './src/contexts/WelcomeContext';
import { NavigationContainer } from '@react-navigation/native';
import { RootProvider } from './src/contexts/RootContext';
import { AuthProvider } from './src/contexts/AuthContext';
import { EventProvider } from './src/contexts/EventContext';
import { LoadingProvider } from './src/contexts/LoadingContext';


export default function App() {
  return (
    <EventProvider>
      <LoadingProvider>
        <WelcomeProvider>
          <AuthProvider>
            <NavigationContainer>
              <RootProvider>
                <MainRouter />
              </RootProvider>
            </NavigationContainer>
          </AuthProvider>
        </WelcomeProvider>
      </LoadingProvider>
    </EventProvider>
  );
}