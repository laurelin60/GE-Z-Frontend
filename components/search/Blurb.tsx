import React, { useEffect, useState } from "react";
import { CourseObject, FilterValues } from "./Search";

interface BlurbProps {
    filterData: (
        data: CourseObject[],
        filterValues: FilterValues,
    ) => CourseObject[];
    courses: CourseObject[] | undefined;
    lastUpdated: number | undefined;
    filterValues: FilterValues;
}

const Blurb = (props: BlurbProps) => {
    const { filterData, courses, lastUpdated, filterValues } = props;

    const [timeAgo, setTimeAgo] = useState("");

    useEffect(() => {
        const getTimeAgo = (date) => {
            const now = new Date();
            const updatedDate = new Date(date);
            const diff = now - updatedDate;

            const seconds = Math.floor((diff / 1000) % 60);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const days = Math.floor(diff / (1000 * 60 * 60 * 24) % 365);
            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

            let result = "";
            if (years > 0) result += `${years} years, `;
            if (days > 0 || years > 0) result += `${days} days, `;
            if (hours > 0 || days > 0 || years > 0) result += `${hours} hours, `;
            result += `${minutes} minutes and ${seconds} seconds ago`;

            return result;
        };

        const updateRelativeTime = () => {
            if (lastUpdated) {
                setTimeAgo(getTimeAgo(lastUpdated));
            }
        };

        updateRelativeTime(); // Update initially
        const intervalId = setInterval(updateRelativeTime, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [lastUpdated]);

    return (
        <>
            <div className="mt-4 flex flex-col gap-y-2 md:mt-8 md:gap-y-4">
                <div className="flex flex-col gap-2 text-base font-normal text-gray sm:text-lg md:text-xl">
                    <div>
                        We found{" "}
                        <b className="text-black">
                            {courses
                                ? filterData(courses, filterValues).length
                                : "x"}{" "}
                            courses
                        </b>{" "}
                        based on your search and filters. Please consult an
                        academic advisor for further information.
                    </div>

                    <div className="flex text-sm font-light text-gray md:justify-end md:text-base">
                        {"GE-Z's"} data was {lastUpdated ? timeAgo : "not available"}
                    </div>
                </div>

                <div className="border-2 border-t border-bg_secondary"></div>
            </div>
        </>
    );
};

export default Blurb;
