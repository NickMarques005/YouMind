import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainNotepad from './sub_components/notepad/MainNotepad';

const Notepad = () => {
    return (
        <View style={styles.container}>
            <MainNotepad/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});

export default Notepad;