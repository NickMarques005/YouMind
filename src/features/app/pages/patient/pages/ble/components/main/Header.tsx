import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import images from '@assets/images';
import { screenHeight, screenWidth } from '@utils/layout/Screen_Size';
import { DeviceState } from 'types/ble/Ble_Types';
import DefaultLoading from '@components/loading/DefaultLoading';

interface BleHeaderProps {
    deviceState: DeviceState;
    deviceName?: string;
    isScanning: boolean;
    connectionLoading: boolean;
}

const Header = ({ connectionLoading, deviceState, deviceName, isScanning }: BleHeaderProps) => {

    const bleHeaderBg = images.app_patient_images.bluetooth.ble_background;

    const renderDevice = () => {

        switch (deviceState) {
            case 'deviceOff':
                console.log(deviceState);
                return <Image
                    source={images.app_patient_images.bluetooth.twatch_device_off}
                    style={styles.deviceDesign_Image}
                />;
            case 'deviceScanning':
                console.log(deviceState);
                return <Image
                    source={images.app_patient_images.bluetooth.twatch_scanning}
                    style={styles.deviceDesign_Image}
                />;
            case 'deviceOn':
                console.log(deviceState);
                return <Image
                    source={images.app_patient_images.bluetooth.twatch_device_on}
                    style={styles.deviceDesign_Image}
                />;
            default:
                console.log("Erro no estado do dispositivo: ", deviceState);
                return null;
        }
    }

    return (
        <ImageBackground source={bleHeaderBg}
            style={styles.backgroundImage_BluetoothTitle}>
            <View style={styles.header_Bluetooth}>

                <View style={styles.deviceSection_View}>

                    <View style={styles.deviceBluetooth_View}>
                        <View style={styles.deviceDesign_View}>
                            {
                                renderDevice()
                            }
                        </View>

                        <View style={styles.deviceInfo_View}>

                        </View>
                    </View>


                    <View style={styles.deviceState_View}>
                        <Text style={styles.deviceState_Text}>
                            {
                                connectionLoading ?
                                    <DefaultLoading size={30} color={'white'}/>
                                    :
                                    deviceState === 'deviceOff' && !isScanning
                                        ? 'Nenhum Dispositivo Conectado'
                                        : deviceState === 'deviceOn' && !isScanning
                                            ? 'Dispositivo: ' + deviceName
                                            : deviceState === 'deviceScanning' && isScanning
                                                ? 'Escaneando...'
                                                : ''
                            }
                        </Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default Header

const styles = StyleSheet.create({
    backgroundImage_BluetoothTitle: {
        position: 'absolute',
        width: '100%',
        height: screenHeight * 0.6,
        resizeMode: 'center',
    },
    header_Bluetooth: {
        width: screenWidth,
        height: screenHeight * 0.4,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
    },
    deviceSection_View: {
        width: screenWidth * 0.8,
        height: screenHeight * 0.35,
        alignItems: 'center',
        justifyContent: 'center',

    },
    deviceBluetooth_View: {
        flexDirection: 'column',
        width: '100%',
        height: screenHeight * 0.22,
        marginBottom: 20,
        alignItems: 'center'
    },
    deviceDesign_View: {
        width: screenWidth,
        height: screenHeight * 0.22,
        alignItems: 'center'

    },
    deviceDesign_Image: {
        width: '80%',
        height: '100%'
    },
    deviceInfo_View: {

    },
    deviceState_View: {
        width: screenWidth,
        alignItems: 'center',
        height: '15%',
        justifyContent: 'center'
    },
    deviceState_Text: {
        textTransform: 'uppercase',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});