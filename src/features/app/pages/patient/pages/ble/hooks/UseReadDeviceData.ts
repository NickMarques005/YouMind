import { UseBluetoothDevice } from "@features/app/providers/patient/BluetoothProvider";
import { useBleOperations } from "@hooks/ble/UseBleOperations";
import { useCallback } from "react";
import { BleDeviceData, CharacteristicUUIDs, ServiceUUIDs } from "types/ble/Ble_Types";

interface GetDeviceDataProps{
    device: BleDeviceData;
    serviceUUIDs: ServiceUUIDs;
    characteristicUUIDs: CharacteristicUUIDs;
}

interface UseReadDeviceDataProps {
    setCurrentDevice: React.Dispatch<React.SetStateAction<BleDeviceData | undefined>>;
}

export const useReadDeviceData = ({ setCurrentDevice }: UseReadDeviceDataProps) => {
    const { readCharacteristic } = useBleOperations();

    const getDeviceData = useCallback(async ({device, serviceUUIDs, characteristicUUIDs}: GetDeviceDataProps) => {
        const batteryData: string = await readCharacteristic({ peripheral: device, serviceUUIDs, serviceType: "device", characteristicUUIDs });
        
        if (batteryData) {
            const batteryLevel = parseInt(batteryData.replace('%', ''), 10);
            
            setCurrentDevice(prevDevice => {
                if (prevDevice) {
                    return { 
                        ...prevDevice, 
                        batteryLevel 
                    };
                }
                return {
                    id: device.id,
                    name: device.name,
                    rssi: device.rssi,
                    advertising: device.advertising,
                    batteryLevel
                };
            });
        }
    }, [readCharacteristic, setCurrentDevice])


    return { getDeviceData };
}