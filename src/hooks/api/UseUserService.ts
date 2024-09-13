import { UseRequest } from "./UseRequest";
import { UserService } from "@api/services/user/UserServices";
import { SetLoading } from "types/loading/Loading_Types";
import { Request_FetchSelectedUserDataArgs, Request_FilterUsersArgs, Request_UpdateUserAvatar, Request_UpdateUserDetails } from "types/user/User_Types";

export const UseUserService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const performFetchUserData = async (stopLoading?: boolean) => {
        return HandleRequest({
            serviceFunction: UserService.FetchUserData,
            setLoading,
            params: [],
            stopLoading
        });
    };

    const performFetchSelectedUserData = async (args: Request_FetchSelectedUserDataArgs) => {
        return HandleRequest({
            serviceFunction: UserService.FetchSelectedUserData,
            setLoading,
            params: [args]
        });
    };

    const performFilterUsers = async (args: Request_FilterUsersArgs, type: string) => {

        return HandleRequest({
            serviceFunction: UserService.FilterUsers,
            setLoading,
            params: [args, type]
        });
    };

    const performUpdateUserAvatar = async (args: Request_UpdateUserAvatar, oldAvatar?: string) => {

        return HandleRequest({
            serviceFunction: UserService.UpdateUserAvatar,
            setLoading,
            params: [args, oldAvatar]
        });
    }

    const performUpdateUserDetails = async (args: Request_UpdateUserDetails) => {
        return HandleRequest({
            serviceFunction: UserService.UpdateUserDetails,
            setLoading,
            params: [args]
        });
    }

    const performHandleProfileRestriction = async (private_treatment?: boolean) => {
        return HandleRequest({
            serviceFunction: UserService.HandleProfileRestriction,
            setLoading,
            params: [private_treatment]
        });
    };


    return {
        performFetchUserData,
        performFetchSelectedUserData,
        performFilterUsers,
        performUpdateUserAvatar,
        performUpdateUserDetails,
        performHandleProfileRestriction
    }
}



