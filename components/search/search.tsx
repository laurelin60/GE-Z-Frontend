"use client";

import React, { useEffect, useState } from "react";
import { DropdownComponentSearch } from "../DropdownComponent";
import { SortDropdown } from "./filterComponents";
import { useRouter, useSearchParams } from "next/navigation";
import { queryDatabase } from "./queryDatabase";
import SearchResults from "./searchResults";
import { FaFilter } from "react-icons/fa6";
import { SearchFilterPage, SearchFilters } from "./filters";
import SearchBlurb from "./blurb";
import { filterData } from "./searchUtils";
import { UNIVERSITY_GE } from "@/lib/constants";

export interface CollegeObject {
    sendingInstitution: string;
    courseCode: string;
    courseName: string;
    cvcId: string;
    niceToHaves: string[];
    units: string;
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
    start: string;
    end: string | undefined;
    institution: string;
    min: number;
    max: number;
    sort: string;
};

const Search = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const searchUniversity = searchParams.get("university");
    const searchGE = searchParams.get("ge");

    const [university, setUniversity] = useState(
        searchUniversity || Object.keys(UNIVERSITY_GE)[0],
    );
    const [ge, setGE] = useState(searchGE || UNIVERSITY_GE[university][0]);

    const [format, setFormat] = useState([true, true]);
    const [enrollment, setEnrollment] = useState([true]);
    const [available, setAvailable] = useState([true]);
    const [start, setStart] = useState(new Date().toLocaleDateString("en-CA"));
    const [end, setEnd] = useState<string>();
    const [institution, setInstitution] = useState("Any Institution");
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(20);

    const [sort, setSort] = useState("Default Sort");

    const [courses, setCourses] = useState<CollegeObject[]>([]);

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
        const geParam = encodeURIComponent(UNIVERSITY_GE[university][0]);

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
            } catch (error) {
                setLoading(false);
                setError(true);
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [university, ge]);

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
                <div className="mb-8 mt-8 min-h-[calc(100vh-96px)] px-8 md:mb-16 md:mt-16 lg:px-28 xl:px-36">
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
                        <div>
                            <SearchBlurb
                                filterData={filterData}
                                data={courses}
                                filterValues={filterValues}
                                searchUniversity={university}
                                searchGE={ge}
                            />
                            <div className="mt-8 flex flex-row gap-4 md:mt-16 md:gap-8">
                                <div className="hidden h-fit rounded-xl bg-bg_secondary p-8 xl:flex xl:flex-col">
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
                                            className="flex items-center gap-2 rounded-full border-2 bg-primary px-4 py-2 text-white transition-all active:border-primary active:bg-transparent active:text-primary xl:hidden"
                                        >
                                            <FaFilter />
                                            Search Filters
                                        </button>

                                        <div className="flex items-center gap-4 md:flex-row">
                                            <div className="hidden text-gray sm:flex">
                                                Sort By:
                                            </div>
                                            <SortDropdown
                                                defaultValue={sort}
                                                data={[
                                                    "Default Sort",
                                                    "Alphabetical",
                                                    "Tuition",
                                                ]}
                                                onChange={setSort}
                                            />
                                        </div>
                                    </div>
                                    <SearchResults
                                        results={filterData(
                                            courses,
                                            filterValues,
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Search;
