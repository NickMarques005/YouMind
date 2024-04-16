import { UseRequest } from "./UseRequest";
import { UserService } from "../../services/user/UserServices";
import { SetLoading } from "../../types/loading/Loading_Types";
import { Tokens } from "../../types/auth/Auth_Types";
import { Request_FilterUsersArgs } from "../../types/user/User_Types";


export const UseUserService = (setLoading: SetLoading) => {
    const { HandleRequest } = UseRequest();

    const performFetchUserData = (type: string, tokens: Tokens) => {
        return HandleRequest(UserService.FetchUserData, setLoading, type, tokens);
    }

    const performFilterUsers = (args: Request_FilterUsersArgs, type: string, tokens: Tokens) => {
        return HandleRequest(UserService.FilterUsers, setLoading, args, type, tokens);
    }

    return { performFetchUserData, performFilterUsers}
}



