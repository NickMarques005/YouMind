import { useEffect, useState } from 'react';
import { LatestMedication, LatestQuestionnaire } from 'types/history/PatientHistory_Types';
import { UseTreatment } from '@providers/TreatmentProvider';
import { useLatestQuestionnaire } from '@features/app/providers/doctor/LatestQuestionnaireProvider';
import { useLatestMedication } from '@features/app/providers/doctor/LatestMedicationProvider';

export const useLatestHistoryHandling = () => {
    const { treatment_state } = UseTreatment();
    const { state: latestQuestionnaireState } = useLatestQuestionnaire();
    const { state: latestMedicationState } = useLatestMedication();
    
    const [latestMedications, setLatestMedications] = useState<LatestMedication[]>([]);
    const [latestQuestionnaires, setLatestQuestionnaires] = useState<LatestQuestionnaire[]>([]);

    useEffect(() => {
        if (treatment_state) {
            let questionnaires: LatestQuestionnaire[] = [];
            let medications: LatestMedication[] = [];
            if(latestQuestionnaireState)
            {
                const filteredQuestionnaires = latestQuestionnaireState.latestQuestionnaire.filter(questionnaire =>
                    treatment_state.treatments.some(treatment => treatment.uid === questionnaire.patientId)
                ).map(questionnaire => {
                    const treatment = treatment_state.treatments.find(treatment => treatment.uid === questionnaire.patientId);
                    if (treatment) {
                        return {
                            ...questionnaire,
                            patientName: treatment.name,
                            patientAvatar: treatment.avatar
                        };
                    }
                    return questionnaire;
                });

                questionnaires = filteredQuestionnaires;
            }
            
            if(latestMedicationState)
            {
                const filteredMedications = latestMedicationState.latestMedication.filter(medication =>
                    treatment_state.treatments.some(treatment => treatment.uid === medication.patientId)
                ).map(medication => {
                    const treatment = treatment_state.treatments.find(treatment => treatment.uid === medication.patientId);
                    if (treatment) {
                        return {
                            ...medication,
                            patientName: treatment.name,
                            patientAvatar: treatment.avatar
                        };
                    }
                    return medication;
                });

                medications = filteredMedications;
            }

            console.log("ATUALIZAR LATEST MEDICATIONS");
            setLatestMedications(medications);
            setLatestQuestionnaires(questionnaires);
        }
        
    }, [treatment_state, latestQuestionnaireState, latestMedicationState]);

    return { latestMedications, latestQuestionnaires, latestMedicationState, latestQuestionnaireState };
};