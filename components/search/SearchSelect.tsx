"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface DropdownComponentProps {
    value: string;
    data: string[];
    onChange: (university: string) => void;
    placeholder?: string;
}

export const SearchSelect = (props: DropdownComponentProps) => {
    const { value, data, onChange, placeholder } = props;

    return (
        <div className="relative flex h-12 w-[300px] md:h-16">
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="h-full w-full overflow-ellipsis rounded-xl border-2 border-gray px-4 text-left text-base md:text-2xl">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {data.map((item) => {
                        let option = item;

                        if (option.includes("University of California")) {
                            option = "UC " + item.split(", ")[1];
                        }

                        if (option.includes(": ")) {
                            option = item.split(": ")[1];
                        }

                        if (option.includes("Los Angeles")) {
                            option = "UCLA";
                        }

                        return (
                            <SelectItem
                                value={item}
                                key={item}
                                className="text-lg"
                            >
                                {option}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
};
