import { UseProfileNavigation } from "../../../hooks/UseProfileNavigation";

export const useProfileRestrictionsBehavior = () => {

    const { navigateBack } = UseProfileNavigation();

    const handleGoBack = () => {
        navigateBack();
    }

    return { handleGoBack };
}