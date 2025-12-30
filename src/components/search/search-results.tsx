import Link from "next/link";
import type { CourseObject } from "@/components/search/search.types";
import { useSearchContext } from "@/contexts/search-context/search-context";
import { filterData } from "@/lib/utils/filter";
import { format } from "date-fns";
import { ExternalLinkIcon } from "lucide-react";
import LazyLoad from "react-lazy-load";

import Tags from "./Tags";

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
                    <LazyLoad
                        key={
                            result.courseCode +
                            result.courseName +
                            result.sendingInstitution
                        }
                        offset={500}
                    >
                        <div
                            className="rounded-t-lg border-2 border-gray"
                            key={
                                result.courseCode +
                                result.courseName +
                                result.sendingInstitution
                            }
                        >
                            <div className="flex flex-col gap-2 rounded-t-lg bg-bg_secondary px-4 py-2 md:px-8 md:py-4">
                                <div className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-primary md:text-xl">
                                    {result.sendingInstitution}
                                </div>
                                <div className="text-pretty text-2xl font-bold md:text-3xl">
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
                            <div className="border-2 border-t border-bg_secondary"></div>
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
                                                    const category =
                                                        obj.category;

                                                    return category.includes(
                                                        ":"
                                                    )
                                                        ? category.split(
                                                              ": "
                                                          )[1]
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
                            <div className="border-2 border-t border-bg_secondary"></div>
                            <div className="flex flex-wrap justify-between gap-x-4 gap-y-2 px-4 py-2 md:px-8 md:py-4">
                                <div className="flex flex-row items-center gap-3 text-xl font-semibold md:text-2xl">
                                    Tuition:{" "}
                                    <span className="text-primary">
                                        {`$${result.tuition.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 font-medium">
                                    <Link
                                        href={`https://assist.org/${result.assistPath}`}
                                        target="_blank"
                                        referrerPolicy="no-referrer"
                                        className="flex flex-row items-center gap-2"
                                    >
                                        <button className="box-border flex h-9 flex-nowrap items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white transition-all hover:bg-primary/90">
                                            Assist
                                            <ExternalLinkIcon className="size-5" />
                                        </button>
                                    </Link>
                                    <a
                                        href={`https://search.cvc.edu/courses/${result.cvcId}`}
                                        target="_blank"
                                        referrerPolicy="no-referrer"
                                        className="flex flex-row items-center gap-2"
                                    >
                                        <button className="box-border flex h-9 flex-nowrap items-center gap-2 rounded-lg border-2 px-4 py-2 text-primary transition-all hover:bg-accent">
                                            CVC
                                            <ExternalLinkIcon className="size-5" />
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </LazyLoad>
                );
            })}
        </div>
    );
}
