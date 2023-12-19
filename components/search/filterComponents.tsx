"use client";

import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import { CollegeObject } from "./search";

interface FilterCheckboxProps {
    title: string;
    categories: string[];
    onChange: Dispatch<SetStateAction<boolean[]>>;
    defaultValue: boolean[];
}

export const CustomFilterCheckbox = (props: FilterCheckboxProps) => {
    const { title, categories, onChange, defaultValue } = props;

    // Initialize an array of boolean values to represent the checked state of each category
    const [categoryStates, setCategoryStates] = useState(
        categories.map((_, index) => defaultValue[index]),
    );

    // Function to toggle the checked state of a category
    const toggleCategory = (index: number) => {
        const newCategoryStates = [...categoryStates];
        newCategoryStates[index] = !categoryStates[index];

        onChange(newCategoryStates);
        setCategoryStates(newCategoryStates);
    };

    return (
        <div className="flex flex-col">
            <div className="mb-2 text-2xl font-medium">{title}</div>
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
                {categories.map((category, index) => (
                    <label className="text-lg font-normal" key={category}>
                        <div className="relative flex flex-row items-center gap-2">
                            <input
                                type="checkbox"
                                className="h-6 w-6 appearance-none rounded-md border-[1px] border-gray bg-white checked:bg-primary"
                                checked={categoryStates[index]}
                                // Toggle the category state when the checkbox is clicked
                                onChange={() => toggleCategory(index)}
                            />
                            <div className="absolute left-[5px] text-sm text-white">
                                {categoryStates[index] && <FaCheck />}
                            </div>
                            <div className="max-w-[85%] text-base">
                                {category}
                            </div>
                        </div>
                    </label>
                ))}
            </div>
            <div className="mt-4 border-2 border-t border-[#D9D9D9]"></div>
        </div>
    );
};

interface CalendarFilterProps {
    onStartChange: Dispatch<SetStateAction<string>>;
    onEndChange: Dispatch<SetStateAction<string | undefined>>;
    defaultStart: string;
    defaultEnd: string | undefined;
}

export const CalendarFilter = (props: CalendarFilterProps) => {
    const { onStartChange, onEndChange, defaultStart, defaultEnd } = props;

    const [start, setStart] = useState(defaultStart);
    const [end, setEnd] = useState(defaultEnd);

    const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
        onStartChange(e.target.value);
        setStart(e.target.value);
    };

    const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
        onEndChange(e.target.value);
        setEnd(e.target.value);
    };

    return (
        <div className="relative flex flex-col">
            <div className="mb-2 text-2xl font-medium">Timeframe</div>
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
                <div>
                    <label className="text-sm font-medium text-gray">
                        Starts After
                    </label>
                    <div className="flex flex-row items-center gap-2">
                        <input
                            type="date"
                            className="appearance-none rounded-lg border-[1px] border-gray px-4 py-2"
                            value={start}
                            onChange={handleStartChange}
                        />
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray">
                        Ends Before
                    </label>
                    <div className="flex flex-row items-center gap-2">
                        <input
                            type="date"
                            className="appearance-none rounded-lg border-[1px] border-gray px-4 py-2"
                            value={end}
                            onChange={handleEndChange}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-4 border-2 border-t border-[#D9D9D9]"></div>
        </div>
    );
};

interface InstitutionDropdownProps {
    defaultValue: string;
    courses: CollegeObject[];
    onChange: Dispatch<SetStateAction<string>>;
}

export const InstitutionDropdown = (props: InstitutionDropdownProps) => {
    const { defaultValue, courses, onChange } = props;

    const [value, setValue] = useState(defaultValue);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
        setValue(e.target.value);
    };

    const uniqueColleges =
        defaultValue == "Any Institution" ? [] : [defaultValue];

    const sendingInstitutions = courses?.map(
        (course: CollegeObject) => course.sendingInstitution,
    );

    for (const college of sendingInstitutions) {
        if (!uniqueColleges.includes(college)) {
            uniqueColleges.push(college);
        }
    }

    uniqueColleges.sort();

    return (
        <div className="relative flex flex-col">
            <div className="mb-2 text-2xl font-medium">
                Teaching Institution
            </div>
            <div className="relative">
                <select
                    value={value}
                    onChange={handleChange}
                    className="text-regular block h-full w-full appearance-none overflow-ellipsis rounded-lg border-[1px] border-gray px-4 py-2 pr-12"
                >
                    <option>{"Any Institution"}</option>
                    {uniqueColleges.map((item) => (
                        <option key={item}>{item}</option>
                    ))}
                </select>
                <div className="absolute right-1 top-[14px] h-8 w-8 text-gray">
                    <FaChevronDown />
                </div>
            </div>
            <div className="mt-4 border-2 border-t border-[#D9D9D9]"></div>
        </div>
    );
};

interface UnitsFilterProps {
    onMinChange: Dispatch<SetStateAction<number>>;
    onMaxChange: Dispatch<SetStateAction<number>>;
    defaultMin: number;
    defaultMax: number;
}

export const UnitsFilter = (props: UnitsFilterProps) => {
    const { onMinChange, onMaxChange, defaultMin, defaultMax } = props;

    const [min, setMin] = useState(defaultMin);
    const [max, setMax] = useState(defaultMax);

    const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
        onMinChange(e.target.value ? parseInt(e.target.value) : 0);
        setMin(parseInt(e.target.value));
    };

    const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
        onMaxChange(e.target.value ? parseInt(e.target.value) : 0);
        setMax(parseInt(e.target.value));
    };

    return (
        <div className="relative flex flex-col">
            <div className="mb-2 text-2xl font-medium">Units</div>
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
                <div>
                    <label className="text-sm font-medium text-gray">Min</label>
                    <div className="flex flex-row items-center gap-2">
                        <input
                            type="number"
                            className="w-44 appearance-none rounded-lg border-[1px] border-gray px-4 py-2"
                            value={min}
                            onChange={handleMinChange}
                        />
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray">Max</label>
                    <div className="flex flex-row items-center gap-2">
                        <input
                            type="number"
                            className="w-44 appearance-none rounded-lg border-[1px] border-gray px-4 py-2"
                            value={max}
                            onChange={handleMaxChange}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-4 border-2 border-t border-[#D9D9D9]"></div>
        </div>
    );
};

interface SortDropdownProps {
    defaultValue: string;
    data: string[];
    onChange: Dispatch<SetStateAction<string>>;
}

export const SortDropdown = (props: SortDropdownProps) => {
    const { defaultValue, data, onChange } = props;

    const [value, setValue] = useState(defaultValue);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
        setValue(e.target.value);
    };

    return (
        <div className="relative flex flex-col">
            <div className="relative">
                <select
                    value={value}
                    onChange={handleChange}
                    className="text-regular block h-full w-full appearance-none overflow-ellipsis rounded-lg border-[1px] border-gray px-4 py-2 pr-12"
                >
                    {data.map((item) => (
                        <option key={item}>{item}</option>
                    ))}
                </select>
                <div className="absolute right-1 top-[14px] h-8 w-8 text-gray">
                    <FaChevronDown />
                </div>
            </div>
        </div>
    );
};
