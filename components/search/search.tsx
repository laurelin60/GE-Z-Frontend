"use client";

import React, { FormEvent, useState } from "react";
import { DropdownComponentSearch } from "../DropdownComponent";
import { GE_Categories, Institutions, Universities } from "@/lib/constants";
import { FaChalkboard, FaCheck, FaChevronDown, FaSearch } from "react-icons/fa";
import {
    CalendarFilter,
    CustomFilterCheckbox,
    InstitutionDropdown,
    UnitsFilter,
} from "./filterComponents";
import { FaCircleInfo, FaHandHoldingDollar } from "react-icons/fa6";

const Results = [
    {
        title: "CS150 - Computer Graphics - Illustrator",
        institution: "Irvine Valley College",
        tags: ["Online Tutoring", "Zero Textbook Cost"],
        units: 3.0,
        start: "Jan 08",
        end: "March 26",
        transferability: ["IGETC", "CSU Breadth"],
        tuition: 138,
    },
    {
        title: "ANTHRO125 - Sex, Gender, and Culture",
        institution: "Foothill College",
        tags: ["Online Tutoring"],
        units: 4.0,
        start: "Jan 11",
        end: "March 31",
        transferability: ["IGETC"],
        tuition: 120,
    },
];

const Tags = (props: any) => {
    const { tag } = props;

    if (tag == "Online Tutoring") {
        return (
            <div className="border-gray text-gray flex w-fit flex-row items-center gap-2 rounded-full border-2 px-4 py-1 font-medium">
                <div className="text-black">
                    <FaChalkboard />
                </div>
                <div>Online Tutoring</div>
            </div>
        );
    }

    if (tag == "Zero Textbook Cost") {
        return (
            <div className="border-gray text-gray flex w-fit flex-row items-center gap-2 rounded-full border-2 px-4 py-1 font-medium">
                <div className="text-black">
                    <FaHandHoldingDollar />
                </div>
                <div>Zero Textbook Cost</div>
            </div>
        );
    }
};

const SearchResults = () => {
    return (
        <>
            <div className="flex flex-col gap-8">
                {Results.map((result) => (
                    <div
                        className="border-gray rounded-t-lg border-2"
                        key={result.title + result.institution}
                    >
                        <div className="flex flex-col gap-2 rounded-t-lg bg-bg_secondary px-8 py-4">
                            <div className="text-xl font-semibold text-primary">
                                {result.institution}
                            </div>
                            <div className="text-3xl font-bold">
                                {result.title}
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-row gap-2 px-8 py-4">
                                {result.tags.map((tag) => (
                                    <Tags tag={tag} key={tag} />
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
                                        {`${result.start} - ${result.end}`}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-sm font-medium">
                                        Transferability
                                    </div>
                                    <div className="flex flex-row gap-4 text-base font-light">
                                        {result.transferability.map((item) => (
                                            <div
                                                className="flex items-center gap-2"
                                                key={item}
                                            >
                                                <FaCheck />
                                                <div>{item}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
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
    const [university, setUniversity] = useState(Universities[0]);
    const [ge, setGE] = useState(GE_Categories[0]);

    const [start, setStart] = useState(new Date().toLocaleDateString("en-CA"));
    const [end, setEnd] = useState();

    const [institution, setInstitution] = useState(Institutions[0]);

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(20);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // console.log(university);
        // console.log(ge);

        return;
    };

    return (
        <>
            <div className="mt-16 min-h-[calc(100vh-96px)] px-36">
                <div className="text-6xl font-bold">Search For Courses</div>

                <div className="mt-8 flex flex-row items-center justify-between">
                    <div className="mr-8 flex flex-row gap-4 xl:gap-8">
                        <DropdownComponentSearch
                            defaultValue={Universities[0]}
                            data={Universities}
                            onChange={setUniversity}
                        />
                        <DropdownComponentSearch
                            defaultValue={GE_Categories[0]}
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
                </div>

                {/* Search Results Blurb */}
                <div className="mt-16 flex flex-col gap-8">
                    <div className="text-4xl font-medium">Search Results</div>

                    <div className="text-gray text-xl font-normal">
                        We found <b className="text-black">31 courses</b> that
                        may transfer to{" "}
                        <b className="text-black">
                            University of California - Irvine
                        </b>{" "}
                        for <b className="text-black">GE Category III</b> based
                        on{" "}
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
                            <CustomFilterCheckbox
                                title="Terms"
                                categories={[
                                    "Fall 2023",
                                    "Winter 2024",
                                    "Spring 2024",
                                ]}
                            />
                            <CustomFilterCheckbox
                                title="Online Format"
                                categories={["Synchronous", "Asynchronous"]}
                            />
                            <CustomFilterCheckbox
                                title="Instant Enrollment"
                                categories={["Instant Enrollment"]}
                            />
                            <CustomFilterCheckbox
                                title="Available Seats"
                                categories={[
                                    "Only show courses with available seats that are open for registration or open within three days",
                                ]}
                            />
                            <CalendarFilter
                                onStartChange={setStart}
                                onEndChange={setEnd}
                            />
                            <InstitutionDropdown
                                defaultValue={Institutions[0]}
                                data={Institutions}
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
                            <div className="text-gray text-lg">Sort By:</div>
                            <div className="relative flex flex-col">
                                <div className="relative">
                                    <select
                                        // value={value}
                                        // onChange={handleChange}
                                        className="text-regular border-gray block h-full w-full appearance-none overflow-ellipsis rounded-lg border-[1px] px-4 py-2 pr-12"
                                    >
                                        {/* {data.map((item) => (
                                            <option key={item}>{item}</option>
                                        ))} */}
                                        <option>Alphabetical</option>
                                    </select>
                                    <div className="text-gray absolute right-1 top-[14px] h-8 w-8">
                                        <FaChevronDown />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <SearchResults />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;
