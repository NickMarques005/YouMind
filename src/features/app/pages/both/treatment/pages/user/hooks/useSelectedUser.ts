import { SearchUserData } from "types/treatment/Search_Types";

interface UseSelectedUserProps{
    user: SearchUserData,
}

export const useSelectedUser = ({ user }: UseSelectedUserProps) => {
    
    const searchUserData: SearchUserData = user;

    return { searchUserData }
}