
import { useEffect, useState } from 'react';

const useOverallPerformanceMessage = (overallPerformance?: number) => {
    const [overallPerformanceMessage, setOverallPerformanceMessage] = useState('');

    useEffect(() => {
        if (overallPerformance) {
            if (overallPerformance >= 90) {
                setOverallPerformanceMessage('Excelente! Continue assim!');
            } else if (overallPerformance >= 75) {
                setOverallPerformanceMessage('Ótimo! Continue o bom trabalho!');
            } else if (overallPerformance >= 60) {
                setOverallPerformanceMessage('Bom! Há alguns pontos a melhorar.');
            } else if (overallPerformance >= 45) {
                setOverallPerformanceMessage('Não está mal, mas precisa de atenção.');
            } else if (overallPerformance >= 30) {
                setOverallPerformanceMessage('Cuidado! Seu paciente precisa de assistência!');
            } else {
                setOverallPerformanceMessage('Crítico! Necessita de atenção imediata!');
            }
        }
        else{
            setOverallPerformanceMessage("O tratamento do paciente começou!");
        }

    }, [overallPerformance]);

    return { overallPerformanceMessage };
};

export default useOverallPerformanceMessage;