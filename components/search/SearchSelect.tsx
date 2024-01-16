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
                <SelectTrigger className="h-full w-full overflow-ellipsis rounded-xl border-2 border-gray px-4 text-base md:text-2xl">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {data.map((item) => (
                        <SelectItem value={item} key={item} className="text-lg">
                            {item.includes("University of California")
                                ? "UC " + item.split(", ")[1]
                                : item}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
