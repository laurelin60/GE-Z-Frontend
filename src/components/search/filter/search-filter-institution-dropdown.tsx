import type { CourseObject } from "@/components/search/search.types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSearchContext } from "@/contexts/search-context/search-context";

interface SearchFilterInstitutionDropdownProps {
    courses: CourseObject[] | undefined;
}

export function SearchFilterInstitutionDropdown({
    courses,
}: SearchFilterInstitutionDropdownProps) {
    const { institution, setInstitution } = useSearchContext();

    const uniqueColleges =
        institution == "Any Institution" ? [] : [institution];

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
                value={institution}
                onValueChange={setInstitution}
            >
                <SelectTrigger className="text-regular min-h-full w-full max-w-[368px] rounded-lg border border-gray">
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
}
