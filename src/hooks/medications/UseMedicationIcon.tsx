import { useMemo } from 'react';
import images from '@assets/images';
import { MedicationType } from 'types/app/patient/health/Medicine_Types';

export const useMedicationIcon = (type?: MedicationType, userType?: string) => {
    
    const icon = useMemo(() => {
        const capsule = images.app_patient_images.health.medicines.medicine_capsule_icon;
        const pill = images.app_patient_images.health.medicines.medicine_pill_icon;
        const liquid = images.app_patient_images.health.medicines.medicine_liquid_icon;

        switch (type) {
            case 'Comprimido':
                return pill;
            case 'Cápsula':
                return capsule;
            case 'Líquido':
                return liquid;
            default:
                return capsule;
        }
    }, [type]);

    const iconType = useMemo(() => {
        const capsuleType = images.app_patient_images.health.medicines.medicine_capsule_type;
        const pillType = images.app_patient_images.health.medicines.medicine_pill_type;
        const liquidType = images.app_patient_images.health.medicines.medicine_liquid_type;

        switch (type) {
            case 'Comprimido':
                return pillType;
            case 'Cápsula':
                return capsuleType;
            case 'Líquido':
                return liquidType;
            default:
                return capsuleType;
        }
    }, [type]);

    const mainIcon = useMemo(() => {
        const capsule = images.app_patient_images.health.medicines.capsule_medication;
        const doctorCapsule = images.app_doctor_images.analysis.capsule_medication;
        const pill = images.app_patient_images.health.medicines.pill_medication;
        const doctorPill = images.app_doctor_images.analysis.pill_medication;
        const liquid = images.app_patient_images.health.medicines.liquid_medication;
        const doctorLiquid = images.app_doctor_images.analysis.liquid_medication;

        switch (type) {
            case 'Comprimido':
                return userType === 'doctor' ? doctorPill : pill;
            case 'Cápsula':
                return userType === 'doctor' ? doctorCapsule : capsule;
            case 'Líquido':
                return userType === 'doctor' ? doctorLiquid : liquid;
            default:
                return capsule;
        }
    }, [type]);

    return { icon, iconType, mainIcon };
};