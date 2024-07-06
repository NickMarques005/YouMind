import React from 'react';
import { Image, TouchableOpacity, StyleSheet, ImageSourcePropType, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { CustomHeaderProps } from './types/type_custom_header';

const CustomHeader: React.FC<CustomHeaderProps> = ({
    leftButtonPress,
    leftButtonIcon,
    leftStyleButtonIcon,
    leftStyleImageIcon,
    rightButtonPress,
    rightButtonIcon,
    rightStyleButtonIcon,
    rightStyleImageIcon,
    headerImage,
    styleLogo,
    gradientColors,
    gradientStart = { x: 0.1, y: 0 },
    gradientEnd = { x: 1, y: 0 },
    disabledLeftButton,
    disabledRightButton
}: CustomHeaderProps) => {

    return (
        <LinearGradient colors={gradientColors ? gradientColors : ['transparent', 'transparent']} start={gradientStart} end={gradientEnd} style={styles.header}>
            <View style={styles.viewButton}>
                {leftButtonIcon && (
                    <TouchableOpacity disabled={disabledLeftButton} onPress={leftButtonPress} style={leftStyleButtonIcon}>
                        <Image source={leftButtonIcon} style={leftStyleImageIcon} />
                    </TouchableOpacity>
                )}
            </View>
            {headerImage && (
                <View style={styles.viewImage}>
                    <Image source={headerImage} style={[styleLogo]} />
                </View>
            )}
            <View style={styles.viewButton}>
                {rightButtonIcon && (
                    <TouchableOpacity disabled={disabledRightButton} onPress={rightButtonPress} style={rightStyleButtonIcon}>
                        <Image source={rightButtonIcon} style={rightStyleImageIcon} />
                    </TouchableOpacity>
                )}
            </View>

        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        flexDirection: 'row',
        top: 0,
        width: screenWidth,
        height: screenHeight * 0.13,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 18,
        zIndex: 10,
    },
    viewImage: {
        maxHeight: '100%',
        width: '30%',
        padding: '1%',
        alignItems: 'center',
    },
    viewButton: {
        minWidth: '10%',
        maxHeight: '100%',
    }
});

export default CustomHeader;