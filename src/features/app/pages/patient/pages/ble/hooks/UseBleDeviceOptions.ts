import { useState } from 'react';
import { DeviceOption, SubDeviceOption } from 'types/ble/DeviceOption_Types';

const deviceMainOptions = [
    "Localizar Dispositivo",
    "Gerenciamento de Bateria",
    "Configurações de Display",
    "Controle de Vibração",
    "Som",
    "Alarmes",
    "Notificações",
    "Atualizações de Firmware",
]


export const useDeviceOptions = () => {
    const [options, setOptions] = useState<DeviceOption[]>([]);

    const optionActions: { [key: string]: (() => void) | undefined } = {
        "Localizar Dispositivo": undefined,
        "Gerenciamento de Bateria": undefined,
        "Configurações de Display": undefined,
        "Controle de Vibração": undefined,
        "Som": undefined,
        "Alarmes": undefined,
        "Notificações": undefined,
        "Atualizações de Firmware": undefined,
    }

    const prepareSubOptions = (mainOption: string): SubDeviceOption[] | undefined => {
        switch (mainOption) {
            case "Localizar Dispositivo":
                return [
                    { label: "Procurar", action: () => console.log("Localizar Dispositivo") },
                    { label: "Localizar Dispositivo Automaticamente após Conexão", action: () => console.log("Ativar Localização automática do Dispositivo ") },
                ];
            case "Gerenciamento de Bateria":
                return [
                    { label: "Modo de Economia Extrema", action: () => console.log("Economia de Energia Extrema") },
                    { label: "Alertar em Caso de Baixa Bateria", action: () => console.log("Alerta de Bateria Baixa") },
                ];
            case "Configurações de Display":
                return [
                    { label: "Brilho", action: () => console.log("Configurar Brilho") },
                    { label: "Temas", action: () => console.log("Configurar Temas") },
                ];
            case "Controle de Vibração":
                return [
                    { label: "Intensidade", action: () => console.log("Configurar Intensidade de Vibração") },
                    { label: "Padrões", action: () => console.log("Configurar Padrões de Vibração") },
                ];
            case "Som":
                return [
                    { label: "Volume", action: () => console.log("Configurar Volume") },
                    { label: "Tom de Notificação", action: () => console.log("Configurar Tom de Notificação") },
                ];
            case "Alarmes":
                return [
                    { label: "Duração", action: () => console.log("Duração") },
                    { label: "Adiar Alarme", action: () => console.log("Adiar Alarme") },
                ];
            case "Notificações":
                return [
                    { label: "Receber Mensagens de Chat", action: () => console.log("Mensagens de Chat") },
                    { label: "Vibrar", action: () => console.log("Vibrar") },
                ];
            case "Atualizações de Firmware":
                return [
                    { label: "Verificar Atualizações", action: () => console.log("Verificar Atualizações de Firmware") },
                    { label: "Receber E-mails de Novas Atualizações", action: () => console.log("Configurar Atualizações de Firmware") },
                ];
            default:
                return undefined;
        }
    };

    const prepareDeviceOptions = () => {
        const preparedOptions: DeviceOption[] = deviceMainOptions.map((mainOption: string) => {
            return {
                label: mainOption,
                action: optionActions[mainOption],
                subOptions: prepareSubOptions(mainOption),
            };
        });
        setOptions(preparedOptions);
    };

    return { options, prepareDeviceOptions };
}