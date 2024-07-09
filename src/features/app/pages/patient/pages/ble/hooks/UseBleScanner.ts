import { useState, useCallback } from 'react';
import BleManager from 'react-native-ble-manager';
import { DeviceState, ServiceUUIDs } from 'types/ble/Ble_Types';

interface UseBleScannerProps {
    setDeviceState: React.Dispatch<React.SetStateAction<DeviceState>>;
    isScanning: boolean;
    setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;
    handleRequestBluetoothPermissions: () => Promise<boolean>;
    bluetoothConnected: boolean;
}

const useBLEScanner = ({ setDeviceState, isScanning, setIsScanning, handleRequestBluetoothPermissions, bluetoothConnected }: UseBleScannerProps) => {

    const scanTimeout = 15;

    const scanDevices = async (serviceUUIDs: ServiceUUIDs) => {
        if (!bluetoothConnected) {
            const isGranted = await handleRequestBluetoothPermissions();
            if (!isGranted) {
                console.log('Permissões Bluetooth não concedidas, não é possível escanear dispositivos.');
                return;
            }
        }
        
        if (!isScanning) {
            BleManager.scan(serviceUUIDs["form"], scanTimeout, true)
                .then(() => {
                    setIsScanning(true);
                    setDeviceState('deviceScanning');
                    console.log('Escaneando...');
                })
                .catch(err => {
                    console.error('Erro ao escanear dispositivos: ', err);
                });
        }
    }

    return { scanDevices };
};

export default useBLEScanner;