import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BleDeviceData } from 'types/ble/Ble_Types'
import images from '@assets/images'
import { BleScreenName } from 'types/navigation/Navigation_Types';
import BatteryIcon from '../main/BatteryIcon';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import DeviceOptions from './DeviceOptions';
import LinearGradient from 'react-native-linear-gradient';
import { DeviceOption } from 'types/ble/DeviceOption_Types';
import { useDeviceOptions } from '../../hooks/UseBleDeviceOptions';
import DefaultLoading from '@components/loading/DefaultLoading';

interface DeviceInfoProps {
    currentDevice: BleDeviceData | undefined;
    bleNavigation: (screenName: BleScreenName) => void;
    disconnectFromDevice: (deviceId: string) => Promise<void>;
    loading: boolean;
}

const DeviceInfo = ({ bleNavigation, currentDevice, disconnectFromDevice, loading }: DeviceInfoProps) => {
    const { options, prepareDeviceOptions } = useDeviceOptions();
    const [currentOption, setCurrentOption] = useState<DeviceOption | null>(null);

    useEffect(() => {
        prepareDeviceOptions();
    }, []);

    const handleOptionPress = (option: DeviceOption) => {
        setCurrentOption(option);
    };

    const handleBackPress = () => {
        setCurrentOption(null);
    };

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ justifyContent: 'space-between', minHeight: '68.5%', gap: screenHeight * 0.04 }}>

            <View style={styles.optionsView}>
                <DeviceOptions loading={loading} options={options} currentOption={currentOption} handleBackPress={handleBackPress} handleOptionPress={handleOptionPress} />
            </View>

            {
                !currentOption && currentDevice &&
                <LinearGradient
                    colors={['#d6698b', '#8f4571', '#6c3b75']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }} style={styles.disconnectView}>
                    <TouchableOpacity disabled={loading} onPress={() => disconnectFromDevice(currentDevice.id)} style={[styles.disconnectButton, {opacity: loading ? 0.7 : 1}]}>
                        {
                            loading ?
                            <DefaultLoading size={30} color={'#e6b5dd'}/>
                            :
                            <Text style={styles.disconnectText}>DESCONECTAR DISPOSITIVO</Text>
                        }
                    </TouchableOpacity>
                </LinearGradient>
            }
        </ScrollView>
    )
}

export default DeviceInfo;

const styles = StyleSheet.create({
    infoContainer: {
        flex: 1,
        backgroundColor: 'blue'
    },
    optionsView: {
        width: '100%',
        minHeight: '50%',
        paddingTop: screenHeight * 0.03
    },
    disconnectView: {
        width: '100%',
        height: screenHeight * 0.15,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    disconnectButton: {

    },
    disconnectText: {
        fontSize: 18,
        color: 'white',
        fontWeight: '800'
    }
});