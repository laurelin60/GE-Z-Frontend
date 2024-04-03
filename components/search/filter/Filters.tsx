import React, { Dispatch, SetStateAction } from "react";
import {
    CalendarFilter,
    CustomFilterCheckbox,
    InstitutionDropdown,
    UnitsFilter,
} from "./FilterComponents";
import { FaCircleXmark } from "react-icons/fa6";
import { CollegeObject, FilterValues } from "../Search";

interface SearchFilterProps {
    handleClick: () => void;
    setFormat: Dispatch<SetStateAction<boolean[]>>;
    setEnrollment: Dispatch<SetStateAction<boolean[]>>;
    setAvailable: Dispatch<SetStateAction<boolean[]>>;
    setStart: Dispatch<React.SetStateAction<Date>>;
    setEnd: Dispatch<SetStateAction<Date | undefined>>;
    setInstitution: Dispatch<SetStateAction<string>>;
    setMin: Dispatch<SetStateAction<number>>;
    setMax: Dispatch<SetStateAction<number>>;
    filterValues: FilterValues;
    courses: CollegeObject[] | undefined;
}

export const SearchFilters = (props: SearchFilterProps) => {
    const {
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
        <div className="flex flex-col gap-4">
            <CustomFilterCheckbox
                title="Online Format"
                categories={["Asynchronous", "Synchronous"]}
                onChange={setFormat}
                defaultValue={filterValues.format}
            />
            <CustomFilterCheckbox
                title="Instant Enrollment"
                categories={[
                    "Only show courses eligible for One-Click Registration between your home school and the teaching school",
                ]}
                onChange={setEnrollment}
                defaultValue={filterValues.enrollment}
            />
            <CustomFilterCheckbox
                title="Available Seats"
                categories={[
                    "Only show courses with available seats that are open for registration or open within three days",
                ]}
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
            <UnitsFilter
                onMinChange={setMin}
                onMaxChange={setMax}
                defaultMin={filterValues.min}
                defaultMax={filterValues.max}
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
                            <FaCircleXmark />
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
