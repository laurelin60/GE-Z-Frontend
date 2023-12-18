import { Dispatch, SetStateAction } from "react";
import {
    CalendarFilter,
    CustomFilterCheckbox,
    InstitutionDropdown,
    UnitsFilter,
} from "./filterComponents";
import { FaCircleXmark } from "react-icons/fa6";
import { CollegeObject } from "./search";

interface SearchFilterProps {
    handleClick: () => void;
    setFormat: Dispatch<SetStateAction<boolean[]>>;
    defaultFormat: boolean[];
    setEnrollment: Dispatch<SetStateAction<boolean[]>>;
    defaultEnrollment: boolean[];
    setAvailable: Dispatch<SetStateAction<boolean[]>>;
    defaultAvailable: boolean[];
    setStart: Dispatch<SetStateAction<string>>;
    defaultStart: string;
    setEnd: Dispatch<SetStateAction<string | undefined>>;
    defaultEnd: string | undefined;
    data: CollegeObject[];
    setInstitution: Dispatch<SetStateAction<string>>;
    defaultInstitution: string;
    setMin: Dispatch<SetStateAction<number>>;
    setMax: Dispatch<SetStateAction<number>>;
    defaultMin: number;
    defaultMax: number;
}

export const SearchFilters = (props: SearchFilterProps) => {
    const {
        setFormat,
        defaultFormat,
        setEnrollment,
        defaultEnrollment,
        setAvailable,
        defaultAvailable,
        setStart,
        setEnd,
        defaultStart,
        defaultEnd,
        data,
        setInstitution,
        defaultInstitution,
        setMin,
        setMax,
        defaultMin,
        defaultMax,
    } = props;

    return (
        <div className="flex flex-col gap-4">
            <CustomFilterCheckbox
                title="Online Format"
                categories={["Asynchronous", "Synchronous"]}
                onChange={setFormat}
                defaultValue={defaultFormat}
            />
            <CustomFilterCheckbox
                title="Instant Enrollment"
                categories={[
                    "Only show courses eligible for One-Click Registration between your home school and the teaching school",
                ]}
                onChange={setEnrollment}
                defaultValue={defaultEnrollment}
            />
            <CustomFilterCheckbox
                title="Available Seats"
                categories={[
                    "Only show courses with available seats that are open for registration or open within three days",
                ]}
                onChange={setAvailable}
                defaultValue={defaultAvailable}
            />
            <CalendarFilter
                onStartChange={setStart}
                onEndChange={setEnd}
                defaultStart={defaultStart}
                defaultEnd={defaultEnd}
            />
            <InstitutionDropdown
                defaultValue={defaultInstitution}
                onChange={setInstitution}
                data={data}
            />
            <UnitsFilter
                onMinChange={setMin}
                onMaxChange={setMax}
                defaultMin={defaultMin}
                defaultMax={defaultMax}
            />
        </div>
    );
};

export const SearchFilterPage = (props: SearchFilterProps) => {
    const {
        handleClick,
        setFormat,
        defaultFormat,
        setEnrollment,
        defaultEnrollment,
        setAvailable,
        defaultAvailable,
        setStart,
        setEnd,
        defaultStart,
        defaultEnd,
        data,
        setInstitution,
        defaultInstitution,
        setMin,
        setMax,
        defaultMin,
        defaultMax,
    } = props;

    return (
        <div>
            <div className="absolute left-0 top-0 z-50 h-fit w-[100vw] bg-bg_secondary p-8 xl:hidden">
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
                    defaultFormat={defaultFormat}
                    setEnrollment={setEnrollment}
                    defaultEnrollment={defaultEnrollment}
                    setAvailable={setAvailable}
                    defaultAvailable={defaultAvailable}
                    setStart={setStart}
                    setEnd={setEnd}
                    defaultStart={defaultStart}
                    defaultEnd={defaultEnd}
                    data={data}
                    setInstitution={setInstitution}
                    defaultInstitution={defaultInstitution}
                    setMin={setMin}
                    setMax={setMax}
                    defaultMin={defaultMin}
                    defaultMax={defaultMax}
                />
            </div>
        </div>
    );
};
