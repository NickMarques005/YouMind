import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { screenWidth } from '@utils/layout/Screen_Size';

interface CallHelpButtonProps{
    onPress: () => void;
    helpButton: any;
}

const CallHelpButton = ({ onPress, helpButton}: CallHelpButtonProps) => {
    
    
    return (
        <TouchableOpacity onPress={onPress} style={styles.ViewButtonHelp}>
            <Image style={styles.ButtonHelp} source={helpButton} />
        </TouchableOpacity>
    )
}

export default CallHelpButton

const styles = StyleSheet.create({
    ViewButtonHelp: {
        bottom: '-40%',
        elevation: 10,
        borderRadius: screenWidth * 0.2,
        padding: 4,
        backgroundColor: '#f2dcee'
    },
    ButtonHelp: {
        width: 80,
        height: 80,
    },
});