import MainProvider from "@features/root/providers/MainProvider";
import Root from "@features/root/Root";
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <MainProvider>
        <Root />
      </MainProvider>
    </NavigationContainer>
  );
}