
import { 
    FilteredUser, 
    Request_FilterUsersArgs, Request_UpdateUserAvatar, 
    Request_UpdateUserDetails, Request_FetchSelectedUserDataArgs, UserAvatarResponse, 
    UserData, UserDetailsResponse, HandleProfileRestrictionResponse
 } from "types/user/User_Types";
import { MakeRequest } from "../Request";
import { GetAccessToken } from "@utils/token/GetAccessToken";
import FirebaseStorageService from "src/__firebase__/services/FirebaseStorageService";
import generateUniqueUID from "@utils/security/handleUUID";
import { SearchUserData } from "types/treatment/Search_Types";

export const UserService = {
    FilterUsers: async (filterUsersData: Request_FilterUsersArgs, type: string) => {
        const token = await GetAccessToken();

        return MakeRequest<FilteredUser[]>(
            `user/filter`,
            'GET',
            undefined,
            token,
            { ...filterUsersData, type }
        );
    },
    FetchSelectedUserData: async (args: Request_FetchSelectedUserDataArgs) => {
        const token = await GetAccessToken();

        return MakeRequest<SearchUserData>(
            `user/selected/data`,
            'GET',
            undefined,
            token,
            { ...args }
        );
    },
    FetchUserData: async () => {
        const token = await GetAccessToken();

        return MakeRequest<UserData>(
            `user/data`,
            'GET',
            undefined,
            token,
            {}
        );
    },
    UpdateUserAvatar: async (newImage: Request_UpdateUserAvatar, oldAvatar?: string) => {
        const token = await GetAccessToken();
        let storageImageUri = '';

        if(newImage.avatar)
        {
            const image = newImage.avatar;
            const uniqueUuid = generateUniqueUID();
            storageImageUri = await FirebaseStorageService.uploadAvatar(uniqueUuid, image);
            newImage.avatar = storageImageUri;
        }

        if(oldAvatar)
        {
            console.log("Remove Old Avatar!!");
            await FirebaseStorageService.deleteAvatar(oldAvatar);
        }
        
        return MakeRequest<UserAvatarResponse>(
            `user/update/avatar`,
            'POST',
            { ...newImage },
            token
        )
    },
    UpdateUserDetails: async (userDetails: Request_UpdateUserDetails) => {
        const token = await GetAccessToken();

        return MakeRequest<UserDetailsResponse>(
            `user/update/details`,
            'POST',
            { ...userDetails },
            token
        )
    },
    HandleProfileRestriction: async (private_treatment?: boolean) => {
        const token = await GetAccessToken();

        return MakeRequest<HandleProfileRestrictionResponse>(
            `user/update/private`, 
            'POST',
            { private_treatment },
            token
        );
    },
};