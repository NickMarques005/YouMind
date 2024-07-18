import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { WelcomeMenuSelectOption } from '../WelcomeSession';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import MenuOption from './WelcomeMenuOption';
import LinearGradient from 'react-native-linear-gradient';

interface WelcomeMenuProps {
    handleSelectOption: (option: WelcomeMenuSelectOption) => void;
    goBackToHome: () => void;
    menuOptions: WelcomeMenuSelectOption[];
    youMindLogo: any;
    backIconSize: number;
}

const WelcomeMenu = ({ handleSelectOption, goBackToHome, menuOptions, youMindLogo, backIconSize }: WelcomeMenuProps) => {

    const logoSize = responsiveSize * 0.32;

    return (
        <LinearGradient
            colors={['#69adc2', '#1d2338']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }} style={{ flex: 1, }}>
            <View style={[styles.header, { height: screenHeight * 0.35, width: '100%', }]}>
                <View style={{ width: '100%', height: '25%', }}>
                    <TouchableOpacity onPress={goBackToHome}>
                        <MaterialIcons name="arrow-back" size={backIconSize} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', flex: 1, }}>
                    <Image source={youMindLogo} style={{ width: logoSize, height: logoSize, borderRadius: logoSize }} />
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Como Funciona?</Text>
                </View>
                <View style={styles.menu}>
                    {
                        menuOptions.map((option) => (
                            <MenuOption key={option} option={option} onSelect={handleSelectOption} />
                        ))
                    }
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        justifyContent: 'space-between',
        padding: '6%',
    },
    content: {
        flex: 1,
        paddingHorizontal: '8%',
        backgroundColor: '#e4ebf5',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35
    },
    titleView: {
        width: '100%',
        paddingVertical: '15%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#1d2338'
    },
    menu: {
        flex: 1,
        paddingBottom: '5%',
    }
});

export default WelcomeMenu;