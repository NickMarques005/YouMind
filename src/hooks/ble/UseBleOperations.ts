import { useCallback } from 'react';
import BleManager from 'react-native-ble-manager';
import { BleDeviceData, CharacteristicUUIDs, FormBleUser, MedicineBleData, QuestionsBleData, ServiceUUIDs } from 'types/ble/Ble_Types';
import { Buffer } from 'buffer';

interface WriteCharacteristicParams {
    peripheral: BleDeviceData;
    serviceUUIDs: ServiceUUIDs;
    serviceType: keyof ServiceUUIDs;
    characteristicUUIDs: CharacteristicUUIDs;
    data: FormBleUser | MedicineBleData | QuestionsBleData;
    sizeData: number;
}

interface ReadCharacteristicParams {
    peripheral: BleDeviceData;
    serviceUUIDs: ServiceUUIDs,
    serviceType: keyof ServiceUUIDs;
    characteristicUUIDs: CharacteristicUUIDs,
}

interface StartNotifyParams {
    peripheral: BleDeviceData;
    serviceUUIDs: ServiceUUIDs,
    serviceType: keyof ServiceUUIDs;
    characteristicUUIDs: CharacteristicUUIDs
}


export const useBleOperations = () => {

    //FUNÇÃO PARA ESCREVER CARACTERISTICAS E MANDAR DADOS PARA T WATCH:
    const writeCharacteristic = useCallback(async (
        {
            peripheral,
            serviceType,
            characteristicUUIDs,
            serviceUUIDs,
            data,
            sizeData
        }: WriteCharacteristicParams
    ) => {
        if (!peripheral) {
            console.log("No peripheral connected! \nNo characteristic WRITE!");
            return false;
        }

        console.log("\n********** WRITE PROPERTY ***********\n");
        const serializeData = JSON.stringify(data);
        const dataBuffer = Buffer.from(serializeData, 'utf-8');
        const dataArrayBuffer = Array.from(dataBuffer);

        try {
            await BleManager.retrieveServices(peripheral.id);
            for (const serviceUUID of serviceUUIDs[serviceType]) {
                await BleManager.write(peripheral.id, serviceUUID, characteristicUUIDs[serviceType], dataArrayBuffer, sizeData);
                console.log("Mensagem enviada ao dispositivo: ", serializeData);
            }
            return true;
        } catch (error) {
            console.error("Error writing data: ", error);
            return false;
        }
    }, []);

    //FUNÇÃO PARA LER E RECEBER OS DADOS ENVIADOS PELO T WATCH:
    const readCharacteristic = useCallback(async ({
        peripheral,
        serviceType,
        serviceUUIDs,
        characteristicUUIDs
    }: ReadCharacteristicParams) => {
        console.log("\n********** READ PROPERTY ***********\n");

        try {
            await BleManager.retrieveServices(peripheral.id);
            console.log('CHARACTERISTIC PART: ');
            console.log('ID: ', peripheral.id);

            for (const serviceUUID of serviceUUIDs[serviceType]) {
                try {
                    const readData = await BleManager.read(peripheral.id, serviceUUID, characteristicUUIDs[serviceType]);
                    console.log("CONSEGUIU LER A CHARACTERISTIC!");

                    const possibleJson = Buffer.from(readData).toString('utf-8');
                    try {
                        const jsonData = JSON.parse(possibleJson);
                        console.log(`INFO DE ${peripheral.name}: `, jsonData);
                        return jsonData;
                    } catch (error) {
                        
                        console.log(`INFO DE ${peripheral.name}: ` + possibleJson);
                        return possibleJson;
                    }
                } catch (error) {
                    console.log('Erro ao ler characteristic: ', error);
                }
            }
        } catch (err) {
            console.log('Erro ao recuperar serviços: ', err);
        }

        return null;
    }, []);

    const startNotify = useCallback(async ({
        peripheral,
        serviceUUIDs,
        serviceType,
        characteristicUUIDs
    }: StartNotifyParams) => {
        console.log("\n********** NOTIFY PROPERTY ***********\n");
        try {
            for (const serviceUUID of serviceUUIDs[serviceType]) {
                await BleManager.startNotification(peripheral.id, serviceUUID, characteristicUUIDs[serviceType]);
                console.log("Notificação iniciada no serviceUUID:", serviceUUID);
            }
            return true;
        } catch (error) {
            console.error("Erro ao iniciar notificações: ", error);
            return false;
        }
    }, []);

    return {
        writeCharacteristic,
        readCharacteristic,
        startNotify
    };
};