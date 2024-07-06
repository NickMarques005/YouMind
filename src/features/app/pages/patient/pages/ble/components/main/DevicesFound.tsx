import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size'
import DeviceDiscoveredList from './DeviceDiscoveredList'
import { BleDeviceData, ServiceUUIDs } from 'types/ble/Ble_Types'
import { UseBluetoothDevice } from '@features/app/providers/patient/BluetoothProvider'
import DefaultLoading from '@components/loading/DefaultLoading'
import images from '@assets/images'

interface DevicesFoundProps {
    bleOn: boolean;
    handleScan: (serviceUUIDs: ServiceUUIDs) => void;
    peripherals?: Map<string, BleDeviceData>;
    connectToDevice: (device: BleDeviceData) => void;
    isScanning: boolean;
    connectionLoading: boolean;
}

const DevicesFound = ({ connectionLoading, peripherals, isScanning, bleOn, handleScan, connectToDevice }: DevicesFoundProps) => {

    const { serviceUUIDs } = UseBluetoothDevice();
    const noDevicesIcon = images.app_patient_images.bluetooth.no_devices;
    const searchDevicesIcon = images.app_patient_images.bluetooth.search_devices;

    return (
        <View style={styles.devicesFoundContainer}>
            <LinearGradient colors={['rgba(76, 46, 117, 0.1)', '#9322b3', '#e384c2']} style={styles.devices_View}>
                {
                    isScanning ?
                        <DefaultLoading size={40} color={'white'} />
                        :
                        peripherals && !isScanning ?
                            <View style={styles.foundDevicesMain}>
                                <DeviceDiscoveredList peripherals={peripherals} connectToDevice={connectToDevice} connectionLoading={connectionLoading} />
                            </View>
                            :
                            <View style={styles.noDevicesView}>
                                <Image style={[styles.noDevicesImg, { opacity: isScanning ? 0.4 : 0.9 }]} source={isScanning ? searchDevicesIcon : noDevicesIcon} />
                                <Text style={styles.noDevicesText}>Procure por seu YouMind T-Watch para aprimorar seu tratamento</Text>
                            </View>
                }
            </LinearGradient>
            <LinearGradient colors={['#e384c2', '#c62cd1', '#9322b3']} style={styles.containerbuttonConnect}>
                <TouchableOpacity disabled={isScanning || connectionLoading} onPress={() => handleScan(serviceUUIDs)} style={[styles.buttonConnect, { opacity: isScanning || connectionLoading ? 0.2 : 1 }]}>
                    {
                        <Text style={styles.textConnect}>PROCURAR</Text>
                    }
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

export default DevicesFound;

const styles = StyleSheet.create({
    devicesFoundContainer: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 25,
        paddingBottom: 25,
    },
    devices_View: {
        width: '110%',
        height: screenHeight * 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: screenWidth * 0.3,
        borderTopLeftRadius: screenWidth * 0.3
    },
    foundDevicesMain: {
        width: '90%',
        height: '80%',
        gap: 20,
        paddingVertical: '5%',
        justifyContent: 'center',
    },
    buttonConnect: {
        width: screenWidth * 0.75,
        height: screenHeight * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    textConnect: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    containerbuttonConnect: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: screenWidth * 0.75,
        height: screenHeight * 0.1,
        borderRadius: 50,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 7,
        shadowRadius: 3.84,
        elevation: 10,
        marginVertical: 15,
    },
    textBluetooth: {
        color: '#841091'
    },
    noDevicesView: {
        width: '60%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    noDevicesText: {
        fontSize: 16,
        color: 'rgba(226, 213, 245, 0.6)',
        textAlign: 'center',
    },
    noDevicesImg: {
        opacity: 0.6,
        width: '35%',
        height: '35%',
        resizeMode: 'contain'
    }
})