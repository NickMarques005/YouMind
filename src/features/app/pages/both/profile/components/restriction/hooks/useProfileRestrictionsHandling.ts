import { UseGlobalResponse } from "@features/app/providers/sub/ResponseProvider";
import { UseUserService } from "@hooks/api/UseUserService";
import { LoadingStructure } from "types/loading/Loading_Types";
import { UserDoctor, UserPatient } from "types/user/User_Types";

interface UseProfileRestrictionsHandlingParams {
    treatmentRestrictionsLoading: LoadingStructure;
    restrictionsLoading: LoadingStructure;
    updateUserData: (newData: Partial<UserDoctor> | Partial<UserPatient>) => void
}

export interface HandleProfileRestrictionChangeParams {
    private_treatment?: boolean;
    onSuccess?: () => void;
}

export const useProfileRestrictionsHandling = ({ restrictionsLoading, treatmentRestrictionsLoading, updateUserData }: UseProfileRestrictionsHandlingParams) => {
    const { HandleResponseAppError, HandleResponseAppSuccess } = UseGlobalResponse();
    const { performHandleProfileRestriction: defaultPerformProfileRestriction } = UseUserService(restrictionsLoading.setLoading);
    const { performHandleProfileRestriction: treatmentPerformProfileRestriction } = UseUserService(treatmentRestrictionsLoading.setLoading)

    const handleProfileRestrictionChange = async ({ private_treatment, onSuccess }: HandleProfileRestrictionChangeParams) => {
        try {
            
            const response = private_treatment === undefined ? await defaultPerformProfileRestriction()
                : await treatmentPerformProfileRestriction(private_treatment);

            if (response.success) {
                if (response.data) {
                    const restriction = response.data;
                    console.log("Atualizar restrição: ", restriction);
                    //Atualização da restrição de perfil
                    updateUserData(restriction);

                    if (onSuccess) {
                        onSuccess();
                    }

                    if (response.message) {
                        HandleResponseAppSuccess(response.message, response.type);
                    }
                }

                return;
            }

            return HandleResponseAppError("Houve um erro inesperado ao atualizar restrição de perfil");
        }
        catch (err) {
            const error = err as Error;
            console.error("Erro ao atualizar restrição: ", error);
            return HandleResponseAppError(`Houve um erro: ${error.message}`);
        }
    }

    return { handleProfileRestrictionChange };
}