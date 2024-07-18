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

    useEffect(() => {
        
        const fetchLatestHistories = async () => {
            try {
                let questionnaires: LatestQuestionnaire[] = [];
                let medications: LatestMedication[] = [];

                if (treatment_state) {
                    if (latestQuestionnaireState && latestQuestionnaires.length === 0) {
                        if(!latestQuestionnaireLoading.loading && !latestQuestionnaires) {
                            latestQuestionnaireLoading.setLoading(true);
                        }
                        
                        questionnaires = latestQuestionnaireState.latestQuestionnaire
                            .filter(questionnaire =>
                                treatment_state.treatments.some(treatment => treatment.uid === questionnaire.patientId)
                            )
                            .map(questionnaire => {
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
                        setLatestQuestionnaires(questionnaires);
                        latestQuestionnaireLoading.setLoading(false);
                    }

                    if (latestMedicationState && latestMedications.length === 0) {
                        if(!latestMedicationLoading.loading && !latestMedications) {
                            latestMedicationLoading.setLoading(true);
                        }
                        
                        medications = latestMedicationState.latestMedication
                            .filter(medication =>
                                treatment_state.treatments.some(treatment => treatment.uid === medication.patientId)
                            )
                            .map(medication => {
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
                        setLatestMedications(medications);
                        latestMedicationLoading.setLoading(false);
                    }
                }
            } catch (error) {
                console.error('Error fetching latest histories:', error);
                latestQuestionnaireLoading.setLoading(false);
                latestMedicationLoading.setLoading(false);
            }
        };

        fetchLatestHistories();
        
    }, [treatment_state, latestQuestionnaireState, latestMedicationState]);

    return { latestMedications, latestQuestionnaires, 
        latestMedicationState, latestQuestionnaireState, 
        medicationLoading: latestMedicationLoading.loading, 
        questionnaireLoading: latestQuestionnaireLoading.loading 
    };
};