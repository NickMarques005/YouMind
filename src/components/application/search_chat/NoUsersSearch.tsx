import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { screenHeight } from '../../screen_size/Screen_Size';

function NoUsersSearch() {
    return (
        <View style={{ width: '100%', marginVertical: 60, alignItems: 'center', justifyContent: 'center', height: screenHeight * 0.3, gap: 30}}>
            
            <Image style={{width: 100, height: 100}} source={require('../../../assets/init/search/search_warning_icon.png')}/>
            <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>Nenhum resultado encontrado</Text>
        </View>
    )
}

export default NoUsersSearch;