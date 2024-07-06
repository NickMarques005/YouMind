import { useMemo } from 'react';
import images from '@assets/images';

export const useQuestionnairePerformanceIcon = (performance: string) => {
    
    const performanceIcon = useMemo(() => {
        const performance_bom = images.app_patient_images.health.quiz.performance_icon_bom;
        const performance_otimo = images.app_patient_images.health.quiz.performance_icon_otimo;
        const performance_excelente = images.app_patient_images.health.quiz.performance_icon_excelente;
        const performance_nadamal = images.app_patient_images.health.quiz.performance_icon_nadamal;
        const performance_precisamelhorar = images.app_patient_images.health.quiz.performance_icon_precisamelhorar;

        switch (performance) {
            case 'precisa melhorar':
                return performance_precisamelhorar;
            case 'nada mal':
                return performance_nadamal;
            case 'bom':
                return performance_bom;
            case 'ótimo':
                return performance_otimo;
            case 'excelente':
                return performance_excelente;
            default:
                return performance_precisamelhorar;
        }
    }, [performance]);

    return { performanceIcon };
};