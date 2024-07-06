import { useState, useCallback } from 'react';
import BleManager from 'react-native-ble-manager';
import { DeviceState, ServiceUUIDs } from 'types/ble/Ble_Types';

interface UseBleScannerProps {
    setDeviceState: React.Dispatch<React.SetStateAction<DeviceState>>;
    isScanning: boolean;
    setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;
}

const useBLEScanner = ({ setDeviceState, isScanning, setIsScanning }: UseBleScannerProps) => {

    const scanTimeout = 15000;

    const scanDevices = (serviceUUIDs: ServiceUUIDs) => {
        if (!isScanning) {
            BleManager.scan(serviceUUIDs["form"], 15, true)
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