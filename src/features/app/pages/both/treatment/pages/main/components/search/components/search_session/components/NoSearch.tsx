import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { screenHeight } from '@utils/layout/Screen_Size';
import images from '@assets/images';

const NoSearch = () => {

    const warningIcon = images.generic_images.search.search_warning_icon;

    return (
        <View style={{ width: '100%', marginVertical: 60, alignItems: 'center', justifyContent: 'center', height: screenHeight * 0.3, gap: 30}}>
            <Image style={{width: 100, height: 100}} source={warningIcon}/>
            <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>Nenhum resultado encontrado</Text>
        </View>
    )
}

export default NoSearch;