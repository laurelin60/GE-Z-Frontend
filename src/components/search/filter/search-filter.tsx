import { SearchFilterCheckbox } from "@/components/search/filter/search-filter-checkbox";
import { SearchFilterDateSelect } from "@/components/search/filter/search-filter-date-select";
import { SearchFilterInstitutionDropdown } from "@/components/search/filter/search-filter-institution-dropdown";
import { CourseObject } from "@/components/search/search.types";
import { useSearchContext } from "@/contexts/search-context/search-context";

interface SearchFilterProps {
    courses: CourseObject[] | undefined;
}

export const SearchFilter = ({ courses }: SearchFilterProps) => {
    const { format, setFormat, available, setAvailable } = useSearchContext();

    return (
        <div className="space-y-8 rounded-lg bg-bg_secondary p-8 text-left">
            <div className="text-3xl font-medium text-black">
                Search Filters
            </div>

            <div className="flex flex-col gap-4">
                <SearchFilterCheckbox
                    title="Online Format"
                    value={format}
                    onChange={setFormat}
                    categories={["Asynchronous", "Synchronous"]}
                />
                <SearchFilterCheckbox
                    title="Available Seats"
                    value={available}
                    onChange={setAvailable}
                    categories={["Only show courses with available seats"]}
                />
                <SearchFilterDateSelect />
                <SearchFilterInstitutionDropdown courses={courses} />
            </div>
        </div>
    );
};
