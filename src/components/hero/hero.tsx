import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
    return (
        <div className="my-auto flex h-fit flex-col gap-y-12 pb-24 text-center lg:pb-32">
            <div className="inline-block space-y-6 text-left">
                <div
                    className={cn(
                        "font-medium tracking-[-0.055em] sm:tracking-tighter lg:tracking-tight",
                        "text-center sm:text-center lg:text-left",
                        "text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl"
                    )}
                >
                    {/* <span className="inline-block">Get&nbsp;</span> */}

                    <span className="inline-block text-left sm:text-inherit">
                        UC Credits&nbsp;
                    </span>
                    <span className="inline-block text-left sm:text-inherit">
                        from&nbsp;
                    </span>
                    <span className="hidden text-left sm:text-inherit lg:inline-block">
                        Community College Courses
                    </span>
                    <span className="inline-block lg:hidden">
                        <span className="inline-block text-left sm:text-inherit">
                            Community&nbsp;
                        </span>
                        <span className="inline-block text-right sm:text-left">
                            College&nbsp;
                        </span>
                        <span className="inline-block text-right sm:text-inherit">
                            Courses
                        </span>
                    </span>
                </div>

                <div
                    className={cn(
                        "text-muted-foreground mx-auto text-pretty lg:mx-0 xl:w-3/4",
                        "text-center tracking-tight sm:tracking-normal lg:text-left",
                        "text-lg sm:text-lg md:text-xl lg:text-xl xl:text-2xl"
                    )}
                >
                    <span className="hidden md:inline">
                        Find online, community college classes that save you
                        time and money.&nbsp;
                    </span>
                    <span className="hidden sm:inline">
                        Search across 100+ campuses for courses you can transfer
                        for prerequisite credit and GE requirements.&nbsp;
                    </span>
                    <span className="inline sm:hidden">
                        Search across 100+ campuses for prerequisite credit and
                        GE requirements.
                    </span>
                </div>
            </div>

            <div className="mx-auto flex max-w-full flex-row gap-4 lg:mx-0">
                <Link href={"/search"}>
                    <Button
                        size="lg"
                        className="text-md h-fit max-w-full rounded-lg px-8 py-3 md:text-xl"
                    >
                        Search Courses{" "}
                    </Button>
                </Link>

                <Link href={"#how-it-works"}>
                    <Button
                        variant="outline"
                        size="lg"
                        className="text-md h-fit max-w-full rounded-lg px-8 py-3 md:text-xl"
                    >
                        How does it work?
                    </Button>
                </Link>

                {/* <Link href={"/search"}>
                    <Button
                        variant="outline"
                        size="lg"
                        className="h-fit rounded-lg px-8 py-3 text-xl"
                    >
                        Search by UC Course
                    </Button>
                </Link> */}
            </div>
        </div>
    );
}

{
    /* GE-Z sources data directly from{" "}
                        <Link
                            href="https://assist.org/"
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="underline"
                        >
                            Assist.org
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="https://cvc.edu/"
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="underline"
                        >
                            CVC.edu
                        </Link>{" "}
                        to find you high-quality, articulable
                        <ArticulableDefinition /> California Community College
                        courses that save you time and money. */
}
