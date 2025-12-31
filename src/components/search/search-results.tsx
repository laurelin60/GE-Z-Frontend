import Link from "next/link";
import type { CourseObject } from "@/components/search/search.types";
import Tags from "@/components/search/Tags";
import { Button } from "@/components/ui/button";
import { useSearchContext } from "@/contexts/search-context/search-context";
import { filterData } from "@/lib/utils/filter";
import { format } from "date-fns";
import { ExternalLinkIcon, InfoIcon } from "lucide-react";

// import LazyLoad from "react-lazy-load";

const formatTime = (date: number) => {
    return format(new Date(date), "MMM d");
};

interface SearchResultsProps {
    courses: CourseObject[];
    university: string;
    ge: string;
}

export function SearchResults({ courses, university, ge }: SearchResultsProps) {
    const { filterValues } = useSearchContext();
    const results = filterData(courses, filterValues);

    if (results.length <= 0) {
        return (
            <div className="flex flex-col gap-2 text-2xl">
                <div className="flex justify-center">
                    <img
                        src="/no_results.png"
                        alt="no results"
                        className="pointer-events-none flex w-[500px] justify-center"
                    />
                </div>
                <div className="flex w-full flex-col justify-center gap-y-2 text-center">
                    <p>
                        No results found... ({courses.length - results.length}{" "}
                        courses hidden by filters)
                    </p>
                    {university == "University of California, Irvine" &&
                    (ge.includes("Ia") || ge.includes("Ib")) ? (
                        <p className="text-sm text-zinc-500">
                            (GE Ia and Ib are not transferable at UCI)
                        </p>
                    ) : null}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 md:gap-8">
            {results.map((result: CourseObject) => {
                const startTime = formatTime(result.startDate);
                const endTime = formatTime(result.endDate);

                return (
                    // <LazyLoad
                    //     key={
                    //         result.courseCode +
                    //         result.courseName +
                    //         result.sendingInstitution
                    //     }
                    //     offset={500}
                    // >
                    <div
                        className="border-gray rounded-t-lg border-2"
                        key={
                            result.courseCode +
                            result.courseName +
                            result.sendingInstitution
                        }
                    >
                        <div className="bg-bg_secondary flex flex-col gap-1 rounded-t-lg px-4 py-2 md:px-8 md:py-4">
                            <div className="text-primary overflow-hidden text-lg font-semibold text-ellipsis whitespace-nowrap md:text-xl">
                                {result.sendingInstitution}
                            </div>
                            <div className="text-2xl font-bold text-pretty md:text-3xl">
                                {result.courseCode}{" "}
                                <span>{result.courseName}</span>
                            </div>
                        </div>

                        {result.niceToHaves.length > 0 && (
                            <div className="flex flex-row overflow-hidden">
                                <div className="flex flex-row gap-2 overflow-x-auto px-4 py-2 md:px-8 md:py-4">
                                    {result.niceToHaves.map((tag) => (
                                        <Tags
                                            tag={tag}
                                            key={tag.toString()}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="border-bg_secondary border-2 border-t"></div>
                        <div className="flex justify-between overflow-hidden">
                            <div className="flex flex-row gap-4 overflow-x-auto px-4 py-2 md:gap-8 md:px-8 md:py-4">
                                <div className="flex flex-col whitespace-nowrap">
                                    <div className="text-sm font-medium">
                                        Units
                                    </div>
                                    <div className="text-base font-light">
                                        {`${result.units} Units`}
                                    </div>
                                </div>
                                <div className="flex flex-col whitespace-nowrap">
                                    <div className="text-sm font-medium">
                                        Term
                                    </div>
                                    <div className="text-base font-light">
                                        {startTime + " - " + endTime}
                                    </div>
                                </div>
                                <div className="flex flex-col whitespace-nowrap">
                                    <div className="text-sm font-medium">
                                        GEs
                                    </div>
                                    <div className="flex flex-row gap-2 text-base font-light">
                                        {result.fulfillsGEs
                                            .map((obj) => {
                                                const category = obj.category;

                                                return category.includes(":")
                                                    ? category.split(": ")[1]
                                                    : category;
                                            })
                                            .join(", ")}
                                    </div>
                                </div>
                                <div className="flex flex-col whitespace-nowrap">
                                    <div className="text-sm font-medium">
                                        Articulates To
                                    </div>
                                    <div className="flex flex-row gap-2 text-base font-light">
                                        {result.articulatesTo.join(", ")}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-bg_secondary border-2 border-t"></div>
                        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2 md:px-8 md:py-4">
                            <div className="text-xl font-medium">
                                <span className="hidden md:inline">
                                    Tuition:{" "}
                                </span>
                                {`$${result.tuition.toFixed(2)}`}
                            </div>

                            <div className="flex items-center gap-2">
                                <Link
                                    href={`https://assist.org/${result.assistPath}`}
                                    target="_blank"
                                    referrerPolicy="no-referrer"
                                    className="flex flex-row items-center gap-2"
                                >
                                    <Button
                                        variant="outline"
                                        className="hidden text-base md:flex"
                                    >
                                        Articulation
                                        <ExternalLinkIcon />
                                    </Button>

                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="flex text-base md:hidden"
                                    >
                                        <InfoIcon />
                                    </Button>
                                </Link>

                                <Link
                                    href={`https://search.cvc.edu/courses/${result.cvcId}`}
                                    target="_blank"
                                    referrerPolicy="no-referrer"
                                >
                                    <Button className="text-base">
                                        Register
                                        <ExternalLinkIcon />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    // </LazyLoad>
                );
            })}
        </div>
    );
}
