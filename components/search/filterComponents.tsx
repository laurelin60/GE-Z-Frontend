"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { DropdownComponentProps } from "../DropdownComponent";
import { FaCheck, FaChevronDown } from "react-icons/fa";

interface FilterCheckboxProps {
    title: string;
    categories: string[];
}

export const CustomFilterCheckbox = (props: FilterCheckboxProps) => {
    const { title, categories } = props;

    return (
        <div className="flex flex-col">
            <div className="mb-2 text-2xl font-medium">{title}</div>
            <div
                className={`grid ${
                    categories.length > 1 ? "grid-cols-2" : "grid-cols-1"
                } gap-y-2`}
            >
                {categories.map((category) => (
                    <label className="text-lg font-normal" key={category}>
                        <div className="relative flex flex-row items-center gap-2">
                            <input
                                type="checkbox"
                                className="border-gray h-6 w-6 appearance-none rounded-md border-[1px] bg-white checked:bg-primary"
                            />
                            <div className="absolute left-[5px] text-sm text-white">
                                <FaCheck />
                            </div>
                            <div className="max-w-[90%] text-base">
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

export const CalendarFilter = (props: any) => {
    const { onStartChange, onEndChange } = props;

    const [start, setStart] = useState(new Date().toLocaleDateString("en-CA"));
    const [end, setEnd] = useState("");

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
            <div className="flex flex-row gap-4">
                <div>
                    <label className="text-gray text-sm font-medium">
                        Starts After
                    </label>
                    <div className="flex flex-row items-center gap-2">
                        <input
                            type="date"
                            className="border-gray appearance-none rounded-lg border-[1px] px-4 py-2"
                            value={start}
                            onChange={handleStartChange}
                        />
                    </div>
                </div>
                <div>
                    <label className="text-gray text-sm font-medium">
                        Ends Before
                    </label>
                    <div className="flex flex-row items-center gap-2">
                        <input
                            type="date"
                            className="border-gray appearance-none rounded-lg border-[1px] px-4 py-2"
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

export const InstitutionDropdown = (props: DropdownComponentProps) => {
    const { defaultValue, data, onChange } = props;

    const [value, setValue] = useState(defaultValue);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
        setValue(e.target.value);
    };

    return (
        <div className="relative flex flex-col">
            <div className="mb-2 text-2xl font-medium">
                Teaching Institution
            </div>
            <div className="relative">
                <select
                    value={value}
                    onChange={handleChange}
                    className="text-regular border-gray block h-full w-full appearance-none overflow-ellipsis rounded-lg border-[1px] px-4 py-2 pr-12"
                >
                    {data.map((item) => (
                        <option key={item}>{item}</option>
                    ))}
                </select>
                <div className="text-gray absolute right-1 top-[14px] h-8 w-8">
                    <FaChevronDown />
                </div>
            </div>
            <div className="mt-4 border-2 border-t border-[#D9D9D9]"></div>
        </div>
    );
};

export const UnitsFilter = (props: any) => {
    const { onMinChange, onMaxChange } = props;

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(20);

    const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
        onMinChange(parseInt(e.target.value));
        setMin(parseInt(e.target.value));
    };

    const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
        onMaxChange(parseInt(e.target.value));
        setMax(parseInt(e.target.value));
    };

    return (
        <div className="relative flex flex-col">
            <div className="mb-2 text-2xl font-medium">Units</div>
            <div className="flex flex-row gap-4">
                <div>
                    <label className="text-gray text-sm font-medium">Min</label>
                    <div className="flex flex-row items-center gap-2">
                        <input
                            type="number"
                            className="border-gray w-44 appearance-none rounded-lg border-[1px] px-4 py-2"
                            value={min}
                            onChange={handleMinChange}
                        />
                    </div>
                </div>
                <div>
                    <label className="text-gray text-sm font-medium">Max</label>
                    <div className="flex flex-row items-center gap-2">
                        <input
                            type="number"
                            className="border-gray w-44 appearance-none rounded-lg border-[1px] px-4 py-2"
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
