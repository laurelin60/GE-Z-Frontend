"use client";

import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "../../ui/button";
import { CourseObject } from "../Search";

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
        categories.map((_, index) => defaultValue[index])
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
                    <div
                        key={category}
                        className="flex-center space-x-2"
                    >
                        <Checkbox
                            id={category + "label"}
                            className="size-5 text-white"
                            defaultChecked
                            onClick={() => toggleCategory(index)}
                        />
                        <label
                            htmlFor={category + "label"}
                            className="text-lg"
                        >
                            {category}
                        </label>
                    </div>
                ))}
            </div>
            <div className="mt-4 border-2 border-t border-[#D9D9D9]"></div>
        </div>
    );
};

interface CalendarFilterProps {
    onStartChange: Dispatch<SetStateAction<Date | undefined>>;
    onEndChange: Dispatch<SetStateAction<Date | undefined>>;
    defaultStart: Date | undefined;
    defaultEnd: Date | undefined;
}

export const CalendarFilter = (props: CalendarFilterProps) => {
    const { onStartChange, onEndChange, defaultStart, defaultEnd } = props;

    const [startDate, setStartDate] = useState<Date | undefined>(defaultStart);
    const [endDate, setEndDate] = useState<Date | undefined>(defaultEnd);

    const handleStartChange = (date: Date | undefined) => {
        if (!date) {
            console.error("No start date selected");
            return;
        }

        onStartChange(date);
        setStartDate(date);
    };

    const handleEndChange = (date: Date | undefined) => {
        onEndChange(date);
        setEndDate(date);
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
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-44 justify-start rounded-lg border-[1px] border-gray text-left font-normal",
                                        !startDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {startDate ? (
                                        format(startDate, "PP")
                                    ) : (
                                        <span>Start date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={handleStartChange}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray">
                        Ends Before
                    </label>
                    <div className="flex flex-row items-center gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-44 justify-start rounded-lg border-[1px] border-gray text-left font-normal",
                                        !endDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {endDate ? (
                                        format(endDate, "PP")
                                    ) : (
                                        <span>End date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={handleEndChange}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
            <div className="mt-4 border-2 border-t border-[#D9D9D9]"></div>
        </div>
    );
};

interface InstitutionDropdownProps {
    defaultValue: string;
    courses: CourseObject[] | undefined;
    onChange: Dispatch<SetStateAction<string>>;
}

export const InstitutionDropdown = (props: InstitutionDropdownProps) => {
    const { defaultValue, courses, onChange } = props;

    const [value, setValue] = useState(defaultValue);

    const handleChange = (value: string) => {
        onChange(value);
        setValue(value);
    };

    const uniqueColleges =
        defaultValue == "Any Institution" ? [] : [defaultValue];

    const sendingInstitutions = courses?.map(
        (course: CourseObject) => course.sendingInstitution
    );

    if (sendingInstitutions) {
        for (const college of sendingInstitutions) {
            if (!uniqueColleges.includes(college)) {
                uniqueColleges.push(college);
            }
        }

        uniqueColleges.sort();
    }

    return (
        <div className="relative flex flex-col">
            <div className="mb-2 text-2xl font-medium">
                Teaching Institution
            </div>
            <Select
                value={value}
                onValueChange={handleChange}
            >
                <SelectTrigger className="text-regular min-h-full w-full max-w-[368px] rounded-lg border-[1px] border-gray">
                    <SelectValue placeholder="Teaching Institution" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Any Institution">
                        Any Institution
                    </SelectItem>
                    {uniqueColleges.map((college) => (
                        <SelectItem
                            value={college}
                            key={college}
                        >
                            {college}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
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

    const handleChange = (value: string) => {
        onChange(value);
        setValue(value);
    };

    return (
        <div className="flex items-center gap-4 md:flex-row">
            <div className="hidden text-gray sm:flex">Sort By:</div>
            <Select
                value={value}
                onValueChange={handleChange}
            >
                <SelectTrigger className="text-regular min-h-full w-40 rounded-lg border-[1px] border-gray">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {data.map((item) => (
                        <SelectItem
                            value={item}
                            key={item}
                        >
                            {item}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
