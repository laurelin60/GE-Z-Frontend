"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchFilterDialog } from "@/components/search/filter/search-filter-dialog";
import { SearchFilterSortDropdown } from "@/components/search/filter/search-filter-sort-dropdown";
import { SearchBlurb } from "@/components/search/search-blurb";
import { SearchResults } from "@/components/search/search-results";
import { analyticsEnum, logAnalytics } from "@/lib/analytics";
import { UNIVERSITY_GE } from "@/lib/constants";
import { getDismissedRecently, getNumSearches } from "@/lib/utils/search";

import { filterData } from "../../lib/utils/filter";
import { queryDatabase } from "../../lib/utils/query-db";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";
import { SearchFilter } from "./filter/search-filter";
import ScrollToTop from "./ScrollToTop";
import { SearchSelect } from "./SearchSelect";

export interface CourseObject {
    sendingInstitution: string;
    courseCode: string;
    courseName: string;
    cvcId: string;
    assistPath: string;
    niceToHaves: string[];
    units: number;
    tuition: number;
    startDate: number;
    endDate: number;
    async: boolean;
    hasOpenSeats: boolean;
    hasPrereqs: boolean;
    instantEnrollment: boolean;
    fulfillsGEs: FullFillsGE[];
    articulatesTo: string[];
}

type FullFillsGE = {
    category: string;
    count: number;
};

export type FilterValues = {
    format: boolean[];
    enrollment: boolean[];
    available: boolean[];
    start: Date | undefined;
    end: Date | undefined;
    institution: string;
    min: number;
    max: number;
    sort: string;
};

const LoadingState = () => {
    return (
        <div className="mt-16 flex flex-col gap-2 text-2xl">
            <div className="flex justify-center">
                <img
                    src="/loading.gif"
                    alt="loading gif"
                    className="pointer-events-none flex h-16 w-16 justify-center opacity-60"
                />
            </div>
            <div className="flex justify-center">Loading...</div>
        </div>
    );
};

const ErrorState = () => {
    return (
        <div className="mt-16 flex flex-col gap-2 text-2xl">
            <div className="flex justify-center">
                <img
                    src="/error.png"
                    alt="error"
                    className="pointer-events-none flex w-[500px] justify-center"
                />
            </div>
            <div className="flex justify-center">An error occurred...</div>
        </div>
    );
};

const Search = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const searchUniversity = searchParams.get("uni");
    const searchGE = searchParams.get("ge");

    const [university, setUniversity] = useState(
        searchUniversity || Object.keys(UNIVERSITY_GE)[0]
    );
    const [ge, setGE] = useState(searchGE || UNIVERSITY_GE[university][4]);

    const [format, setFormat] = useState([true, true]);
    const [enrollment, setEnrollment] = useState([true]);
    const [available, setAvailable] = useState([true]);
    const [start, setStart] = useState<Date>();
    const [end, setEnd] = useState<Date>();
    const [institution, setInstitution] = useState("Any Institution");
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(20);

    const [sort, setSort] = useState("Default Sort");

    const [courses, setCourses] = useState<CourseObject[]>();
    const [lastUpdated, setLastUpdated] = useState<number>();

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

    const handleUniversityChange = (university: string) => {
        setUniversity(university);
        setGE(UNIVERSITY_GE[university][0]);

        const universityParam = encodeURIComponent(university);
        const geParam = encodeURIComponent(UNIVERSITY_GE[university][0]);

        router.push(`/search?uni=${universityParam}&ge=${geParam}`);
    };

    const handleGeChange = (ge: string) => {
        setGE(ge);

        const universityParam = encodeURIComponent(university);
        const geParam = encodeURIComponent(ge);

        router.push(`/search?uni=${universityParam}&ge=${geParam}`);
    };

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                const courses = await queryDatabase(university, ge);

                setCourses(courses.data);
                setLastUpdated(courses.lastUpdated);
                setLoading(false);
                setError(false);

                const dismissedRecently = getDismissedRecently();
                const numSearches = getNumSearches();

                if (!dismissedRecently && numSearches > 2) {
                    toast({
                        title: "Enjoying GE-Z?",
                        description:
                            "Support us by giving us a star on Github!",
                        action: (
                            <Link href="https://github.com/laurelin60/GE-Z-Frontend">
                                <ToastAction
                                    altText="Star us on Github"
                                    className="flex gap-x-2 border-2 border-primary drop-shadow-lg hover:drop-shadow-none"
                                >
                                    Star{" "}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        className="h-3 w-3"
                                    >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                </ToastAction>
                            </Link>
                        ),
                    });

                    window.localStorage.setItem(
                        "enjoymentDismissalTime",
                        Date.now().toString()
                    );
                }

                window.localStorage.setItem(
                    "gezSearches",
                    (numSearches + 1).toString()
                );
            } catch (error) {
                setLoading(false);
                setError(true);
                console.error("Error fetching data:", error);
            }
        };

        logAnalytics({
            category: analyticsEnum.search.title,
            action: analyticsEnum.search.actions.SEARCH,
            label: university,
            value: UNIVERSITY_GE[university]?.findIndex((item) => {
                return item.includes(ge);
            }),
        });

        fetchData();
    }, [university, ge, toast]);

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

                    {loading ? (
                        <LoadingState />
                    ) : error ? (
                        <ErrorState />
                    ) : (
                        <SearchResults
                            results={filterData(courses, filterValues)}
                            university={university}
                            ge={ge}
                        />
                    )}
                    <ScrollToTop />
                </div>
            </div>
        </div>
    );
};

export default Search;
