import React from 'react'; //importa biblioteca React
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import WelcomeLogo from './components/WelcomeLogo';
import ActionButton from './components/ActionButton';

const Welcome = () => {

    return (
        <LinearGradient colors={["#6c3775", "#54b0c4", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.2, y: 0.5 }} style={style_welcome.mainContainer}>
                <WelcomeLogo/>
                <ActionButton/>
        </LinearGradient>

    );
};

const style_welcome = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Welcome; 