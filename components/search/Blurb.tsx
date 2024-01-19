import React from "react";
import { CollegeObject, FilterValues } from "./Search";

interface BlurbProps {
    filterData: (
        data: CollegeObject[],
        filterValues: FilterValues,
    ) => CollegeObject[];
    data: CollegeObject[] | undefined;
    filterValues: FilterValues;
    searchUniversity: string;
    searchGE: string;
}

const SearchBlurb = (props: BlurbProps) => {
    const { filterData, data, filterValues, searchUniversity, searchGE } =
        props;

    return (
        <>
            <div className="mt-8 flex flex-col gap-4 md:mt-16 md:gap-8">
                <div className="text-3xl font-medium md:text-4xl">
                    Search Results
                </div>
                <div className="flex flex-col gap-2 text-lg font-normal text-gray md:text-xl">
                    <div>
                        We found{" "}
                        <b className="text-black">
                            {data ? filterData(data, filterValues).length : "x"}{" "}
                            courses
                        </b>{" "}
                        that may articulate to{" "}
                        <b className="text-black">{searchUniversity}</b> for{" "}
                        <b className="text-black">{`${searchGE?.split(
                            " ",
                        )[0]} Category ${searchGE?.split(" ")[1]}`}</b>{" "}
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
                    <div className="flex text-base font-light text-gray md:justify-end">
                        {"GE-Z's"} data was last updated on 1/19
                    </div>
                </div>

                <div className="border-2 border-t border-bg_secondary"></div>
            </div>
        </>
    );
};

export default SearchBlurb;
