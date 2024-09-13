import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SearchUserData } from "types/treatment/Search_Types";

interface SearchContextProps {
    modalSearch: boolean;
    searchQueryText: string;
    searchResults: SearchUserData[];
    handleModalSearch: () => void;
    handleSearchQueryText: (search: string) => void;
    handleSearchResults: (results: SearchUserData[]) => void;
    clearSearchResults: () => void;
    clearSearchQueryText: () => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

interface SearchProviderProps {
    children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [modalSearch, setModalSearch] = useState(false);
    const [searchQueryText, setSearchQueryText] = useState('');
    const [searchResults, setSearchResults] = useState<SearchUserData[]>([]);

    const handleModalSearch = () => {
        setModalSearch(prev => !prev);
    }

    const handleSearchResults = (results: SearchUserData[]) => {
        setSearchResults(results);
    }

    const clearSearchResults = () => {
        setSearchResults([]);
    }

    const handleSearchQueryText = (search: string) => {
        setSearchQueryText(search);
    }

    const clearSearchQueryText = () => {
        setSearchQueryText('');
    }

    useEffect(() => {
        if (!modalSearch) {
            clearSearchQueryText();
            clearSearchResults();
        }
    }, [modalSearch]);

    return (
        <SearchContext.Provider value={{
            modalSearch,
            searchQueryText,
            searchResults,
            handleModalSearch,
            handleSearchQueryText,
            handleSearchResults,
            clearSearchResults,
            clearSearchQueryText,
        }}>
            {children}
        </SearchContext.Provider>
    );
}

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('Contexto precisa ser dentro de provider! (useSearch)');
    }
    return context;
};