import { CourseObject } from "@/components/search/Search";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SearchFilterInstitutionDropdownProps {
    value: string;
    onChange: (input: string) => void;
    courses: CourseObject[] | undefined;
}

export function SearchFilterInstitutionDropdown({
    value,
    onChange,
    courses,
}: SearchFilterInstitutionDropdownProps) {
    const uniqueColleges = value == "Any Institution" ? [] : [value];

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
                value={value}
                onValueChange={onChange}
            >
                <SelectTrigger className="text-regular min-h-full w-full max-w-[368px] rounded-lg border-[1px] border-gray">
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
