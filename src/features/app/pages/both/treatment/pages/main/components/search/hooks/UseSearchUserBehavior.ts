import { UseTreatmentNavigation } from "@features/app/pages/both/treatment/hooks/UseTreatmentNavigation";
import { useSearch } from "@features/app/providers/sub/SearchProvider";
import { useEffect, useState } from "react";
import { SearchUserData } from "types/treatment/Search_Types";

interface UseSearchUserBehaviorParams{
    visible: boolean;
}

export const useSearchUserBehavior = ({ visible }: UseSearchUserBehaviorParams) => {
    const { navigateToTreatmentScreen } = UseTreatmentNavigation();
    const { 
        searchQueryText, 
        searchResults,
        handleSearchQueryText,
        handleSearchResults,
        clearSearchQueryText,
        clearSearchResults
    } = useSearch();

    const handleChooseUser = (searchUserData: SearchUserData) => {
        console.log(searchUserData);
        navigateToTreatmentScreen('selected_user', { params: searchUserData })
    }

    useEffect(() => {
        if (!visible) {
            clearSearchQueryText();
            clearSearchResults();
        }
    }, [visible]);

    return { 
        searchQueryText,
        searchResults,
        handleSearchResults,
        handleSearchQueryText,
        handleChooseUser,
        clearSearchResults,
        clearSearchQueryText
    }
}