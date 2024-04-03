import React from "react";
import { CourseObject, FilterValues } from "./Search";

interface BlurbProps {
    filterData: (
        data: CourseObject[],
        filterValues: FilterValues,
    ) => CourseObject[];
    data: CourseObject[] | undefined;
    filterValues: FilterValues;
}

const Blurb = (props: BlurbProps) => {
    const { filterData, data, filterValues } = props;

    return (
        <>
            <div className="mt-4 flex flex-col gap-y-2 md:mt-8 md:gap-y-4">
                <div className="flex flex-col gap-2 text-base font-normal text-gray sm:text-lg md:text-xl">
                    <div>
                        We found{" "}
                        <b className="text-black">
                            {data ? filterData(data, filterValues).length : "x"}{" "}
                            courses
                        </b>{" "}
                        based on your search and filters. Please consult an
                        academic advisor for further information.
                    </div>

                    <div className="flex text-sm font-light text-gray md:justify-end md:text-base">
                        {"GE-Z's"} data was last updated on 3/7
                    </div>
                </div>

                <div className="border-2 border-t border-bg_secondary"></div>
            </div>
        </>
    );
};

export default Blurb;
