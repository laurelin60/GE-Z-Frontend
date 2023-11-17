import React from "react";
import { FaUpRightFromSquare } from "react-icons/fa6";
import { CollegeObject } from "./search";
import Tags from "./tags";

interface SearchResultsProps {
    results: CollegeObject[];
}

const SearchResults = (props: SearchResultsProps) => {
    const { results } = props;

    return (
        <>
            <div className="flex flex-col gap-8">
                {results.map((result: CollegeObject) => {
                    return (
                        <div
                            className="rounded-t-lg border-2 border-gray"
                            key={
                                result.courseCode +
                                result.courseName +
                                result.college
                            }
                        >
                            <div className="flex flex-col gap-2 rounded-t-lg bg-bg_secondary px-8 py-4">
                                <div className="w-[500px] truncate text-xl font-semibold text-primary">
                                    {result.college}
                                </div>
                                <div className="flex flex-row justify-between">
                                    <div className="text-3xl font-bold">
                                        {result.courseCode} {result.courseName}
                                    </div>
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
                                            {`${result.units} Units`}
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
                                    <div className="flex flex-col">
                                        <div className="text-sm font-medium">
                                            GEs
                                        </div>
                                        <div className="flex flex-row gap-2 text-base font-light">
                                            {result.fulfillsGEs.join(", ")}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="text-sm font-medium">
                                            Articulates To
                                        </div>
                                        <div className="flex flex-row gap-2 text-base font-light">
                                            {result.mapToCourses.join(", ")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-2 border-t border-bg_secondary"></div>
                            <div className="flex justify-between px-8 py-4">
                                <div className="flex flex-row items-center gap-3 text-2xl font-semibold">
                                    Tuition:{" "}
                                    <span className="text-primary">
                                        {`$${result.tuition.toFixed(2)}`}
                                    </span>
                                    {/* <div className="text-xl">
                                        <FaCircleInfo />
                                    </div> */}
                                </div>
                                <div className="flex items-center gap-4 font-medium">
                                    <button className="rounded-lg border-2 border-primary bg-primary px-4 py-1 text-white transition-all active:border-2 active:border-primary active:bg-transparent active:text-primary">
                                        <a
                                            href={`https://assist.org/transfer/report/${result.pdfId}`}
                                            target="_blank"
                                            referrerPolicy="no-referrer"
                                            className="flex flex-row items-center gap-2"
                                        >
                                            View on Assist
                                            <FaUpRightFromSquare />
                                        </a>
                                    </button>
                                    <button className="rounded-lg border-2 px-4 py-1 text-primary transition-all active:border-2 active:border-primary active:bg-transparent active:text-primary">
                                        <a
                                            href={`https://search.cvc.edu/courses/${result.cvcId}`}
                                            target="_blank"
                                            referrerPolicy="no-referrer"
                                            className="flex flex-row items-center gap-2"
                                        >
                                            View on CVC
                                            <FaUpRightFromSquare />
                                        </a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default SearchResults;
