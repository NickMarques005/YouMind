import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import {
  View, Linking, ActivityIndicator, ScrollView,
  ToastAndroid, Image, FlatList, Dimensions, ImageBackground, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView
} from 'react-native';
import { Platform, NativeModules, NativeEventEmitter, PermissionsAndroid } from 'react-native';
//import { BluetoothContext } from './BluetoothConnection';
import BleManager from 'react-native-ble-manager';
import { LinearGradient } from 'expo-linear-gradient';
import { Buffer } from 'buffer';
import { BluetoothContext } from '../../../providers/BluetoothProvider';

import useBLE from '../../../hooks/ble/UseBLE';
import { UseAuth } from '../../../providers/AuthenticationProvider';
import { UseForm } from '../../../providers/UserProvider';

//retorna as dimensões do dispositivo 
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

let notificationListener: any;

const Patient_Bluetooth = () => {

  const { formData } = UseForm();

  //PERMISSÕES
  const {
    requestPermissions
  } = useBLE();

  //SERVIÇOS E CARACTERISTICAS BLE
  const serviceUUIDs = { form: ["4fafc201-1fb5-459e-8fcc-c5c9c331914b"], question: ["fc650203-7530-48cc-8e88-f654ffa128dc"], device: ["5c04ef51-cbb5-4d0c-b3d6-4db7ae66309f"], medicine: ["681fc156-1b1f-4f6d-b846-7619009dd650"] }; //ID do dispositivo
  const characteristicUUID = { form: "beb5483e-36e1-4688-b7f5-ea07361b26a8", question: "5c8a65ab-7c53-4a38-b768-92a04f66a13d", device: "6e400002-b5a3-f393-e0a9-e50e24dcca9e", medicine: "95e4d80c-9899-461a-b37d-ecb64b852042" };

  /*************************
  *  DADOS PARA TESTES
  ************************/

  const fullName = formData.name;
  const [firstName, ...lastNameArray] = fullName.split(' ');
  const lastName = lastNameArray.join(' ');

  //Dados de Usuario
  const [formBLEData, setFormData] = useState({
    name: firstName,
    surname: lastName,
    email: formData.email,
  });

  //Dados de remédios
  const [medicineData, setMedicineData] = useState({
    notification: "Notificaçao de remedio!",
    medicine: "Remedio especifico",
    time: "8:00"
  });

  //Dados de questionarios
  const [questionnaireData, setQuestionnaireData] = useState({
    perguntas: [
      {
        question1: {
          type: 1,
          info: "Esta se sentindo bem?",
          answers: ["sim", "nao"]
        }
      },
      {
        question2: {
          type: 1,
          info: "Tem comido direito ultimamente?",
          answers: ["sim", "nao"]
        }
      },
      {
        question3: {
          type: 3,
          info: "Digite seu peso"
        }
      },
      {
        question4: {
          type: 1,
          info: "Tem interagido de forma adequada com outras pessoas nos ultimos dias?",
          answers: ["sim", "nao"]
        }
      },
    ],
    especialista: "Carlos Alberto Rodrigues"
  })

  /*************************
  *    Hooks UseState
  ************************/


  const [peripheralData, setPeripheralData] = useState({});
  const [peripheralId, setPeripheralId] = useState("");
  const [BLEConnected, setBLEConnected] = useState(false);
  const [deviceState, setDeviceState] = useState('deviceOff');
  const [isScanning, setIsScanning] = useState(false);
  const [hasDevice, setHasDevice] = useState(false);
  const [deviceName, setDeviceName] = useState("");

  const [deviceInfoMap, setDeviceInfoMap] = useState({});
  const [isBluetoothOn, setIsBluetoothOn] = useState(false);
  const { bluetoothConnected, setBluetoothConnected } = useContext(BluetoothContext) || { bluetoothConnected: false, setBluetoothConnected: () => { } };

  console.log("BLE está: ", bluetoothConnected);

  const [peripherals, setPeripherals] = useState(new Map());


  /*************************
  *    FUNÇÕES BLE
  ************************/

  const obtainRSSI = () => {
    console.log("OBTAIN RSSI!");
    if (bluetoothConnected) {
      const targetDevice = Array.from(peripherals.values()).find(peripheral => peripheral.name === deviceName);
      console.log(targetDevice);

      if (targetDevice) {
        const deviceId = targetDevice.id;
        console.log(deviceId);
        BleManager.readRSSI(deviceId)
          .then(rssi => {
            console.log(`RSSI do dispositivo ${deviceName}: ${rssi}`);
            updateDeviceInfo(deviceId, { rssi });
          })
          .catch(err => {
            console.log("Erro ao obter RSSI: ", err);
          })
      }
    }
  };


  //FUNÇÃO PARA TRATAMENTO DE DISPOSITIVOS ENCONTRADOS:
  const handleDiscoverPeripheral = () => {
    return new Promise((resolve, reject) => {
      BleManager.getDiscoveredPeripherals()
        .then((peripheralsArray) => {
          resolve(peripheralsArray);
        })
        .catch((error) => {
          reject(error);

        });
    });
  }

  //FUNÇÃO DO ESCANEAMENTO DE DEVICES BLUETOOTH:
  const scanDevices = () => {

    if (!isScanning) {

      BleManager.scan(serviceUUIDs["form"], 15, true)
        .then(() => {
          console.log('Scanning...');
          setIsScanning(true);
          setDeviceState('deviceScanning');
        })
        .catch((err) => {
          console.error('Error scanning devices: ', err);
        });
    }
  };

  //FUNÇÃO PARA SE CONECTAR AO DISPOSITIVO:
  //connectToDevice -> Conectar/Desconectar ao Dispositivo

  const connectToDevice = (peripheral: any) => {
    console.log('NAME: ', peripheral.id)
    console.log("DISPOSITIVO CONEXÃO: ", peripheral.connected)
    if (peripheral.connected) {
      BleManager.disconnect(peripheral.id).then(() => {
        peripheral.connected = false;
        notificationListener.remove();
        setBLEConnected(false);
        setBluetoothConnected(false);
        setDeviceState('deviceOff');
        setDeviceInfoMap(prevDeviceInfoMap => {
          const newDeviceInfoMap = { ...prevDeviceInfoMap };
          delete newDeviceInfoMap[peripheral.id];
          return newDeviceInfoMap;
        });
        setDeviceName("");
        console.log("DEVICE NAME: ", deviceName);
        alert(`Desconectado do dispositivo ${peripheral.name}`);

      }).catch((error) => console.log(error));

      console.log(`DESCONECTADO DO DISPOSITIVO ${peripheral.name}`);
    }
    else {
      console.log('UUID: ', peripheral.serviceUUIDs);
      BleManager.connect(peripheral.id)
        .then(() => {
          let peripheralResponse = peripherals.get(peripheral.id);
          if (peripheralResponse) {
            peripheral.connected = true;
            peripherals.set(peripheral.id, peripheralResponse);
            setBLEConnected(true);
            setBluetoothConnected(true);
            setDeviceState('deviceOn');
            setDeviceName(peripheral.name);
            setDeviceInfoMap(prevDeviceInfoMap => ({
              ...prevDeviceInfoMap,
              [peripheral.id]: {
                name: peripheral.name,
                battery: "",
              }
            }));
            setPeripheralData(peripheral);
            setPeripheralId(peripheral.id);
            setPeripherals(new Map(peripherals));
            console.log("DEVICE NAME: ", deviceName);
          }
          alert(`Conectado ao ${peripheral.name}`);
          console.log(`CONECTADO AO DISPOSITIVO ${peripheral.name}`);
          writeCharacteristicValue(peripheral, serviceUUIDs, "form", characteristicUUID, formBLEData, 120);
          writeCharacteristicValue(peripheral, serviceUUIDs, "question", characteristicUUID, questionnaireData, 500);
          readCharacteristicValue(peripheral, serviceUUIDs, "device", characteristicUUID);
          writeCharacteristicValue(peripheral, serviceUUIDs, "medicine", characteristicUUID, medicineData, 200);
          startNotify(peripheral, serviceUUIDs, "question", characteristicUUID);
        })
        .catch((error) => {
          console.log('Error: ', error);
          console.log('UUID: ', peripheral.serviceUUIDs);
        });
    }
  }


  //FUNÇÃO PARA TRATAR E ARMAZENAR AS INFORMAÇÕES ENVIADAS PELO T WATCH:
  const updateDeviceInfo = (deviceId: string, info: any) => {
    setDeviceInfoMap(prevDeviceInfoMap => ({
      ...prevDeviceInfoMap,
      [deviceId]: {
        ...prevDeviceInfoMap[deviceId],
        ...info
      }
    }));
  };

  //FUNÇÃO PARA ESCREVER CARACTERISTICAS E MANDAR DADOS PARA T WATCH:
  const writeCharacteristicValue = async (peripheral, servUUID, serviceType, characteristicUUID, data, sizeData) => {

    if (!peripheral) {
      console.log("No peripheral connected! \nNo characteristic WRITE!");
      return;
    }
    console.log("\n********** WRITE PROPERTY ***********\n");
    console.log("PERIPHERAL: ", peripheral);
    console.log(servUUID[serviceType]);
    console.log(characteristicUUID[serviceType]);
    console.log(data);

    //Conversão de objeto para JSON string:
    const serializeData = JSON.stringify(data);
    //Converção de JSON string para um Array Buffer:
    const dataBuffer = Buffer.from(serializeData, 'utf-8');

    //Conversão para Array of Numbers: 
    const dataArray = Array.from(dataBuffer);

    servUUID[serviceType].forEach(serviceUUID => {
      BleManager.retrieveServices(peripheral.id)
        .then((peripheralInfo) => {
          //console.log("Peripheral info:", peripheralInfo);
          BleManager.write(peripheral.id, serviceUUID, characteristicUUID[serviceType], dataArray, sizeData)
            .then((data) => {
              console.log("MENSAGEM MANDADA AO DISPOSITIVO: ", serializeData);
              /*if (serviceType == "question") {
                BleManager.startNotification(peripheral.id, serviceUUID, characteristicUUID[serviceType])
                  .then(() => {
                    console.log("Notify Answer started!");
                  })
                  .catch((error) => {
                    console.log("Error starting notification: ", error);
                  })
              }*/
            })
            .catch((error) => {
              console.log('Error writing data: ', error);
              console.log("BUFFER DATA: ", serializeData);
            });
        }).catch((error) => {
          console.log("Error retrieving services: ", error);
          console.log('DATA: ', serializeData);
        });
    });
  };

  //FUNÇÃO PARA LER E RECEBER OS DADOS ENVIADOS PELO T WATCH:
  const readCharacteristicValue = async (peripheral, servUUID, serviceType, characteristicUUID) => {
    //const device = Array.from(peripherals.values())[0]; // Aqui estou assumindo que você deseja ler a characteristic do primeiro dispositivo encontrado, altere conforme necessário
    console.log("\n********** READ PROPERTY ***********\n");

    console.log('CHARACTERISTIC PART: ');
    console.log('ID: ', peripheral.id);

    servUUID[serviceType].forEach(serviceUUID => {
      BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
        BleManager.read(peripheral.id, serviceUUID, characteristicUUID[serviceType])
          .then((readData) => {
            console.log("CONSEGUIU LER A CHARACTERISTIC!");
            //Conversão da matriz de bytes para string:
            const response = String.fromCharCode.apply(null, readData);
            console.log(`INFO DE ${peripheral.name}: ` + response);

            updateDeviceInfo(peripheral.id, { ...deviceInfoMap[peripheral.id], battery: response });

          })
          .catch((error) => {
            console.log('Erro em encontrar characteristic: ', error);
          });
      })
        .catch((error) => {
          console.log(error);
        });
    })

  };

  const startNotify = (peripheral, servUUIDs, serviceType, characteristicUUID) => {
    console.log("\n********** NOTIFY PROPERTY ***********\n");
    servUUIDs[serviceType].forEach(serviceUUID => {
      BleManager.startNotification(peripheral.id, serviceUUID, characteristicUUID[serviceType])
        .then(() => {
          console.log("Notify started!");
        })
        .catch((error) => {
          console.log("Error starting notification: ", error);
          console.log("CARACTERISTICA QUE DEU PROBLEMA: ");
          console.log("Device: ", peripheral.id, "\nServiço: ", serviceUUID, "\nCaracteristica: ", characteristicUUID[serviceType])
        });
    });
  };

  /*************************
  *      USE EFFECTS 
  *************************/

  //HOOK USE EFFECT PARA TRATAMENTO DO BLUETOOTH:
  useEffect(() => {

    //Inicializa o BleManager 
    BleManager.start({ showAlert: false })
      .then(() => {
        console.log('Bluetooth initialized');
      })
      .catch((error) => {
        console.error('Error initializing Bluetooth:', error);
      });

    //Permissões do Bluetooth
    /*if (Platform.OS == 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,

      ).then((result) => {
        if (result) {
          console.log('Permissão está OK!')
        }
        else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          ).then(result => {
            if (result) {
              console.log('Permissão aceita.');
            }
            else {
              console.log('Permissão recusada.');
            }
          });

        }
      });
    }*/


    //Tornar Bluetooth On caso esteja Off
    BleManager.enableBluetooth().then(() => {
      console.log('Bluetooth : ON!');
    });

    const discoverPeripheral = BleManagerEmitter.addListener('BleDiscoverPeripheral',
      handleDiscoverPeripheral);

    const stopScan = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        setIsScanning(false);
        setDeviceState('deviceOff');
        console.log('Scan parou!');
        console.log("ESCANEAMENTO ACABOU");

        //FUNÇÃO PARA MAPEAMENTO DOS DISPOSITIVOS ENCONTRADOS:
        handleDiscoverPeripheral()
          .then((peripheralsArray) => {
            const devices = peripheralsArray as any[];
            console.log("Discovered peripherals: " + devices.length);
            if (devices.length > 0) {
              console.log('TEM DISPOSITIVOS! \n-------------------');
              setHasDevice(true);
              console.log('Discovered peripherals:');
              devices.forEach((peripheral) => {
                if (peripheral.name != null) {
                  console.log('Device Name:', peripheral.name);
                  console.log('ID: ', peripheral.id);
                  console.log('RSSI: ', peripheral.rssi);
                  console.log('Device Advertising Data: ', peripheral.advertising);
                  console.log('----------------------');
                  peripherals.set(peripheral.id, peripheral);
                }

              });
              setPeripherals(new Map(peripherals));

            }
            else {
              // Resetar a lista de dispositivos descobertos
              setPeripherals(new Map());
              setHasDevice(false);
              console.log('Nenhum dispositivo encontrado');
            }
          })
          .catch((error) => {
            console.log("Error getting discovered peripherals:", error);
          });
      },
    );


    //Checando estado do  Bluetooth
    BleManager.checkState()
      .then((state) => {
        if (state === 'on') {
          setIsBluetoothOn(true);
        }
      })
      .catch((error) => {
        console.error('Error checking Bluetooth state:', error);
      });

    return (() => {
      discoverPeripheral.remove()
      stopScan.remove()
    })


  }, []);

  //HOOK USE EFFECT PARA RECEBER INFORMAÇÕES DO DISPOSITIVO PERIODICAMENTE
  /*useEffect(() => {
    const interval = setInterval(() => {
      readCharacteristicValue(peripheralData, serviceUUIDs, "device", characteristicUUID);
      const batteryInfo = deviceInfoMap[peripheralId]?.battery || "";
      console.log("BATERIA: ");
      console.log(batteryInfo);
    }, 20000);

    return () => clearInterval(interval);
  }, [peripheralData, serviceUUIDs, characteristicUUID, peripheralId, deviceInfoMap])

  // Enviar os dados através de useEffect
  useEffect(() => {
    writeCharacteristicValue(peripheralData, serviceUUIDs, "form", characteristicUUID, formData, 100);

  }, [isBluetoothOn, formData]);

  useEffect(() => {
    writeCharacteristicValue(peripheralData, serviceUUIDs, "question", characteristicUUID, questionnaireData, 500);

  }, [isBluetoothOn, questionnaireData]);*/


  //NOTIFY LISTENER: 

  useEffect(() => {

    notificationListener = BleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      ({ value, peripheral }) => {

        if (peripheral.id === peripheralId) {
          // Assuming value contains the response data
          const receivedData = new Uint8Array(value);
          const response = String.fromCharCode.apply(null, receivedData);
          console.log('Resposta do Questionário recebida:', response);

        }
        else {
          console.log("Error in notification!");
        }
      });

    return () => {
      notificationListener.remove();
    };

  }, []);

  //HOOK USE EFFECT PARA OBTER RSSI
  /*useEffect(() => {
    const interval = setInterval(() => {
      obtainRSSI();
    }, 25000);

    return () => clearInterval(interval);
  }, [peripherals, deviceName]);*/



  /*************************
  *   FUNÇÕES PARA RENDER
  *************************/

  //RENDERIZAÇÃO DA IMAGEM DEVICE:
  const renderDevice = () => {

    switch (deviceState) {
      case 'deviceOff':
        console.log(deviceState);
        return <Image
          source={require('../../../assets/twatch_DeviceOff.png')}
          style={stylebluetooth.deviceDesign_Image}
        />;
      case 'deviceScanning':
        console.log(deviceState);
        return <Image
          source={require('../../../assets/twatch_Scanning.gif')}
          style={stylebluetooth.deviceDesign_Image}
        />;
      case 'deviceOn':
        console.log(deviceState);
        return <Image
          source={require('../../../assets/twatch_DeviceOn.png')}
          style={stylebluetooth.deviceDesign_Image}
        />;
      default:
        console.log(deviceState);
        return null;
    }
  }


  //RENDERIZAÇÃO DOS DISPOSITIVOS ENCONTRADOS:
  const renderDiscoverDevice = ({ item }: { item: any }) => {
    // Verifica se o dispositivo está conectado

    console.log('RENDER: ', item);
    console.log('ID: ', item.id);
    console.log('NAME: ', item.name);
    // Verifica se o dispositivo é o "T-Watch YouMind"
    const isYouMindDevice = item.name === "T-Watch YouMind";

    // Renderiza apenas se o dispositivo estiver conectado e for o "T-Watch YouMind"
    if (isYouMindDevice) {
      return (

        <TouchableOpacity onPress={() => connectToDevice(item)} style={stylebluetooth.deviceTemplate_button}>
          <View style={stylebluetooth.deviceTemplate_View}>
            <Image
              source={require('../../../assets/icon_device.png')}
              style={stylebluetooth.deviceTemplate_Icon}
            />
            <View style={stylebluetooth.deviceInfoTemplate_View1}>
              <Text style={stylebluetooth.deviceNameTemplate_Text}>
                {item.name}
              </Text>
              <View style={stylebluetooth.deviceInfoTemplate_View2}>
                <Text style={stylebluetooth.deviceRSSITemplate_Text}>
                  RSSI: {item.rssi}
                </Text>
                <Text style={stylebluetooth.deviceIDTemplate_Text}>
                  ID: {item.id}
                </Text>
              </View>
            </View>

          </View>
        </TouchableOpacity>


      );
    }
    return null;
  };

  //FUNÇÕES PRINCIPAIS BLUETOOTH

  //Connect Bluetooth -> Iniciar Bluetooth/ Escanar dispositivos/ Permissões de usuário
  const connectBluetooth = () => {
    console.log("CONNECT BLUETOOTH");
    requestPermissions(isGranted => {
      console.log("CADE GRANTED!!");
      if (isGranted) {
        console.log("Permissões aceitas!");
        scanDevices();
      }
    });
  };


  /*************************
  *   RENDERIZAÇÃO DA TELA
  **************************/


  return (

    <View style={stylebluetooth.screen_Bluetooth}>
      <ImageBackground source={require('../../../assets/bluetooth_Title.png')}
        style={stylebluetooth.backgroundImage_BluetoothTitle}>
        <View style={stylebluetooth.header_Bluetooth}>

          <View style={stylebluetooth.deviceSection_View}>

            <View style={stylebluetooth.deviceBluetooth_View}>
              <View style={stylebluetooth.deviceDesign_View}>
                {/* Renderização do Dispositivo: */
                  renderDevice()
                }
              </View>

              <View style={stylebluetooth.deviceInfo_View}>

              </View>
            </View>


            <View style={stylebluetooth.noDevices_View}>
              <Text style={stylebluetooth.noDevices_Text}>
                {
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
      {
        !bluetoothConnected ?
          <>
            <View style={stylebluetooth.devices_View}>

              <View style={stylebluetooth.foundDevices_View}>
                <Text style={stylebluetooth.foundDevices_Text}>
                  {
                    hasDevice ? 'Dispositivos encontrados: '
                      : '    Nenhum dispositivo encontrado'
                  }
                </Text>
              </View>


              <FlatList

                data={Array.from(peripherals.values())}
                renderItem={renderDiscoverDevice}
                keyExtractor={(item) => item.id}
              />

            </View>
            <LinearGradient colors={['#e384c2', '#c62cd1', '#9322b3']} style={stylebluetooth.containerbuttonConnect}>
              <TouchableOpacity onPress={connectBluetooth} style={stylebluetooth.buttonConnect}>
                <Text style={stylebluetooth.textConnect}>PROCURAR</Text>
              </TouchableOpacity>
            </LinearGradient>
            <Text style={stylebluetooth.textBluetooth}>BLUETOOTH: {isBluetoothOn ? 'ON' : 'OFF'}</Text>
          </>
          :
          <View style={stylebluetooth.connectedDevice_View}>
            {
              Object.keys(deviceInfoMap).map(deviceId => {
                const deviceInfo = deviceInfoMap[deviceId]
                return (
                  <View key={deviceId} style={stylebluetooth.deviceInfoTemplate_View1}>
                    <Text style={stylebluetooth.deviceNameTemplate_Text}>
                      Informações de {deviceInfo.name}
                    </Text>
                    <View style={stylebluetooth.connectedDeviceInfo_View}>
                      <Text style={stylebluetooth.deviceInfoTemplate_Text}>
                        Bateria: {deviceInfo.battery}
                      </Text>
                      <Text style={stylebluetooth.deviceInfoTemplate_Text}>
                        RSSI: {deviceInfo.rssi} dBm
                      </Text>
                    </View>
                  </View>
                )
              })
            }
          </View>}

    </View>

  );
};

const stylebluetooth = StyleSheet.create({
  screen_Bluetooth: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  backgroundImage_BluetoothTitle: {
    width: screenWidth,
    height: screenHeight * 0.4,
    marginBottom: 35,
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
  noDevices_View: {
    width: screenWidth,
    alignItems: 'center',

  },
  noDevices_Text: {
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',

  },
  devices_View: {
    width: screenWidth * 0.75,
    height: screenHeight * 0.26,
    backgroundColor: '#fff2ff',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 7,
    shadowRadius: 3.84,
    elevation: 4,
  },
  foundDevices_Text: {
    fontSize: 14,
    fontWeight: '500'
  },
  foundDevices_View: {
    width: '100%',
    height: screenHeight * 0.05,
    justifyContent: 'flex-end',
    paddingLeft: 30,
  },
  deviceTemplate_View: {

    width: screenWidth * 0.7,
    height: screenHeight * 0.13,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0dcdc',
    borderTopWidth: 1,
    borderTopColor: '#e0dcdc',

  },
  deviceTemplate_button: {


  },
  deviceTemplate_Icon: {
    width: 50,
    height: 50
  },
  devicelist_View: {
    height: screenHeight * 0.2
  },
  devicelist_Flatlist: {
    flex: 1,
    width: '100%',
  },
  deviceNameTemplate_Text: {
    fontWeight: '600',
    color: 'purple',
    fontSize: 17
  },
  deviceInfoTemplate_View2: {

  },
  deviceRSSITemplate_Text: {

  },
  deviceIDTemplate_Text: {

  },
  buttonConnect: {
    marginTop: 10,
    width: screenWidth * 0.75,
    height: screenHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'transparent'
  },
  textConnect: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  containerbuttonConnect: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 30,
    width: screenWidth * 0.75,
    height: screenHeight * 0.1,
    marginBottom: 15,
    borderRadius: 50,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 7,
    shadowRadius: 3.84,
    elevation: 10,
  },
  textBluetooth: {
    color: '#841091'
  },
  sendMessage_View: {
    width: screenWidth,
    position: 'absolute',
    top: -30,
    alignItems: 'flex-end'
  },
  sendMessage_Button: {
    width: screenWidth * 0.16,
    height: screenHeight * 0.08,

    marginRight: 20
  },
  sendMessage_Image: {
    width: screenWidth * 0.16,
    height: screenHeight * 0.08
  },
  connectedDevice_View: {
    width: screenWidth * 0.75,
    height: screenHeight * 0.41,
    backgroundColor: '#fff2ff',
    paddingHorizontal: 25,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 7,
    shadowRadius: 3.84,
    elevation: 4,
  },
  deviceInfoTemplate_Text: {
    fontSize: 16,
    color: "#a11ac9"
  },
  connectedDeviceInfo_View: {
    marginVertical: 20,
    display: 'flex',
    gap: 5
  },
  deviceInfoTemplate_View1: {
    paddingTop: 30,


  },

});

export default Patient_Bluetooth;