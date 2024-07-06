
interface UseCurrentPatientProps{
    params: {
            currentPatient: string | undefined,
    }
}

export const UseCurrentPatient = ({ params }: UseCurrentPatientProps) => {
    
    const currentPatient: string | undefined = params.currentPatient;

    return { currentPatient }
}