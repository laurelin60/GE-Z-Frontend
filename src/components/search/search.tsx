"use client";

import React, { useCallback } from "react";
import { SearchFilterDialog } from "@/components/search/filter/search-filter-dialog";
import { SearchFilterSortDropdown } from "@/components/search/filter/search-filter-sort-dropdown";
import { SearchBlurb } from "@/components/search/search-blurb";
import { SearchResults } from "@/components/search/search-results";
import type { CourseObject } from "@/components/search/search.types";
import { UNIVERSITIES, University, UNIVERSITY_GE } from "@/lib/constants";
import { parseAsStringLiteral, useQueryState } from "nuqs";

import { filterData } from "../../lib/utils/filter";
import { SearchFilter } from "./filter/search-filter";
import { SearchSelect } from "./SearchSelect";

interface SearchProps {
    university: University;
    ge: string;
    courses: CourseObject[];
    lastUpdated: number;
}

export function Search({
    university: _university,
    ge: _ge,
    courses,
    lastUpdated,
}: SearchProps) {
    const [university, setUniversity] = useQueryState(
        "university",
        parseAsStringLiteral(UNIVERSITIES)
            .withDefault(_university)
            .withOptions({
                shallow: false,
                clearOnDefault: false,
            })
    );
    const [ge, setGE] = useQueryState(
        "ge",
        parseAsStringLiteral(UNIVERSITY_GE[university])
            .withDefault(_ge)
            .withOptions({
                shallow: false,
                clearOnDefault: false,
            })
    );

    const handleUniversityChange = useCallback(
        (value: string) => {
            const university = value as University;

            setUniversity(university);
            setGE(UNIVERSITY_GE[university][0]);
        },
        [setGE, setUniversity]
    );

    const handleGeChange = useCallback(
        (ge: string) => {
            setGE(ge);
        },
        [setGE]
    );

    return (
        <div className="flex w-full flex-col space-y-4 px-4 py-8 md:space-y-8 md:px-8">
            <div className="flex flex-wrap text-6xl font-bold">
                Search <span className="hidden lg:flex">&nbsp;For Courses</span>
            </div>

            <div className="mt-4 flex flex-row items-center justify-between">
                <div className="grid w-fit grid-cols-2 gap-4">
                    <SearchSelect
                        value={university}
                        data={UNIVERSITIES}
                        onChange={handleUniversityChange}
                        placeholder="University"
                    />
                    <SearchSelect
                        value={ge}
                        data={UNIVERSITY_GE[university]}
                        onChange={handleGeChange}
                        placeholder="Category"
                    />
                </div>
            </div>

            <SearchBlurb
                filterData={filterData}
                courses={courses}
                lastUpdated={lastUpdated}
            />

            <div className="flex flex-row gap-4 md:gap-8">
                <div className="sticky top-8 hidden h-fit shrink-0 xl:flex">
                    <SearchFilter courses={courses} />
                </div>

                <div className="w-full">
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-y-4 xl:justify-end">
                        <SearchFilterDialog>
                            <SearchFilter courses={courses} />
                        </SearchFilterDialog>

                        <SearchFilterSortDropdown
                            data={[
                                "Default Sort",
                                "Alphabetical",
                                "Tuition",
                                "Shortest Term",
                            ]}
                        />
                    </div>

                    <SearchResults
                        courses={courses}
                        university={university}
                        ge={ge}
                    />
                </div>
            </div>
        </div>
    );
}
