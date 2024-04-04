// import LazyLoad from "react-lazy-load";
import { FaUpRightFromSquare } from "react-icons/fa6";
import { CourseObject } from "./Search";
import Tags from "./Tags";
import { format } from "date-fns";

const formatTime = (date: number) => {
    return format(new Date(date), "MMM d");
};

interface SearchResultsProps {
    results: CourseObject[];
    university: string;
    ge: string;
}

const SearchResults = (props: SearchResultsProps) => {
    const { results, university, ge } = props;

    return (
        <>
            <div className="flex flex-col gap-4 md:gap-8">
                {results.length > 0 ? (
                    results.map((result: CourseObject) => {
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
                                    <div className="text-2xl font-bold md:text-3xl">
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
                                                    .map((obj) => obj.category)
                                                    .join(", ")}
                                            </div>
                                        </div>
                                        <div className="flex flex-col whitespace-nowrap">
                                            <div className="text-sm font-medium">
                                                Articulates To
                                            </div>
                                            <div className="flex flex-row gap-2 text-base font-light">
                                                {result.articulatesTo.join(
                                                    ", ",
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-2 border-t border-bg_secondary"></div>
                                <div className="flex flex-col justify-between gap-y-2 px-4 py-2 md:flex-row md:px-8 md:py-4">
                                    <div className="flex flex-row items-center gap-3 text-2xl font-semibold">
                                        Tuition:{" "}
                                        <span className="text-primary">
                                            {`$${result.tuition.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 font-medium">
                                        <button className="rounded-lg border-2 border-primary bg-primary px-4 py-1 text-white transition-all active:border-primary active:bg-transparent active:text-primary">
                                            <a
                                                href={`https://assist.org/${result.assistPath}`}
                                                target="_blank"
                                                referrerPolicy="no-referrer"
                                                className="flex flex-row items-center gap-2"
                                            >
                                                Assist
                                                <FaUpRightFromSquare />
                                            </a>
                                        </button>
                                        <button className="rounded-lg border-2 px-4 py-1 text-primary transition-all active:border-primary active:bg-primary active:text-white">
                                            <a
                                                href={`https://search.cvc.edu/courses/${result.cvcId}`}
                                                target="_blank"
                                                referrerPolicy="no-referrer"
                                                className="flex flex-row items-center gap-2"
                                            >
                                                CVC
                                                <FaUpRightFromSquare />
                                            </a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            // </LazyLoad>
                        );
                    })
                ) : (
                    <div className="flex flex-col gap-2 text-2xl">
                        <div className="flex justify-center">
                            <img
                                src="/no_results.png"
                                alt="no results"
                                className="pointer-events-none flex w-[500px] justify-center"
                            />
                        </div>
                        <div className="flex w-full flex-col justify-center gap-y-2 text-center">
                            <p>No results found...</p>
                            {university == "University of California, Irvine" &&
                            (ge.includes("Ia") || ge.includes("Ib")) ? (
                                <p className="text-sm text-zinc-500">
                                    (GE Ia and Ib are not transferable at UCI)
                                </p>
                            ) : null}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchResults;
