import images from '@assets/images';
import React from 'react';
import { Image, View, Text } from 'react-native';
import { welcome_logo_style } from '../styles/WelcomeLogo';

const WelcomeLogo = () => {
    const styles = welcome_logo_style();
    const logo = images.generic_images.logo.logo_mobile_default; 

    return (
        <View style={styles.welcomeContent}>
                <View style={styles.viewImage}>
                    <Image 
                        source={logo}
                        style={styles.imageYouMind}
                    />
                </View>
                <Text style={styles.welcomeText}>Bem-vindo!</Text>
            </View>
    )
}

export default WelcomeLogo;