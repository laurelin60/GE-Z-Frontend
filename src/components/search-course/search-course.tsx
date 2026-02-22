"use client";

import { useCallback, useRef } from "react";
import { SearchFilter } from "@/components/search/filter/search-filter";
import { SearchFilterDialog } from "@/components/search/filter/search-filter-dialog";
import { SearchFilterSortDropdown } from "@/components/search/filter/search-filter-sort-dropdown";
import { SearchBlurb } from "@/components/search/search-blurb";
import { SearchResults } from "@/components/search/search-results";
import type { CourseObject } from "@/components/search/search.types";
import { SearchSelect } from "@/components/search/SearchSelect";
import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { UNIVERSITIES, type University } from "@/lib/constants";
import { filterData } from "@/lib/utils/filter";
import { SearchIcon } from "lucide-react";
import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";

interface SearchCourseProps {
    university: University;
    courseCode: string;
    courses: CourseObject[];
    lastUpdated: number;
}

export function SearchCourse({
    university: _university,
    courseCode: _courseCode,
    courses,
    lastUpdated,
}: SearchCourseProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [university, setUniversity] = useQueryState(
        "university",
        parseAsStringLiteral(UNIVERSITIES)
            .withDefault(_university)
            .withOptions({ shallow: false, clearOnDefault: false })
    );
    const [courseCode, setCourseCode] = useQueryState(
        "courseCode",
        parseAsString
            .withDefault(_courseCode)
            .withOptions({ shallow: false, clearOnDefault: false })
    );

    const handleUniversityChange = useCallback(
        (value: string) => {
            setUniversity(value as University);
        },
        [setUniversity]
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            const raw = inputRef.current?.value ?? "";
            const sanitized = raw.trim();
            if (!sanitized) return;
            if (inputRef.current) inputRef.current.value = sanitized;
            setCourseCode(sanitized);
        },
        [setCourseCode]
    );

    return (
        <div className="flex w-full max-w-full flex-col space-y-4 px-4 py-8 md:px-16 lg:space-y-8">
            <div className="flex flex-wrap text-4xl font-bold lg:text-6xl">
                Search <span className="hidden lg:flex">&nbsp;by Course</span>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-row items-center justify-between"
            >
                <div className="flex max-w-full flex-wrap items-center gap-4">
                    <SearchSelect
                        value={university}
                        data={UNIVERSITIES}
                        onChange={handleUniversityChange}
                    />
                    <div className="flex">
                        <input
                            ref={inputRef}
                            type="text"
                            name="courseCode"
                            defaultValue={courseCode}
                            placeholder="e.g. ANTHRO2A"
                            className="border-gray h-12 w-72 max-w-full rounded-l-xl border-2 border-r-0 px-4 py-1 text-base outline-none md:w-72 md:text-xl"
                        />
                        <Button
                            type="submit"
                            className="h-12 shrink-0 rounded-l-none rounded-r-xl px-4 text-base md:px-8 md:text-xl"
                        >
                            <SearchIcon className="size-5" />
                            Search
                        </Button>
                    </div>
                </div>
            </form>

            {courseCode ? (
                <>
                    <SearchBlurb
                        filterData={filterData}
                        courses={courses}
                        lastUpdated={lastUpdated}
                    />

                    <div className="flex flex-row gap-4 md:gap-8">
                        <div className="sticky top-24 hidden h-fit shrink-0 xl:flex">
                            <SearchFilter courses={courses} />
                        </div>

                        <div className="w-full min-w-0">
                            <div className="mb-8 flex items-center justify-between gap-4 xl:justify-end">
                                <SearchFilterDialog>
                                    <SearchFilter courses={courses} />
                                </SearchFilterDialog>

                                <SearchFilterSortDropdown
                                    data={[
                                        "Default Sort",
                                        "Alphabetical",
                                        "Tuition",
                                        "Shortest Term",
                                    ]}
                                />
                            </div>

                            <SearchResults
                                courses={courses}
                                university={university}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <Empty className="py-16">
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <SearchIcon />
                        </EmptyMedia>
                        <EmptyTitle>Search for a course</EmptyTitle>
                        <EmptyDescription>
                            Enter a course code above to find matching community
                            college courses.
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            )}
        </div>
    );
}
