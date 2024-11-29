import React, { Suspense } from "react";
import Search from "@/components/search/Search";

const SearchPage = () => {
    return (
        <Suspense>
            <Search />
        </Suspense>
    );
};

export default SearchPage;
