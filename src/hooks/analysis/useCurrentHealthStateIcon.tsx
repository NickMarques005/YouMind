import images from '@assets/images';
import { useEffect, useState } from 'react';

const excelente = images.app_doctor_images.analysis.currentstate_excelente_icon;
const otimo = images.app_doctor_images.analysis.currentstate_otimo_icon;
const bom = images.app_doctor_images.analysis.currentstate_bom_icon;
const nadamal = images.app_doctor_images.analysis.currentstate_nadamal_icon;
const precisadeatencao = images.app_doctor_images.analysis.currentstate_precisadeatencao_icon;
const critico = images.app_doctor_images.analysis.currentstate_critico_icon;

const useCurrentHealthStateIcon = (currentHealthState: number) => {
    const [healthStateInfo, setHealthStateInfo] = useState({ text: '', icon: null });

    useEffect(() => {
        if (currentHealthState >= 90) {
            setHealthStateInfo({ text: "Excelente!", icon: excelente });
        } else if (currentHealthState >= 75) {
            setHealthStateInfo({ text: "Ótimo!", icon: otimo });
        } else if (currentHealthState >= 60) {
            setHealthStateInfo({ text: "Muito Bom!", icon: bom });
        } else if (currentHealthState >= 45) {
            setHealthStateInfo({ text: "Nada Mal", icon: nadamal });
        } else if (currentHealthState >= 30) {
            setHealthStateInfo({ text: "Precisa de Atenção", icon: precisadeatencao });
        } else {
            setHealthStateInfo({ text: "Crítico!", icon: critico });
        }
    }, [currentHealthState]);

    return healthStateInfo;
};

export default useCurrentHealthStateIcon;