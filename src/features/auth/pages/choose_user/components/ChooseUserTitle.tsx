import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import images from '@assets/images';
import { choose_title_style } from '../styles/ChooseUserTitle';

const ChooseUserTitle = () => {

    const styles = choose_title_style();

    return (
        <View style={styles.chooseUser_TitleContainer}>
            <Image style={styles.chooseUser_imgBg} source={images.generic_images.choose.choose_bg} />
            <View style={styles.chooseUser_titleView}>
                <Text style={styles.chooseUser_titleText}>Quem é você?</Text>
                <View style={styles.chooseUser_pensativeIconView}>
                    <LottieView style={{ width: '100%', height: '100%' }} source={images.animations.pensative_icon} autoPlay loop />
                </View>
            </View>
        </View>
    );
};

export default ChooseUserTitle;