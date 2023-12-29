import { ChangeEvent, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export interface DropdownComponentProps {
    defaultValue: string;
    data: string[];
    onChange: any; // FIX ME
}

export const DropdownComponentHero = (props: DropdownComponentProps) => {
    const { defaultValue, data, onChange } = props;

    const [value, setValue] = useState(defaultValue);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
        setValue(e.target.value);
    };

    return (
        <div className="flex place-content-center">
            <div className="relative h-16 w-72 md:h-16 md:w-96 xl:h-20 xl:w-[600px]">
                <select
                    value={value}
                    onChange={handleChange}
                    className="block h-full w-full appearance-none overflow-ellipsis rounded-xl border-4 border-black px-4 pr-12 text-lg opacity-40 focus:border-primary focus:opacity-80 md:pr-16 md:text-2xl"
                >
                    {data.map((item) => (
                        <option key={item} value={item}>
                            {item.includes("University of California")
                                ? "UC " + item.split(", ")[1]
                                : item}
                        </option>
                    ))}
                </select>
                <div className="absolute right-2 top-5 h-8 w-8 text-2xl opacity-25 md:right-5 md:top-5 md:text-3xl xl:top-6">
                    <FaChevronDown />
                </div>
            </div>
        </div>
    );
};

export const DropdownComponentSearch = (props: DropdownComponentProps) => {
    const { defaultValue, data, onChange } = props;

    const [value, setValue] = useState(defaultValue);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
        setValue(e.target.value);
    };

    return (
        <div className="flex place-content-center">
            <div className="relative flex h-12 w-[100%] sm:w-[340px] md:h-16 xl:h-16">
                <select
                    value={value}
                    onChange={handleChange}
                    className="block h-full w-full appearance-none overflow-ellipsis rounded-xl border-4 border-black px-4 pr-12 text-lg opacity-40 outline-none focus:border-primary focus:opacity-80 md:pr-16 md:text-2xl"
                >
                    {data.map((item) => (
                        <option key={item} value={item}>
                            {item.includes("University of California")
                                ? "UC " + item.split(", ")[1]
                                : item}
                        </option>
                    ))}
                </select>
                <div className="absolute right-2 top-[14px] h-8 w-8 text-2xl opacity-25 md:right-5 md:top-[18px] md:text-3xl">
                    <FaChevronDown />
                </div>
            </div>
        </div>
    );
};
