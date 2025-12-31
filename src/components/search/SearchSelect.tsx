import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface DropdownComponentProps<T extends string> {
    value: T;
    data?: readonly T[];
    onChange: (input: T) => void;
    placeholder?: string;
}

export function SearchSelect<T extends string>({
    value,
    data,
    onChange,
    placeholder,
}: DropdownComponentProps<T>) {
    return (
        <div className="relative flex h-12 w-72 max-w-full">
            <Select
                value={value}
                onValueChange={onChange}
            >
                <SelectTrigger className="border-gray h-full w-full rounded-xl border-2 px-4 py-1 text-left text-base text-ellipsis md:text-xl">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                    {data?.map((item: string) => {
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
}
