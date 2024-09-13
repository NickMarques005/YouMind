import { UseGlobalResponse } from "@features/app/providers/sub/ResponseProvider";
import { UseUserService } from "@hooks/api/UseUserService";
import { useEffect, useState } from "react"
import { LoadingStructure } from "types/loading/Loading_Types";
import { SearchUserData } from "types/treatment/Search_Types"
import { Request_FetchSelectedUserDataArgs } from "types/user/User_Types";

interface UseSelectedUserHandlingParams {
    fetchLoading: LoadingStructure;
    selectedUser: SearchUserData;
    handleSelectedUser: (user: SearchUserData) => void;
}

export const useSelectedUserHandling = ({ fetchLoading, selectedUser, handleSelectedUser }: UseSelectedUserHandlingParams) => {
    const { performFetchSelectedUserData } = UseUserService(fetchLoading.setLoading);
    const { HandleResponseAppError } = UseGlobalResponse();

    const handleFetchSelectedUserData = async (selectedUser: SearchUserData) => {
        try{
            const fetchArgs: Request_FetchSelectedUserDataArgs = {
                type: selectedUser.type,
                selectedUserId: selectedUser._id
            }

            const response = await performFetchSelectedUserData(fetchArgs);
            if(response.success)
            {
                console.log(response.message);
                const user = response.data;
                console.log("Dados do usuário: ", response.data);
                user && handleSelectedUser(user);
            }
        }
        catch (err)
        {
            const error = err as Error;
            return HandleResponseAppError(`Houve um erro ao buscar dados de usuário: ${error}. Tente novamente`);
        }
    }

    useEffect(() => {
        handleFetchSelectedUserData(selectedUser)
    }, []);

    return {}
}