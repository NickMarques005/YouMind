import { UsePatientHistoryService } from "@hooks/api/UsePatientHistoryService";
import { useEffect, useState } from "react";
import { HistoryMedication } from "types/history/PatientHistory_Types";
import { SetLoading } from "types/loading/Loading_Types";

interface UseHistoryQuestionnaireHandlingProps {
    treatmentId?: string;
    setLoading: SetLoading;
    nextSetLoading: SetLoading;
    HandleResponseAppError: (value: string) => void;
}

export const useHistoryMedicationsHandling = ({ setLoading, nextSetLoading, HandleResponseAppError, treatmentId }: UseHistoryQuestionnaireHandlingProps) => {
    const initialPatientHistory = UsePatientHistoryService(setLoading);
    const nextPatientHistory = UsePatientHistoryService(nextSetLoading);
    const [medications, setMedications] = useState<HistoryMedication[]>([]);
    const [page, setPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState(true);

    const fetchInitialMedications = async (treatment: string) => {
        try {
            const response = await initialPatientHistory.performGetHistoryMedicationsForCurrentPatient(page, treatment);
            if (response.success) {
                if (response.data) {
                    if (response.data.medications.length !== 0) {
                        const newMedications = response.data.medications;
                        setMedications(prev => [...prev, ...newMedications]);
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

    const fetchMedications = async (treatment: string) => {
        if(!hasMore) return;
        console.log("Page: ", page);
        try {
            const response = await nextPatientHistory.performGetHistoryMedicationsForCurrentPatient(page, treatment);
            if (response.success) {
                if (response.data) {
                    if (response.data.medications.length !== 0) {
                        const newMedications = response.data.medications;
                        const uniqueMedications = newMedications.filter(
                            (newMedication) => !medications.some((existingMedication) => existingMedication._id === newMedication._id)
                        );
                        setMedications((prevMedications) => [...prevMedications, ...uniqueMedications]);
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
        if (medications.length === 0 && treatmentId) {
            fetchInitialMedications(treatmentId);
        }
    }, []);

    return { fetchMedications, medications, hasMore }
}