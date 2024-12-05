import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSearchContext } from "@/contexts/search-context/search-context";

interface SearchFilterSortDropdownProps {
    data: string[];
}

export function SearchFilterSortDropdown({
    data,
}: SearchFilterSortDropdownProps) {
    const { sort, setSort } = useSearchContext();

    return (
        <div className="flex items-center gap-4 md:flex-row">
            <div className="hidden text-gray sm:flex">Sort By:</div>
            <Select
                value={sort}
                onValueChange={setSort}
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
