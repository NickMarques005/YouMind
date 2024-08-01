import { useEffect, useState } from 'react';
import { LatestMedication, LatestQuestionnaire } from 'types/history/PatientHistory_Types';
import { UseTreatment } from '@providers/TreatmentProvider';
import { useLatestQuestionnaire } from '@features/app/providers/doctor/LatestQuestionnaireProvider';
import { useLatestMedication } from '@features/app/providers/doctor/LatestMedicationProvider';
import { UseLoading } from '@hooks/loading/UseLoading';

export const useLatestHistoryHandling = () => {
    const { treatment_state } = UseTreatment();
    const { state: latestQuestionnaireState } = useLatestQuestionnaire();
    const { state: latestMedicationState } = useLatestMedication();
    const latestQuestionnaireLoading = UseLoading(true);
    const latestMedicationLoading = UseLoading(true);
    
    const [latestMedications, setLatestMedications] = useState<LatestMedication[]>([]);
    const [latestQuestionnaires, setLatestQuestionnaires] = useState<LatestQuestionnaire[]>([]);
    
    const processLatestQuestionnaires = async () => {
        try {
            if (treatment_state && latestQuestionnaireState) {
                if (!latestQuestionnaireLoading.loading && latestQuestionnaires.length === 0) {
                    latestQuestionnaireLoading.setLoading(true);
                }

                const questionnaires = latestQuestionnaireState.latestQuestionnaire
                    .filter(questionnaire =>
                        treatment_state.treatments.some(treatment => treatment.uid === questionnaire.patientId)
                    )
                    .map(questionnaire => {
                        const treatment = treatment_state.treatments.find(treatment => treatment.uid === questionnaire.patientId);
                        return treatment ? {
                            ...questionnaire,
                            patientName: treatment.name,
                            patientAvatar: treatment.avatar
                        } : questionnaire;
                    });

                setLatestQuestionnaires(questionnaires);
                
            }
        } catch (error) {
            console.error('Erro ao processar os latest questionnaires:', error);
        }
        finally {
            latestQuestionnaireLoading.setLoading(false);
        }
    }

    const processLatestMedications = async () => {
        try {
            if (treatment_state && latestMedicationState) {
                if (!latestMedicationLoading.loading && latestMedications.length === 0) {
                    latestMedicationLoading.setLoading(true);
                }

                const medications = latestMedicationState.latestMedication
                    .filter(medication =>
                        treatment_state.treatments.some(treatment => treatment.uid === medication.patientId)
                    )
                    .map(medication => {
                        const treatment = treatment_state.treatments.find(treatment => treatment.uid === medication.patientId);
                        return treatment ? {
                            ...medication,
                            patientName: treatment.name,
                            patientAvatar: treatment.avatar
                        } : medication;
                    });

                setLatestMedications(medications);
            }
        } catch (error) {
            console.error('Erro ao processar latest medications:', error);
        }
        finally{
            latestMedicationLoading.setLoading(false);
        }
    };

    useEffect(() => {
        processLatestQuestionnaires();
    }, [treatment_state, latestQuestionnaireState]);

    useEffect(() => {
        processLatestMedications();
    }, [treatment_state, latestMedicationState]);

    return { latestMedications, latestQuestionnaires, 
        latestMedicationState, latestQuestionnaireState, 
        medicationLoading: latestMedicationLoading.loading, 
        questionnaireLoading: latestQuestionnaireLoading.loading 
    };
};