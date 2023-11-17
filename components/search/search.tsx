"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { DropdownComponentSearch } from "../DropdownComponent";
import { GE_Categories, Institutions, Universities } from "@/lib/constants";
import {
    FaAward,
    FaChalkboard,
    FaCheck,
    FaChevronDown,
    FaSearch,
} from "react-icons/fa";
import {
    CalendarFilter,
    CustomFilterCheckbox,
    InstitutionDropdown,
    SortDropdown,
    UnitsFilter,
} from "./filterComponents";
import { FaCircleInfo, FaHandHoldingDollar } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";
import { queryDatabase } from "./queryDatabase";

export interface CollegeObject {
    college: string;
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
    mapsToCourses: string[];
    pdfID: string;
}

const Data = [
    {
        college: "Ohlone College",
        courseCode: "BA101A",
        courseName: "Financial Accounting",
        cvcId: "1051975",
        niceToHaves: ["Online Tutoring", "Quality Reviewed"],
        units: 5,
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
        mapsToCourses: ["RZ101 - Introduction to Rizzology"],
        pdfID: "12345678",
    },
];

const Tags = (props: any) => {
    const { tag } = props;

    if (tag == "Online Tutoring") {
        return (
            <div className="flex w-fit flex-row items-center gap-2 rounded-full border-2 border-gray px-4 py-1 font-medium text-gray">
                <div className="text-black">
                    <FaChalkboard />
                </div>
                <div>Online Tutoring</div>
            </div>
        );
    }

    if (tag == "Zero Textbook Cost") {
        return (
            <div className="flex w-fit flex-row items-center gap-2 rounded-full border-2 border-gray px-4 py-1 font-medium text-gray">
                <div className="text-black">
                    <FaHandHoldingDollar />
                </div>
                <div>Zero Textbook Cost</div>
            </div>
        );
    }

    if (tag == "Quality Reviewed") {
        return (
            <div className="flex w-fit flex-row items-center gap-2 rounded-full border-2 border-gray px-4 py-1 font-medium text-gray">
                <div className="text-black">
                    <FaAward />
                </div>
                <div>Quality Reviewed</div>
            </div>
        );
    }
};

const SearchResults = (props: any) => {
    const { results } = props;

    return (
        <>
            <div className="flex flex-col gap-8">
                {results.map((result: CollegeObject) => (
                    <div
                        className="rounded-t-lg border-2 border-gray"
                        key={
                            result.courseCode +
                            result.courseName +
                            result.college
                        }
                    >
                        <div className="flex flex-col gap-2 rounded-t-lg bg-bg_secondary px-8 py-4">
                            <div className="text-xl font-semibold text-primary">
                                {result.college}
                            </div>
                            <div className="text-3xl font-bold">
                                {result.courseCode} {result.courseName}
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-row gap-2 px-8 py-4">
                                {result.niceToHaves.map((tag) => (
                                    <Tags tag={tag} key={tag.toString()} />
                                ))}
                            </div>
                            <div className="border-2 border-t border-bg_secondary"></div>
                        </div>
                        <div className="flex justify-between px-8 py-4">
                            <div className="flex flex-row gap-8">
                                <div className="flex flex-col">
                                    <div className="text-sm font-medium">
                                        Units
                                    </div>
                                    <div className="text-base font-light">
                                        {`${result.units.toFixed(1)} Units`}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-sm font-medium">
                                        Term
                                    </div>
                                    <div className="text-base font-light">
                                        {result.term}
                                    </div>
                                </div>
                                {/* <div className="flex flex-col">
                                    <div className="text-sm font-medium">
                                        Transferability
                                    </div>
                                    <div className="flex flex-row gap-4 text-base font-light">
                                        {result.mapsToCourses.map((item) => (
                                            <div
                                                className="flex items-center gap-2"
                                                key={item}
                                            >
                                                <FaCheck />
                                                <div>{item}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div> */}
                            </div>
                            <div className="flex flex-row items-center gap-3 text-2xl font-semibold">
                                Tuition:{" "}
                                <span className="text-primary">
                                    {`$${result.tuition.toFixed(2)}`}
                                </span>
                                <div className="text-xl">
                                    <FaCircleInfo />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

const Search = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState(true);

    const searchUniversity = searchParams.get("university");
    const searchGE = searchParams.get("ge");

    const [university, setUniversity] = useState(
        searchUniversity || Universities[0],
    );
    const [ge, setGE] = useState(searchGE || GE_Categories[0]);

    const [async, setAsync] = useState([true, true]); // Async first, then synch
    const [enrollment, setEnrollment] = useState([true]);
    const [available, setAvailable] = useState([false]);
    const [start, setStart] = useState(new Date().toLocaleDateString("en-CA"));
    const [end, setEnd] = useState<string>();
    const [institution, setInstitution] = useState("Any Institution");
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(20);

    const [sort, setSort] = useState("Default Sort");

    const [data, setData] = useState<CollegeObject[]>([]);

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            try {
                const geParam = !ge.includes("GE") ? ge : ge.split(" ")[1];
                const data = await queryDatabase(geParam);

                setData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

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
            return (
                ((async[0] && async[1]) ||
                    (result.async && async[0]) ||
                    (result.async == false && async[1])) &&
                result.instantEnrollment == enrollment[0] &&
                result.hasOpenSeats == available[0] &&
                (result.college == institution ||
                    institution == "Any Institution") &&
                result.units >= min &&
                result.units <= max &&
                startsAfter(result) &&
                endsBefore(result)
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
            <div className="mt-16 min-h-[calc(100vh-96px)] px-36">
                <div className="text-6xl font-bold">Search For Courses</div>

                <form
                    action="submit"
                    onSubmit={handleSubmit}
                    className="mt-8 flex flex-row items-center justify-between"
                >
                    <div className="mr-8 flex flex-row gap-4 xl:gap-8">
                        <DropdownComponentSearch
                            defaultValue={university}
                            data={Universities}
                            onChange={setUniversity}
                        />
                        <DropdownComponentSearch
                            defaultValue={ge}
                            data={GE_Categories}
                            onChange={setGE}
                        />
                    </div>

                    <div className="flex place-content-center">
                        <button
                            type="submit"
                            className="flex h-16 w-48 flex-row place-content-center items-center justify-center gap-4 rounded-2xl bg-primary text-2xl font-semibold text-white transition-all active:border-4 active:border-primary active:bg-transparent active:text-primary xl:h-16 xl:w-56 xl:text-3xl"
                        >
                            <div>Search</div>
                            <FaSearch />
                        </button>
                    </div>
                </form>

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        {/* Search Results Blurb */}
                        <div className="mt-16 flex flex-col gap-8">
                            <div className="text-4xl font-medium">
                                Search Results
                            </div>
                            <div className="text-xl font-normal text-gray">
                                We found{" "}
                                <b className="text-black">
                                    {data.length} courses
                                </b>{" "}
                                that may transfer to{" "}
                                <b className="text-black">{searchUniversity}</b>{" "}
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
                                . Please consult an academic advisor for further
                                information.
                            </div>
                            <div className="border-2 border-t border-bg_secondary"></div>
                        </div>
                        <div className="mt-16 flex flex-row gap-8">
                            <div className="h-fit w-[450px] rounded-xl bg-bg_secondary p-8">
                                <div className="mb-8 text-3xl font-medium">
                                    Search Filters
                                </div>
                                <div className="flex flex-col gap-4">
                                    {/* <CustomFilterCheckbox
                                    title="Terms"
                                    // DISABLED FOR WEBJAM
                                    categories={[
                                        // "Fall 2023",
                                        "Winter 2024",
                                        // "Spring 2024",
                                    ]}
                                /> */}
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
                                <div className="mb-8 flex items-center justify-end gap-4">
                                    <div className="text-lg text-gray">
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
                                <SearchResults results={filterData(data)} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Search;
