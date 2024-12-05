"use client";

import React, { useCallback, useEffect, useState } from "react";
import { SearchFilterDialog } from "@/components/search/filter/search-filter-dialog";
import { SearchFilterSortDropdown } from "@/components/search/filter/search-filter-sort-dropdown";
import { SearchBlurb } from "@/components/search/search-blurb";
import { SearchResults } from "@/components/search/search-results";
import type {
    CourseObject,
    FilterValues,
} from "@/components/search/search.types";
import { UNIVERSITY_GE } from "@/lib/constants";
import { useQueryState } from "nuqs";

import { filterData } from "../../lib/utils/filter";
import { SearchFilter } from "./filter/search-filter";
import { SearchSelect } from "./SearchSelect";

export function Search({
    university: _university,
    ge: _ge,
    courses,
    lastUpdated,
}: {
    university: string;
    ge: string;
    courses: CourseObject[];
    lastUpdated: number;
}) {
    const [university, setUniversity] = useQueryState("uni", {
        defaultValue: _university,
        shallow: false,
        clearOnDefault: false,
    });
    const [ge, setGE] = useQueryState("ge", {
        defaultValue: _ge,
        shallow: false,
        clearOnDefault: false,
    });

    const [format, setFormat] = useState([true, true]);
    const [enrollment, setEnrollment] = useState([true]);
    const [available, setAvailable] = useState([true]);
    const [start, setStart] = useState<Date>();
    const [end, setEnd] = useState<Date>();
    const [institution, setInstitution] = useState("Any Institution");
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(20);

    const [sort, setSort] = useState("Default Sort");

    const [filterValues, setFilterValues] = useState<FilterValues>({
        format: format,
        enrollment: enrollment,
        available: available,
        start: start,
        end: end,
        institution: institution,
        min: min,
        max: max,
        sort: sort,
    });

    useEffect(() => {
        setFilterValues({
            format,
            enrollment,
            available,
            start,
            end,
            institution,
            min,
            max,
            sort,
        });
    }, [
        format,
        enrollment,
        available,
        start,
        end,
        institution,
        min,
        max,
        sort,
    ]);

    const handleUniversityChange = useCallback(
        (university: string) => {
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
        <div className="wrapper mb-8 min-h-[calc(100vh-96px)] px-4 md:mb-16 lg:px-28 xl:px-36">
            <div className="flex flex-wrap text-6xl font-bold">
                Search <span className="hidden lg:flex">&nbsp;For Courses</span>
            </div>

            <div className="mt-4 flex flex-row items-center justify-between">
                <div className="flex w-full flex-row flex-wrap gap-x-4 gap-y-2">
                    <SearchSelect
                        value={university}
                        data={Object.keys(UNIVERSITY_GE)}
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
                filterValues={filterValues}
                lastUpdated={lastUpdated}
            />

            <div className="mt-4 flex flex-row gap-4 md:mt-8 md:gap-8">
                <div className="hidden h-fit xl:flex xl:flex-col">
                    <SearchFilter
                        setFormat={setFormat}
                        setEnrollment={setEnrollment}
                        setAvailable={setAvailable}
                        setStart={setStart}
                        setEnd={setEnd}
                        setInstitution={setInstitution}
                        setMin={setMin}
                        setMax={setMax}
                        filterValues={filterValues}
                        courses={courses}
                    />
                </div>

                <div className="w-full xl:w-[65%]">
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-y-4 xl:justify-end">
                        <SearchFilterDialog>
                            <SearchFilter
                                setFormat={setFormat}
                                setEnrollment={setEnrollment}
                                setAvailable={setAvailable}
                                setStart={setStart}
                                setEnd={setEnd}
                                setInstitution={setInstitution}
                                setMin={setMin}
                                setMax={setMax}
                                filterValues={filterValues}
                                courses={courses}
                            />
                        </SearchFilterDialog>

                        <SearchFilterSortDropdown
                            value={sort}
                            onChange={setSort}
                            data={[
                                "Default Sort",
                                "Alphabetical",
                                "Tuition",
                                "Shortest Term",
                            ]}
                        />
                    </div>

                    <SearchResults
                        results={filterData(courses, filterValues)}
                        university={university}
                        ge={ge}
                    />
                </div>
            </div>
        </div>
    );
}
