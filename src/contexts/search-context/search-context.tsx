"use client";

import React, {
    createContext,
    useContext,
    type Dispatch,
    type SetStateAction,
} from "react";
import { FilterValues } from "@/components/search/search.types";
import { useSearchState } from "@/contexts/search-context/use-search-state";

interface SearchContextProps {
    format: boolean[];
    setFormat: Dispatch<SetStateAction<boolean[]>>;
    enrollment: boolean[];
    setEnrollment: Dispatch<SetStateAction<boolean[]>>;
    available: boolean[];
    setAvailable: Dispatch<SetStateAction<boolean[]>>;
    start?: Date;
    setStart: Dispatch<SetStateAction<Date | undefined>>;
    end?: Date;
    setEnd: Dispatch<SetStateAction<Date | undefined>>;
    institution: string;
    setInstitution: Dispatch<SetStateAction<string>>;
    min: number;
    setMin: Dispatch<SetStateAction<number>>;
    max: number;
    setMax: Dispatch<SetStateAction<number>>;
    sort: string;
    setSort: Dispatch<SetStateAction<string>>;
    filterValues: FilterValues;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const value = useSearchState();

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = (): SearchContextProps => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error(
            "useSearchContext must be used within a SearchContextProvider"
        );
    }
    return context;
};
