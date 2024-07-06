import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const NoLatestMedications = () => {
    return (
        <View style={{flex: 1, opacity: 0.7, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{gap: 7}}>
                <Text style={{fontSize: 16, color: '#7f97ad', fontWeight: '500'}}>Nenhum dado encontrado</Text>
            </View>
        </View>
    )
}

export default NoLatestMedications;

const styles = StyleSheet.create({})