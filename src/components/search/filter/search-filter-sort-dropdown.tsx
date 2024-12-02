import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SearchFilterSortDropdownProps {
    value: string;
    onChange: (input: string) => void;
    data: string[];
}

export function SearchFilterSortDropdown({
    value,
    data,
    onChange,
}: SearchFilterSortDropdownProps) {
    return (
        <div className="flex items-center gap-4 md:flex-row">
            <div className="hidden text-gray sm:flex">Sort By:</div>
            <Select
                value={value}
                onValueChange={onChange}
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
}
