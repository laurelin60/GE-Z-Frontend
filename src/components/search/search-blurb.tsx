import { useCallback, useEffect, useState } from "react";
import type {
    CourseObject,
    FilterValues,
} from "@/components/search/search.types";
import { useSearchContext } from "@/contexts/search-context/search-context";

interface SearchBlurbProps {
    filterData: (
        data: CourseObject[],
        filterValues: FilterValues
    ) => CourseObject[];
    courses: CourseObject[] | undefined;
    lastUpdated: number | undefined;
}

export const SearchBlurb = ({
    filterData,
    courses,
    lastUpdated,
}: SearchBlurbProps) => {
    const { filterValues } = useSearchContext();

    const [timeAgo, setTimeAgo] = useState("");

    const getTimeAgo = useCallback((date: number) => {
        const now = new Date();
        const updatedDate = new Date(date);
        const diff = now.getTime() - updatedDate.getTime();

        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 365);

        let result = "";

        if (days > 0) {
            result += `${days} ${days == 1 ? "day" : "days"}`;
        } else if (hours > 0) {
            result += `${hours} ${hours == 1 ? "hour" : "hours"}`;
        } else {
            result += `${minutes} ${minutes == 1 ? "minute" : "minutes"}`;
        }

        return result;
    }, []);

    const updateRelativeTime = useCallback(() => {
        if (lastUpdated) {
            setTimeAgo(getTimeAgo(lastUpdated));
        }
    }, [getTimeAgo, lastUpdated]);

    useEffect(() => {
        updateRelativeTime();
        const interval = setInterval(updateRelativeTime, 1000);

        return () => clearInterval(interval);
    }, [lastUpdated, updateRelativeTime]);

    return (
        <>
            <div className="flex flex-col gap-y-2 md:gap-y-4">
                <div className="text-gray flex flex-col gap-2 text-base font-normal sm:text-lg md:text-xl">
                    <div className="text-pretty">
                        We found{" "}
                        <b className="text-black">
                            {courses
                                ? filterData(courses, filterValues).length
                                : "x"}{" "}
                            courses
                        </b>{" "}
                        based on your search and filters. Please consult an
                        academic advisor for further information. Our data may
                        not always be up to date.
                    </div>

                    <div className="text-gray flex text-sm md:justify-end md:text-base">
                        {"GE-Z's"} data was updated{" "}
                        {lastUpdated ? timeAgo : "x"} ago
                    </div>
                </div>

                <div className="border-bg_secondary border-2 border-t"></div>
            </div>
        </>
    );
};
