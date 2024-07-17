import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { WelcomeMenuSelectOption } from '../WelcomeSession';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { responsiveSize, screenHeight } from '@utils/layout/Screen_Size';
import MenuOption from './WelcomeMenuOption';

interface WelcomeMenuProps {
    handleSelectOption: (option: WelcomeMenuSelectOption) => void;
    goBackToHome: () => void;
    menuOptions: WelcomeMenuSelectOption[];
    youMindLogo: any;
}


const WelcomeMenu = ({ handleSelectOption, goBackToHome, menuOptions, youMindLogo }: WelcomeMenuProps) => {

    const logoSize = responsiveSize * 0.3;

    return (
        <View style={{ flex: 1, }}>
            <View style={[styles.header, { height: screenHeight * 0.35, width: '100%', }]}>
                <View style={{ width: '100%', height: '40%' }}>
                    <TouchableOpacity onPress={goBackToHome}>
                        <MaterialIcons name="arrow-back" size={24} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Image source={youMindLogo} style={{ width: logoSize, height: logoSize, borderRadius: logoSize, }} />
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Instruções</Text>
                </View>
                <View style={styles.menu}>
                    {menuOptions.map((option) => (
                        <MenuOption key={option} option={option} onSelect={handleSelectOption} />
                    ))}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5%',
    },
    content: {
        flex: 1,
        paddingHorizontal: '5%',
    },
    titleView: {
        width: '100%',
        paddingVertical: '10%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    menu: {
        flex: 1
    }
});

export default WelcomeMenu;