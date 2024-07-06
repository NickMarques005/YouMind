import images from '@assets/images';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { DeviceOption } from 'types/ble/DeviceOption_Types';
import { useDeviceOptions } from '../../hooks/UseBleDeviceOptions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface DeviceOptionsProps {
    options: DeviceOption[];
    currentOption: DeviceOption | null;
    handleBackPress: () => void;
    handleOptionPress: (option: DeviceOption) => void;
    loading: boolean;
}

const DeviceOptions: React.FC<DeviceOptionsProps> = ({
    options, 
    currentOption, 
    handleBackPress, 
    handleOptionPress,
    loading }) => {
    
    return (
        <View style={styles.container}>
            {currentOption ? (
                <>
                    <View style={styles.headerOption}>
                        <View style={styles.titleView}>
                            <Text style={styles.optionTitle}>{currentOption.label}</Text>
                        </View>

                        <TouchableOpacity disabled={loading} style={styles.backButton} onPress={handleBackPress}>
                            <FontAwesome name="chevron-left" size={16} color="#78717a" />
                            <Text style={styles.backText}>Voltar</Text>
                        </TouchableOpacity>
                    </View>

                    {currentOption.subOptions?.map((subOption, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.optionButton}
                            onPress={() => subOption.action()}
                            disabled={loading}
                        >
                            <Text style={styles.optionText}>{subOption.label}</Text>
                        </TouchableOpacity>
                    ))}
                </>
            ) : (
                <>
                    {options.map((option, index) => (
                        <TouchableOpacity key={index} style={styles.optionButton} onPress={() => !option.action ? handleOptionPress(option) : option.action}>
                            <Text style={styles.optionText}>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '7%',
    },
    headerOption: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    titleView: {
        maxWidth: '75%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    optionButton: {
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    optionText: {
        fontSize: 18,
        color: 'rgba(162, 148, 179, 1)'
    },
    backIconView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 5,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    backIcon: {
        width: 30,
        height: 30,
    },
    backText: {
        color: '#78717a',
        fontSize: 16,
    },
    optionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#563863'
    },
    subOptionButton: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    subOptionText: {
        fontSize: 16,
        marginLeft: 20,
    },
});

export default DeviceOptions;