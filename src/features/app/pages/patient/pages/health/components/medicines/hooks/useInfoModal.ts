import { useState } from "react";
import { Easing, runOnJS, useSharedValue, withTiming } from "react-native-reanimated";
import { MedicationFormType } from "types/app/patient/health/Medicine_Types";

type MedicationInfoModalHandlingType = Partial<{
    [key in keyof MedicationFormType]: () => void;
}>;

const useMedicationInfoModal = () => {

    const [isFrequencyModalVisible, setIsFrequencyModalVisible] = useState(false);
    const [isStartModalVisible, setIsStartModalVisible] = useState(false);
    const [modalFrequencyInfo, setModalFrequencyInfo] = useState<undefined | string>(undefined);
    const [modalStartInfo, setModalStartInfo] = useState<undefined | string>(undefined);

    const clearModalFrequency = () => {
        setIsFrequencyModalVisible(false);
        setModalFrequencyInfo(undefined);
    }

    const clearModalStart = () => {
        setIsStartModalVisible(false);
        setModalStartInfo(undefined);
    }

    const MedicationInfoModalHandling: MedicationInfoModalHandlingType = {
        'start': () => {
            if (!isStartModalVisible) {
                const info = `Indica o início do processo do agendamento de seu medicamento.\nPara selecionar uma data, abra o calendário abaixo.`;
                setModalStartInfo(info);
                setIsStartModalVisible(true);
            }
            else {
                clearModalStart();
            }
        },
        'frequency': () => {
            if (!isFrequencyModalVisible) {
                const info = `A frequência indica o intervalo de tempo entre as doses do medicamento.\nA frequência pode variar conforme a necessidade de tratamento, podendo ser diária, semanal, mensal, etc.`;
                setModalFrequencyInfo(info);
                setIsFrequencyModalVisible(true);
            }
            else {
                clearModalFrequency();
            }
        }
    }

    const handleInfoModalPress = (type: keyof MedicationFormType) => {
        if (MedicationInfoModalHandling[type]) {
            MedicationInfoModalHandling[type]();
        }
    };

    const clearInfoModalType = (type: keyof MedicationFormType) => {
        switch (type)
        {
            case 'frequency':
                return clearModalFrequency();
            case 'start':
                return clearModalStart();
            default:
                console.log("Campo inválido");
        }
    }

    return {
        isFrequencyModalVisible,
        isStartModalVisible,
        modalStartInfo,
        modalFrequencyInfo,
        handleInfoModalPress,
        clearInfoModalType
    }
}

export default useMedicationInfoModal;