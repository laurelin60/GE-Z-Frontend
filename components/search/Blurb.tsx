import React, { useEffect, useState } from "react";
import { CourseObject, FilterValues } from "./Search";
import { intervalToDuration } from "date-fns";

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
        const updateRelativeTime = () => {
            if (lastUpdated) {
                setTimeAgo(formatTimeSince(lastUpdated));
            }
        };

        updateRelativeTime();
        const intervalId = setInterval(updateRelativeTime, 1000);

        return () => clearInterval(intervalId);
    }, [lastUpdated]);

    function formatTimeSince(dateTimestamp) {
        const duration = intervalToDuration({ start: new Date(dateTimestamp), end: new Date() });
        const parts = [];
        if (duration.years) parts.push(duration.years + " year" + (duration.years !== 1 ? "s" : ""));
        if (duration.months) parts.push(duration.months + " month" + (duration.months !== 1 ? "s" : ""));
        if (duration.days) parts.push(duration.days + " day" + (duration.days !== 1 ? "s" : ""));
        if (duration.hours) parts.push(duration.hours + " hour" + (duration.hours !== 1 ? "s" : ""));
        if (duration.minutes) parts.push(duration.minutes + " minute" + (duration.minutes !== 1 ? "s" : ""));
        if (duration.seconds) parts.push(duration.seconds + " second" + (duration.seconds !== 1 ? "s" : ""));

        return parts.join(", ") + " ago";
    }

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
                        {"GE-Z's"} data was last updated{" "}
                        {lastUpdated ? timeAgo : "not available"}
                    </div>
                </div>

                <div className="border-2 border-t border-bg_secondary"></div>
            </div>
        </>
    );
};

export default Blurb;
