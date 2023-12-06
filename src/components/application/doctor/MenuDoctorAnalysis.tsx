import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainAnalysis from './sub_components/analysis/MainAnalysis';

const Analysis = () => {
    return (
        <View style={styleAnalysis.container}>
            <MainAnalysis/>
        </View>
    );
};

const styleAnalysis = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});

export default Analysis;