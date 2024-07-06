/* eslint-disable no-bitwise */
import {useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';

import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';

type VoidCallback = (result: boolean) => void;

interface BluetoothLowEnergyApi {
    requestPermissions(cb: VoidCallback): Promise<void>;
}

function useBLE(): BluetoothLowEnergyApi {
    
    const requestPermissions = async (cb: VoidCallback) => {
        if (Platform.OS === 'android') {
          const apiLevel = await DeviceInfo.getApiLevel();
          if (apiLevel < 31) {
            console.log('APILEVEL < 31');
            console.log(apiLevel);
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Permissão de localização',
                message: 'Bluetooth Low Energy precisa de acesso à sua localização',
                buttonNeutral: 'Ask Later',
                buttonNegative: 'Cancelar',
                buttonPositive: 'OK',
              },
            );
            cb(granted === PermissionsAndroid.RESULTS.GRANTED);
          } else {
            console.log('APILEVEL >= 31');
            console.log(apiLevel);
            const result = await requestMultiple([
              PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
              PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
              PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ]);
    
            const isAllPermissionsGranted =
              result['android.permission.BLUETOOTH_CONNECT'] ===
                PermissionsAndroid.RESULTS.GRANTED &&
              result['android.permission.BLUETOOTH_SCAN'] ===
                PermissionsAndroid.RESULTS.GRANTED &&
              result['android.permission.ACCESS_FINE_LOCATION'] ===
                PermissionsAndroid.RESULTS.GRANTED;
    
            cb(isAllPermissionsGranted);
            console.log('PERMISSAO CONCEDIDA!');
          }
        } else {
          cb(true);
        }
      };

    return{
        requestPermissions
    };
}

export default useBLE;