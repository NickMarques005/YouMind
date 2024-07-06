import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';

interface DefaultLoadingProps {
    size?: number | 'small' | 'large'; 
    color?: string; 
    style?: ViewStyle; 
}

const DefaultLoading: React.FC<DefaultLoadingProps> = ({ size = 'large', color = '#0000ff', style }) => {
    return (
        <View style={[loading_style.container, style]}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
};

const loading_style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default DefaultLoading;