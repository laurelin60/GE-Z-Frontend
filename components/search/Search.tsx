"use client";

import React, { useEffect, useState } from "react";
import { DropdownComponentSearch } from "../DropdownComponent";
import { SortDropdown } from "./FilterComponents";
import { useRouter, useSearchParams } from "next/navigation";
import { queryDatabase } from "./query-db";
import SearchResults from "./SearchResults";
import ScrollToTop from "./ScrollToTop";
import { FaFilter } from "react-icons/fa6";
import { SearchFilterPage, SearchFilters } from "./Filters";
import SearchBlurb from "./Blurb";
import { filterData } from "./filter-utils";
import { UNIVERSITY_GE } from "@/lib/constants";

import { analyticsEnum, logAnalytics } from "@/lib/analytics";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import Link from "next/link";

export interface CollegeObject {
    sendingInstitution: string;
    courseCode: string;
    courseName: string;
    cvcId: string;
    niceToHaves: string[];
    units: number;
    term: string;
    startMonth: number;
    startDay: number;
    endMonth: number;
    endDay: number;
    tuition: number;
    async: boolean;
    hasOpenSeats: boolean;
    hasPrereqs: boolean;
    instantEnrollment: boolean;
    fulfillsGEs: string[];
    articulatesTo: string[];
    assistPath: string;
}

export type FilterValues = {
    format: boolean[];
    enrollment: boolean[];
    available: boolean[];
    start: Date;
    end: Date | undefined;
    institution: string;
    min: number;
    max: number;
    sort: string;
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
        searchUniversity || Object.keys(UNIVERSITY_GE)[0],
    );
    const [ge, setGE] = useState(searchGE || UNIVERSITY_GE[university][4]);

    const [format, setFormat] = useState([true, true]);
    const [enrollment, setEnrollment] = useState([true]);
    const [available, setAvailable] = useState([true]);
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState<Date>();
    const [institution, setInstitution] = useState("Any Institution");
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(20);

    const [sort, setSort] = useState("Default Sort");

    const [courses, setCourses] = useState<CollegeObject[]>();

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

    const [open, setOpen] = useState(false);
    const [width, setWidth] = useState<number>(0);

    const handleFilterButtonClick = () => {
        setOpen((open) => !open);
    };

    const maxWidthForOpen = 1280;

    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
                const universityParam = university;
                const geParam = !ge.includes("GE") ? ge : ge.split(" ")[1];
                const data = await queryDatabase(universityParam, geParam);

                setCourses(data.courses);
                setLoading(false);
                setError(false);

                const enjoymentDismissalTime = window.localStorage.getItem(
                    "enjoymentDismissalTime",
                );
                const dismissedRecently =
                    enjoymentDismissalTime !== null &&
                    Date.now() - parseInt(enjoymentDismissalTime) <
                        4 * 7 * 24 * 3600 * 1000;

                const gezSearches = window.localStorage.getItem("gezSearches");

                const numSearches = gezSearches ? parseInt(gezSearches) : 0;

                if (!dismissedRecently && numSearches > 2) {
                    toast({
                        title: "Enjoying GE-Z?",
                        description:
                            "Support us by giving us a star on Github!",
                        action: (
                            <Link href="https://github.com/laurelin60/GE-Z-Frontend">
                                <ToastAction
                                    altText="Star us on Github"
                                    className="flex gap-x-2 border-2 border-accent drop-shadow-lg hover:drop-shadow-none"
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
                        Date.now().toString(),
                    );
                }

                window.localStorage.setItem(
                    "gezSearches",
                    (numSearches + 1).toString(),
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
            value: UNIVERSITY_GE[university].findIndex((item) => {
                return item.includes(ge);
            }),
        });

        fetchData();
    }, [university, ge, toast]);

    return (
        <>
            {open && width < maxWidthForOpen ? (
                <SearchFilterPage
                    handleClick={handleFilterButtonClick}
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
            ) : (
                <div className="wrapper mb-8 mt-8 min-h-[calc(100vh-96px)] px-4 md:mb-16 md:mt-16 lg:px-28 xl:px-36">
                    <div className="flex flex-wrap text-6xl font-bold">
                        Search{" "}
                        <span className="hidden lg:flex">
                            &nbsp;For Courses
                        </span>
                    </div>
                    <div className="mt-8 flex flex-row items-center justify-between">
                        <div className="flex flex-col flex-wrap gap-x-8 gap-y-2 md:flex-row xl:gap-8">
                            <DropdownComponentSearch
                                defaultValue={university}
                                data={Object.keys(UNIVERSITY_GE)}
                                onChange={handleUniversityChange}
                            />
                            <DropdownComponentSearch
                                defaultValue={ge}
                                data={UNIVERSITY_GE[university]}
                                onChange={handleGeChange}
                                key={university}
                            />
                        </div>
                    </div>
                    <div>
                        <SearchBlurb
                            filterData={filterData}
                            data={courses}
                            filterValues={filterValues}
                            searchUniversity={university}
                            searchGE={ge}
                        />
                        <div className="mt-8 flex flex-row gap-4 md:mt-16 md:gap-8">
                            <div className="bg-background-secondary hidden h-fit rounded-xl p-8 xl:flex xl:flex-col">
                                <div className="mb-8 text-3xl font-medium">
                                    Search Filters
                                </div>
                                <SearchFilters
                                    handleClick={handleFilterButtonClick}
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

                            <div className="w-full xl:min-w-[65%]">
                                <div className="mb-8 flex flex-wrap items-center justify-between gap-y-4 xl:justify-end">
                                    <button
                                        onClick={handleFilterButtonClick}
                                        className="flex items-center gap-2 rounded-full border-2 bg-accent px-4 py-2 text-white transition-all active:border-accent active:bg-transparent active:text-accent xl:hidden"
                                    >
                                        <FaFilter />
                                        Search Filters
                                    </button>

                                    <div className="flex items-center gap-4 md:flex-row">
                                        <div className="hidden text-muted sm:flex">
                                            Sort By:
                                        </div>
                                        <SortDropdown
                                            defaultValue={sort}
                                            data={[
                                                "Default Sort",
                                                "Alphabetical",
                                                "Tuition",
                                                "Shortest Term",
                                            ]}
                                            onChange={setSort}
                                        />
                                    </div>
                                </div>
                                {loading ? (
                                    <div className="mt-16 flex flex-col gap-2 text-2xl">
                                        <div className="flex justify-center">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src="/loading.gif"
                                                alt="loading gif"
                                                className="flex h-16 w-16 justify-center opacity-60"
                                            />
                                        </div>
                                        <div className="flex justify-center">
                                            Loading...
                                        </div>
                                    </div>
                                ) : error ? (
                                    <div className="mt-16 flex flex-col gap-2 text-2xl">
                                        <div className="flex justify-center">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src="/error.png"
                                                alt="error"
                                                className="flex w-[500px] justify-center"
                                            />
                                        </div>
                                        <div className="flex justify-center">
                                            An error occurred...
                                        </div>
                                    </div>
                                ) : (
                                    <SearchResults
                                        results={filterData(
                                            courses,
                                            filterValues,
                                        )}
                                        university={university}
                                        ge={ge}
                                    />
                                )}
                                <ScrollToTop />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Search;
