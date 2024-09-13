import MainProvider from "@features/root/providers/MainProvider";
import Root from "@features/root/Root";
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <NavigationContainer>
      <MainProvider>
        <GestureHandlerRootView>
          <Root />
        </GestureHandlerRootView>
      </MainProvider>
    </NavigationContainer>
  );
}