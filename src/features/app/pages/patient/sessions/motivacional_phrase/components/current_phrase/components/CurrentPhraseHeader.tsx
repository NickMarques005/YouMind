import { responsiveSize } from '@utils/layout/Screen_Size';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface CurrentPhraseHeaderProps {
    onBackPress: () => void;
    onMotivationalPress: () => void;
}

const CurrentPhraseHeader = ({ onBackPress, onMotivationalPress }: CurrentPhraseHeaderProps) => {

    const iconSize = responsiveSize * 0.1;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
                <MaterialIcons name="arrow-back-ios" size={iconSize} color={"#fff"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onMotivationalPress} style={styles.iconButton}>
                <MaterialIcons name="format-quote" size={iconSize} color={"#fff"} />
            </TouchableOpacity>
        </View>
    );
};

export default CurrentPhraseHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    iconButton: {
        padding: '3%',
    },
});