import { Dispatch, SetStateAction } from "react";
import { SearchFilterDateSelect } from "@/components/search/filter/search-filter-date-select";
import { SearchFilterInstitutionDropdown } from "@/components/search/filter/search-filter-institution-dropdown";

import { CourseObject, FilterValues } from "../Search";
import { SearchFilterCheckbox } from "./search-filter-checkbox";

interface SearchFilterProps {
    setFormat: Dispatch<SetStateAction<boolean[]>>;
    setEnrollment: Dispatch<SetStateAction<boolean[]>>;
    setAvailable: Dispatch<SetStateAction<boolean[]>>;
    setStart: Dispatch<React.SetStateAction<Date | undefined>>;
    setEnd: Dispatch<SetStateAction<Date | undefined>>;
    setInstitution: Dispatch<SetStateAction<string>>;
    setMin: Dispatch<SetStateAction<number>>;
    setMax: Dispatch<SetStateAction<number>>;
    filterValues: FilterValues;
    courses: CourseObject[] | undefined;
}

export const SearchFilter = (props: SearchFilterProps) => {
    const {
        setFormat,
        setAvailable,
        setStart,
        setEnd,
        setInstitution,
        filterValues,
        courses,
    } = props;

    return (
        <div className="space-y-8 rounded-lg bg-bg_secondary p-8 text-left">
            <div className="text-3xl font-medium text-black">
                Search Filters
            </div>

            <div className="flex flex-col gap-4">
                <SearchFilterCheckbox
                    title="Online Format"
                    value={filterValues.format}
                    onChange={setFormat}
                    categories={["Asynchronous", "Synchronous"]}
                />
                <SearchFilterCheckbox
                    title="Available Seats"
                    value={filterValues.available}
                    onChange={setAvailable}
                    categories={["Only show courses with available seats"]}
                />
                <SearchFilterDateSelect
                    onStartChange={setStart}
                    onEndChange={setEnd}
                    start={filterValues.start}
                    end={filterValues.end}
                />
                <SearchFilterInstitutionDropdown
                    value={filterValues.institution}
                    onChange={setInstitution}
                    courses={courses}
                />
            </div>
        </div>
    );
};
