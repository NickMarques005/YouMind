import { UseRequest } from "./UseRequest";
import { UserService } from "@api/services/user/UserServices";
import { SetLoading } from "types/loading/Loading_Types";
import { Request_FilterUsersArgs, Request_UpdateUserAvatar, Request_UpdateUserDetails } from "types/user/User_Types";

export const UseUserService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const performFetchUserData = async () => {
        return HandleRequest({
            serviceFunction: UserService.FetchUserData,
            setLoading,
            params: []
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

    return { performFetchUserData, performFilterUsers, performUpdateUserAvatar, performUpdateUserDetails }
}



