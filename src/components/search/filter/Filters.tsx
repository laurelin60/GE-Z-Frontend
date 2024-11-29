import { Dispatch, SetStateAction } from "react";
import { CircleXIcon } from "lucide-react";

import { CourseObject, FilterValues } from "../Search";
import {
    CalendarFilter,
    CustomFilterCheckbox,
    InstitutionDropdown,
} from "./FilterComponents";

interface SearchFilterProps {
    handleClick: () => void;
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

export const SearchFilters = (props: SearchFilterProps) => {
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
    );
};

export const SearchFilterPage = (props: SearchFilterProps) => {
    const {
        handleClick,
        setFormat,
        setEnrollment,
        setAvailable,
        setStart,
        setEnd,
        setInstitution,
        setMin,
        setMax,
        filterValues,
        courses,
    } = props;

    return (
        <>
            <div className="absolute left-0 top-0 z-50 h-fit min-h-full w-[100vw] bg-bg_secondary p-8 xl:hidden">
                <div className="mb-8 flex flex-row justify-between">
                    <div className="text-3xl font-medium">Search Filters</div>
                    <div className="items-top flex">
                        <button
                            className="flex flex-row items-center gap-2 text-3xl text-primary"
                            onClick={handleClick}
                        >
                            <CircleXIcon />
                        </button>
                    </div>
                </div>
                <SearchFilters
                    handleClick={handleClick}
                    setFormat={setFormat}
                    setEnrollment={setEnrollment}
                    setAvailable={setAvailable}
                    setStart={setStart}
                    setEnd={setEnd}
                    setInstitution={setInstitution}
                    setMin={setMin}
                    setMax={setMax}
                    filterValues={filterValues}
                    courses={courses}
                />
            </div>
        </>
    );
};
