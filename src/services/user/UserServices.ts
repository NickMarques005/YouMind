
import { Tokens } from "../../types/auth/Auth_Types";
import { FilteredUser, Request_FilterUsersArgs, UserData } from "../../types/user/User_Types";
import { MakeRequest } from "../Request";

export const UserService = {
    FilterUsers: async (filterUsersData: Request_FilterUsersArgs, type: string, tokens: Tokens) => {
        return MakeRequest<FilteredUser[]>(
            `user/filter}`,
            'GET',
            undefined,
            tokens.accessToken,
            tokens.refreshToken,
            { ...filterUsersData, type }
        );
    },
    FetchUserData: async (type: string, tokens: Tokens) => {
        return MakeRequest<UserData>(
            `user/data`,
            'GET',
            undefined,
            tokens.accessToken,
            tokens.refreshToken,
            { type }
        );
    },
};