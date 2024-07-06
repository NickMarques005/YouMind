import { UsePatientHistoryService } from "@hooks/api/UsePatientHistoryService";
import { useEffect, useState } from "react";
import { HistoryQuestionnaire } from "types/history/PatientHistory_Types";
import { SetLoading } from "types/loading/Loading_Types";

interface UseHistoryQuestionnaireHandlingProps {
    treatmentId?: string;
    setLoading: SetLoading;
    nextSetLoading: SetLoading;
    HandleResponseAppError: (value: string) => void;
}

export const useHistoryQuestionnairesHandling = ({ setLoading, nextSetLoading, HandleResponseAppError, treatmentId }: UseHistoryQuestionnaireHandlingProps) => {
    const initialPatientHistory = UsePatientHistoryService(setLoading);
    const nextPatientHistory = UsePatientHistoryService(nextSetLoading);
    const [questionnaires, setQuestionnaires] = useState<HistoryQuestionnaire[]>([]);
    const [page, setPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchInitialQuestionnaires = async (treatment: string) => {
        try {
            const response = await initialPatientHistory.performGetHistoryQuestionnairesForCurrentPatient(page, treatment);
            if (response.success) {
                if (response.data) {
                    if (response.data.questionnaires.length !== 0) {
                        const newquestionnaires = response.data.questionnaires;
                        setQuestionnaires(prev => [...prev, ...newquestionnaires]);
                        handleAddPage();
                    }
                }
            }

            if (response.error) {
                HandleResponseAppError(response.error);
            }
        } catch (err) {
            console.error('Erro ao buscar questionários:', err);
            const error = err as Error;
            HandleResponseAppError(error.message);
        }
    }

    const fetchQuestionnaires = async (treatment: string) => {
        if(!hasMore) return;
        console.log("Page: ", page);
        try {
            const response = await nextPatientHistory.performGetHistoryQuestionnairesForCurrentPatient(page, treatment);
            if (response.success) {
                if (response.data) {
                    if (response.data.questionnaires.length !== 0) {
                        const newQuestionnaires = response.data.questionnaires;
                        const uniqueQuestionnaires = newQuestionnaires.filter(
                            (newQuestionnaire) => !questionnaires.some((existingMedication) => existingMedication._id === newQuestionnaire._id)
                        );
                        setQuestionnaires((prevquestionnaires) => [...prevquestionnaires, ...uniqueQuestionnaires]);
                        handleAddPage();
                    }
                    else{
                        setHasMore(false);
                    }
                }
            }

            if (response.error) {
                HandleResponseAppError(response.error);
            }
        } catch (err) {
            console.error('Erro ao buscar questionários:', err);
            const error = err as Error;
            HandleResponseAppError(error.message);
        }
    }

    const handleAddPage = () => {
        console.log("ADD PAGE!");
        setPage(prev => prev + 1);
    }

    useEffect(() => {
        if (questionnaires.length === 0 && treatmentId) {
            fetchInitialQuestionnaires(treatmentId);
        }
    }, []);
    return { fetchQuestionnaires, questionnaires, hasMore }
}