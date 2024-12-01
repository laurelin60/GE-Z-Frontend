import { Dispatch, SetStateAction } from "react";

import { CourseObject, FilterValues } from "../Search";
import {
    CalendarFilter,
    CustomFilterCheckbox,
    InstitutionDropdown,
} from "./FilterComponents";

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
                <CustomFilterCheckbox
                    title="Online Format"
                    categories={["Asynchronous", "Synchronous"]}
                    onChange={setFormat}
                    defaultValue={filterValues.format}
                />
                <CustomFilterCheckbox
                    title="Available Seats"
                    categories={["Only show courses with available seats"]}
                    onChange={setAvailable}
                    defaultValue={filterValues.available}
                />
                <CalendarFilter
                    onStartChange={setStart}
                    onEndChange={setEnd}
                    defaultStart={filterValues.start}
                    defaultEnd={filterValues.end}
                />
                <InstitutionDropdown
                    defaultValue={filterValues.institution}
                    onChange={setInstitution}
                    courses={courses}
                />
            </div>
        </div>
    );
};
