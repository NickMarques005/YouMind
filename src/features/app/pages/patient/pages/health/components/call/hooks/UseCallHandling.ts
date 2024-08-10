
interface UseCallHandlingParams {
    makeCall: (number: string) => void
}

const useCallHandling = ({ makeCall }: UseCallHandlingParams) => {

    const handleCallCVV = () => {
        const cvvNumber = process.env.CVV_NUMBER;
        
        if(cvvNumber)
        {
            console.log(`CHAMAR ${cvvNumber}!`);
            makeCall(cvvNumber);
        }
    }

    return { handleCallCVV }
}

export default useCallHandling;