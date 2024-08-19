import { TreatmentScreenName } from "types/navigation/Navigation_Types";


interface UseStatusBehavior{
    navigateToTreatmentScreen: (screenName: TreatmentScreenName) => void
}

const useStatusBehavior = ({ navigateToTreatmentScreen }: UseStatusBehavior) => {

    const backToMain = () => {
        navigateToTreatmentScreen('main_treatment');
    }

    return { backToMain };
}

export default useStatusBehavior;