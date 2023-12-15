"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { DropdownComponentSearch } from "../DropdownComponent";
import { GE_Categories, Universities } from "@/lib/constants";
import {
    CalendarFilter,
    CustomFilterCheckbox,
    InstitutionDropdown,
    SortDropdown,
    UnitsFilter,
} from "./filterComponents";
import { useRouter, useSearchParams } from "next/navigation";
import { queryDatabase } from "./queryDatabase";
import SearchResults from "./searchResults";
import { FaCircleXmark, FaFilter } from "react-icons/fa6";

export interface CollegeObject {
    college: string;
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
    mapToCourses: string[];
    pdfId: string;
}

const Data = [
    {
        college: "Ohlone College",
        courseCode: "BA101A",
        courseName: "Financial Accounting",
        cvcId: "1051975",
        niceToHaves: ["Online Tutoring", "Quality Reviewed"],
        units: "5",
        term: "Jan 22 - May 17",
        startMonth: 1,
        startDay: 22,
        endMonth: 5,
        endDay: 17,
        tuition: 230,
        async: true,
        hasOpenSeats: false,
        hasPrereqs: false,
        instantEnrollment: true,
        fulfillsGEs: ["Ia", "II", "VI"],
        mapToCourses: ["RZ101 - Introduction to Rizzology"],
        pdfId: "12345678",
    },
];

const Search = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const searchUniversity = searchParams.get("university");
    const searchGE = searchParams.get("ge");

    const [university, setUniversity] = useState(
        searchUniversity || Universities[0],
    );
    const [ge, setGE] = useState(searchGE || GE_Categories[0]);

    const [async, setAsync] = useState([true, true]); // Async first, then synch
    const [enrollment, setEnrollment] = useState([true]);
    const [available, setAvailable] = useState([true]);
    const [start, setStart] = useState(new Date().toLocaleDateString("en-CA"));
    const [end, setEnd] = useState<string>();
    const [institution, setInstitution] = useState("Any Institution");
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(20);

    const [sort, setSort] = useState("Default Sort");

    const [data, setData] = useState<CollegeObject[]>([]);

    const [open, setOpen] = useState(false);
    const [width, setWidth] = useState<number>(0);

    const handleClick = () => {
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

        router.push(
            `/search?university=${encodeURIComponent(
                university,
            )}&ge=${encodeURIComponent(ge)}`,
        );
    };

    const handleGeChange = (ge: string) => {
        setGE(ge);

        router.push(
            `/search?university=${encodeURIComponent(
                university,
            )}&ge=${encodeURIComponent(ge)}`,
        );
    };

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                const geParam = !ge.includes("GE") ? ge : ge.split(" ")[1];
                const data = await queryDatabase(geParam);

                setData(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setLoading(false);
                setError(true);
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [ge]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        router.push(
            `/search?university=${encodeURIComponent(
                university,
            )}&ge=${encodeURIComponent(ge)}`,
        );
    };

    const startsAfter = (result: CollegeObject) => {
        if (start == undefined) return true;

        return (
            `2024-${result.startMonth
                .toString()
                .padStart(2, "0")}-${result.startDay
                .toString()
                .padStart(2, "0")}` >= start
        );
    };

    const endsBefore = (result: CollegeObject) => {
        if (end == undefined) return true;

        return (
            `2024-${result.endMonth.toString().padStart(2, "0")}-${result.endDay
                .toString()
                .padStart(2, "0")}` <= end
        );
    };

    function filterData(data: CollegeObject[]) {
        const filteredResults = data?.filter((result) => {
            const onlineFormat =
                (async[0] && async[1]) ||
                (result.async && async[0]) ||
                (result.async == false && async[1]);
            const instantEnrollment = enrollment[0]
                ? result.instantEnrollment
                : true;
            const hasOpenSeats = available[0] ? result.hasOpenSeats : true;
            const teachingInstitution =
                result.college == institution ||
                institution == "Any Institution";
            const withinUnits =
                parseFloat(result.units) >= min &&
                parseFloat(result.units) <= max;
            const withinTime = startsAfter(result) && endsBefore(result);

            return (
                onlineFormat &&
                instantEnrollment &&
                hasOpenSeats &&
                teachingInstitution &&
                withinUnits &&
                withinTime
            );
        });

        const sortedResults =
            sort == "Alphabetical"
                ? filteredResults.sort((courseA, courseB) => {
                      const nameA = courseA.courseCode + courseA.courseName;
                      const nameB = courseB.courseCode + courseB.courseName;

                      return nameA.localeCompare(nameB);
                  })
                : sort == "Tuition"
                  ? filteredResults.sort((courseA, courseB) => {
                        return courseA.tuition - courseB.tuition;
                    })
                  : filteredResults;

        return sortedResults;
    }

    return (
        <>
            {open && width < maxWidthForOpen ? (
                <div className="absolute left-0 top-0 z-50 h-fit w-[100vw] bg-bg_secondary p-8 xl:hidden">
                    <div className="mb-8 flex flex-row justify-between">
                        <div className="text-3xl font-medium">
                            Search Filters
                        </div>
                        <div className="items-top flex">
                            <button
                                className="flex flex-row items-center gap-2 text-3xl text-primary"
                                onClick={handleClick}
                            >
                                <FaCircleXmark />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <CustomFilterCheckbox
                            title="Online Format"
                            categories={["Asynchronous", "Synchronous"]}
                            onChange={setAsync}
                            defaultValue={async[0]}
                        />
                        <CustomFilterCheckbox
                            title="Instant Enrollment"
                            categories={[
                                "Only show courses eligible for One-Click Registration between your home school and the teaching school",
                            ]}
                            onChange={setEnrollment}
                            defaultValue={enrollment[0]}
                        />
                        <CustomFilterCheckbox
                            title="Available Seats"
                            categories={[
                                "Only show courses with available seats that are open for registration or open within three days",
                            ]}
                            onChange={setAvailable}
                            defaultValue={available[0]}
                        />
                        <CalendarFilter
                            onStartChange={setStart}
                            onEndChange={setEnd}
                        />
                        <InstitutionDropdown
                            defaultValue={"Any Institution"}
                            data={data}
                            onChange={setInstitution}
                        />
                        <UnitsFilter
                            onMinChange={setMin}
                            onMaxChange={setMax}
                        />
                    </div>
                </div>
            ) : (
                <div className="mb-8 mt-8 min-h-[calc(100vh-96px)] px-8 md:mb-16 md:mt-16 lg:px-28 xl:px-36">
                    <div className="flex flex-wrap text-6xl font-bold">
                        Search{" "}
                        <span className="hidden lg:flex">
                            &nbsp;For Courses
                        </span>
                    </div>

                    <form
                        action="submit"
                        onSubmit={handleSubmit}
                        className="mt-8 flex flex-row items-center justify-between"
                    >
                        <div className="flex flex-col flex-wrap gap-x-8 gap-y-2 md:flex-row xl:gap-8">
                            <DropdownComponentSearch
                                defaultValue={university}
                                data={Universities}
                                onChange={handleUniversityChange}
                            />
                            <DropdownComponentSearch
                                defaultValue={ge}
                                data={GE_Categories}
                                onChange={handleGeChange}
                            />
                        </div>

                        {/* <div className="flex place-content-center">
                        <button
                            type="submit"
                            className="flex h-16 w-48 flex-row place-content-center items-center justify-center gap-4 rounded-2xl bg-primary text-2xl font-semibold text-white transition-all active:border-4 active:border-primary active:bg-transparent active:text-primary xl:h-16 xl:w-56 xl:text-3xl"
                        >
                            <div>Search</div>
                            <FaSearch />
                        </button>
                    </div> */}
                    </form>

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
                            {/* Search Results Blurb */}
                            <div className="mt-8 flex flex-col gap-4 md:mt-16 md:gap-8">
                                <div className="text-3xl font-medium md:text-4xl">
                                    Search Results
                                </div>
                                <div className="flex flex-col gap-2 text-lg font-normal text-gray md:text-xl">
                                    <div>
                                        We found{" "}
                                        <b className="text-black">
                                            {filterData(data).length} courses
                                        </b>{" "}
                                        that may articulate to{" "}
                                        <b className="text-black">
                                            {searchUniversity}
                                        </b>{" "}
                                        for{" "}
                                        <b className="text-black">{`${searchGE?.split(
                                            " ",
                                        )[0]} Category ${searchGE?.split(
                                            " ",
                                        )[1]}`}</b>{" "}
                                        based on{" "}
                                        <a
                                            href="https://assist.org/"
                                            target="_blank"
                                            referrerPolicy="no-referrer"
                                            className="underline underline-offset-[5px]"
                                        >
                                            Assist.org
                                        </a>{" "}
                                        and{" "}
                                        <a
                                            href="https://cvc.edu/"
                                            target="_blank"
                                            referrerPolicy="no-referrer"
                                            className="underline underline-offset-[5px]"
                                        >
                                            CVC.edu
                                        </a>
                                        . Please consult an academic advisor for
                                        further information.
                                    </div>
                                    <div className="flex text-base font-light text-gray md:justify-end">
                                        {"GE-Z's"} data was last updated on 12/7
                                    </div>
                                </div>

                                <div className="border-2 border-t border-bg_secondary"></div>
                            </div>

                            <div className="mt-8 flex flex-row gap-4 md:mt-16 md:gap-8">
                                <div className="hidden h-fit w-[550px] rounded-xl bg-bg_secondary p-8 xl:flex xl:flex-col">
                                    <div className="mb-8 text-3xl font-medium">
                                        Search Filters
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <CustomFilterCheckbox
                                            title="Online Format"
                                            categories={[
                                                "Asynchronous",
                                                "Synchronous",
                                            ]}
                                            onChange={setAsync}
                                            defaultValue={async[0]}
                                        />
                                        <CustomFilterCheckbox
                                            title="Instant Enrollment"
                                            categories={[
                                                "Only show courses eligible for One-Click Registration between your home school and the teaching school",
                                            ]}
                                            onChange={setEnrollment}
                                            defaultValue={enrollment[0]}
                                        />
                                        <CustomFilterCheckbox
                                            title="Available Seats"
                                            categories={[
                                                "Only show courses with available seats that are open for registration or open within three days",
                                            ]}
                                            onChange={setAvailable}
                                            defaultValue={available[0]}
                                        />
                                        <CalendarFilter
                                            onStartChange={setStart}
                                            onEndChange={setEnd}
                                        />
                                        <InstitutionDropdown
                                            defaultValue={"Any Institution"}
                                            data={data}
                                            onChange={setInstitution}
                                        />
                                        <UnitsFilter
                                            onMinChange={setMin}
                                            onMaxChange={setMax}
                                        />
                                    </div>
                                </div>

                                <div className="w-[100%]">
                                    <div className="mb-8 flex flex-wrap items-center justify-between gap-y-4 xl:justify-end">
                                        <button
                                            onClick={handleClick}
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
                                    <SearchResults results={filterData(data)} />
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
