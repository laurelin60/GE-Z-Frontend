"use client";

import { UNIVERSITY_GE } from "@/lib/constants";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface DropdownComponentProps {
    defaultValue: string;
    data: string[];
    onChange: (value: string) => void;
}

const DropdownComponent = (props: DropdownComponentProps) => {
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
                        <option key={item}>{item}</option>
                    ))}
                </select>
                <div className="absolute right-2 top-5 h-8 w-8 text-2xl opacity-25 md:right-5 md:top-5 md:text-3xl xl:top-6">
                    <FaChevronDown />
                </div>
            </div>
        </div>
    );
};

const Hero = () => {
    const router = useRouter();

    const [university, setUniversity] = useState(Object.keys(UNIVERSITY_GE)[0]);
    const [ge, setGE] = useState(UNIVERSITY_GE[university][0]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.push(
            `/search?university=${encodeURIComponent(
                university,
            )}&ge=${encodeURIComponent(ge)}`,
        );
    };

    return (
        <>
            <div className="flex flex-col px-2 sm:px-6 md:px-16 xl:px-0">
                <div className="mt-20 flex flex-wrap place-content-center justify-center text-5xl font-bold lg:text-6xl xl:text-[92px]">
                    Find the
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        &nbsp;Perfect CC&nbsp;
                    </span>
                    Course
                </div>

                <div className="mt-4 text-center text-xl font-light opacity-40 lg:text-2xl xl:text-3xl">
                    Data sourced from{" "}
                    <a
                        href="https://assist.org/"
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="underline underline-offset-8"
                    >
                        Assist.org
                    </a>{" "}
                    and{" "}
                    <a
                        href="https://cvc.edu/"
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="underline underline-offset-8"
                    >
                        CVC.edu
                    </a>
                </div>

                <form action="submit" onSubmit={handleSubmit}>
                    <div className="mt-6 flex flex-col gap-2 md:mt-12 xl:mt-16 xl:gap-4">
                        <DropdownComponent
                            defaultValue={university}
                            data={Object.keys(UNIVERSITY_GE)}
                            onChange={setUniversity}
                        />
                        <DropdownComponent
                            defaultValue={ge}
                            data={UNIVERSITY_GE[university]}
                            onChange={setGE}
                            key={university}
                        />
                    </div>

                    <div className="flex place-content-center">
                        <button
                            type="submit"
                            className="mt-4 flex h-16 w-48 flex-row place-content-center items-center justify-center gap-4 rounded-2xl bg-primary text-2xl font-semibold text-white transition-all hover:border-4 hover:border-white active:border-4 active:border-primary active:bg-transparent active:text-primary md:mt-8 xl:h-20 xl:w-56 xl:text-3xl"
                        >
                            <div>Search</div>
                            <FaSearch />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Hero;
