import { UseGlobalResponse } from "@features/app/providers/sub/ResponseProvider";
import { UseUserService } from "@hooks/api/UseUserService";
import { useEffect } from "react";
import { SearchUserData } from "types/treatment/Search_Types";
import { UserType } from "types/user/User_Types";

interface UseSearchUserHandlingParams {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    userType: UserType;
    searchQueryText: string;
    handleSearchResults: (result: SearchUserData[]) => void;
}

export const UseSearchUserHandling = ({ setLoading, userType, searchQueryText, handleSearchResults }: UseSearchUserHandlingParams) => {
    const { performFilterUsers } = UseUserService(setLoading);
    const { HandleResponseAppError } = UseGlobalResponse();

    const handleTypingSearch = async (data: string) => {

        const searchData = {
            search: data
        }

        console.log(searchData);

        try {
            if (!userType) {
                console.log("Erro: tipo de usuário não especificado");
                return;
            }

            const response = await performFilterUsers(searchData, userType);

            if (response.success) {
                console.log(response.data);
                handleSearchResults(response.data || []);
            }
            else {

                if (response.error) {
                    console.error('Erro ao buscar usuários: ', response.error);
                    HandleResponseAppError(response.error);
                }
            }
        }
        catch (err) {
            const error = err as Error;
            console.error("Erro ao buscar usuários: ", err);
            HandleResponseAppError(error.message);
        }
    };

    useEffect(() => {
        if(searchQueryText !== '')
        {
            console.log("Use effect typing search")
            console.log(searchQueryText)
            handleTypingSearch(searchQueryText);
        }
    }, [searchQueryText]);

    return { }
}