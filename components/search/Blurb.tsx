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
                <div className="flex flex-col gap-2 text-lg font-normal md:text-xl">
                    <div>
                        <span className="text-muted"> We found </span>
                        <b className="text-primary">
                            {data ? filterData(data, filterValues).length : "?"}{" "}
                            courses
                        </b>
                        <span className="text-muted">
                            {" "}
                            that may articulate to{" "}
                        </span>
                        <b className="text-primary">
                            {searchUniversity}
                        </b> for{" "}
                        <b className="text-primary">{`${searchGE?.split(
                            " ",
                        )[0]} Category ${searchGE?.split(" ")[1]}`}</b>
                        <span className="text-muted"> based on </span>
                        <a
                            href="https://assist.org/"
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="underline underline-offset-[5px]"
                        >
                            Assist.org
                        </a>
                        <span className="text-muted"> and </span>
                        <a
                            href="https://cvc.edu/"
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="underline underline-offset-[5px]"
                        >
                            CVC.edu
                        </a>
                        <span className="text-muted">
                            . Please consult an academic advisor for further
                            information.
                        </span>
                    </div>
                    <div className="flex text-base font-light text-muted md:justify-end">
                        {"GE-Z's"} data was last updated on 12/30
                    </div>
                </div>

                <div className="border-2 border-t border-bg_secondary"></div>
            </div>
        </>
    );
};

export default SearchBlurb;
