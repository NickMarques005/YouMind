import { UseBluetoothDevice } from '@features/app/providers/patient/BluetoothProvider';
import { UseForm } from '@features/app/providers/sub/UserProvider';
import { useBleOperations } from '@hooks/ble/UseBleOperations';
import { getFormBleUser } from '@utils/ble/GetBleFormData';
import { useState, useCallback, useEffect } from 'react';
import BleManager from 'react-native-ble-manager';
import { BleDeviceData, DeviceState } from 'types/ble/Ble_Types';
import { UserData } from 'types/user/User_Types';
import { useReadDeviceData } from './UseReadDeviceData';

interface UseBleConnectionProps {
    setDiscoveredPeripherals: React.Dispatch<React.SetStateAction<Map<any, any> | undefined>>;
    setDeviceState: React.Dispatch<React.SetStateAction<DeviceState>>;
    setCurrentDevice: React.Dispatch<React.SetStateAction<BleDeviceData | undefined>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    HandleResponseAppError: (value: string) => void;
    handleRequestBluetoothPermissions: () => Promise<boolean>;
    userData?: UserData;
}

export const useBleConnection = ({ 
    userData, HandleResponseAppError, 
    handleRequestBluetoothPermissions, setCurrentDevice, 
    setDeviceState, setDiscoveredPeripherals, setLoading }: UseBleConnectionProps) => {
    const { writeCharacteristic, readCharacteristic } = useBleOperations();
    const { serviceUUIDs, characteristicUUIDs, bluetoothConnected } = UseBluetoothDevice();
    const { getDeviceData } = useReadDeviceData({ setCurrentDevice });

    const handleDeviceConnection = useCallback(async (device: BleDeviceData) => {
        if(!bluetoothConnected)
        {
            handleRequestBluetoothPermissions();
        }
        
        setLoading(true);
        try {
            await BleManager.connect(device.id);
            const bleUser = getFormBleUser(userData);
            await writeCharacteristic({ peripheral: device, serviceUUIDs, serviceType: "form", characteristicUUIDs, data: bleUser, sizeData: 120 });
            await getDeviceData({ device, serviceUUIDs, characteristicUUIDs });
            setCurrentDevice(prevDevice => {
                if (prevDevice) {
                    return {
                        ...prevDevice,
                        ...device
                    };
                }
                return device;
            });
            setDiscoveredPeripherals(undefined);
        } catch (err) {
            const error = err as Error;
            console.error('Erro ao conectar com dispositivo: ', err);
            HandleResponseAppError(`Falha na conexão com o dispositivo T-Watch: ${error}`);
        }
        finally {
            setLoading(false);
        }
    }, []);

    const disconnectFromDevice = useCallback(async (deviceId: string) => {
        setLoading(true);
        try {
            await BleManager.disconnect(deviceId);
            setDiscoveredPeripherals(prev => {
                const newMap = new Map(prev);
                newMap.delete(deviceId);
                return newMap;
            });
            setCurrentDevice(undefined);
            setDeviceState('deviceOff');
        } catch (err) {
            const error = err as Error;
            console.error('Error disconnecting: ', err);
            HandleResponseAppError(`Falha ao desconectar do dispositivo T-Watch: ${error}`);
        }
        finally {
            setLoading(false);
        }
    }, []);

    

    return { handleDeviceConnection, disconnectFromDevice };
};