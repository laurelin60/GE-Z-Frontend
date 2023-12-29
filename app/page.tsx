import Hero from "@/components/hero/Hero";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { HelpCircle, Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-[calc(100vh-96px)] flex-col items-center">
            <div className="wrapper mt-20 flex flex-col items-center gap-y-5 text-center md:mt-28">
                <h1 className="flex-center max-w-2xl flex-col text-4xl font-bold sm:text-6xl md:text-7xl">
                    <span className="hidden lg:flex">Online, Async, and </span>
                    <span className="flex text-center lg:hidden">
                        Online, Async,
                    </span>
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-5xl text-transparent sm:text-7xl">
                        Articulatable
                    </span>
                </h1>
                <p className="text-gray-600 hidden max-w-prose text-slate-600 sm:flex sm:text-lg">
                    GE-Z sources data directly from{" "}
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
                    to find you high-quality, articulatable
                    <Popover>
                        <PopoverTrigger>
                            <HelpCircle className="inline-block h-4 w-4" />
                        </PopoverTrigger>
                        <PopoverContent>
                            <p className="text-sm">
                                &quot;An articulated course is a course... that
                                can be used to satisfy... general education
                                requirements at another college or
                                university.&quot; - <br />
                                <Link
                                    href={
                                        "https://www.sdmesa.edu/about-mesa/administration/articulation/homepage-docs/Articulated%20vs%20Transferable.pdf"
                                    }
                                    referrerPolicy="no-referrer"
                                    target="_blank"
                                >
                                    <i>
                                        <u>San Diego Mesa College</u>
                                    </i>
                                </Link>
                            </p>
                        </PopoverContent>
                    </Popover>{" "}
                    California Community College courses that can accelerate
                    your academic goals, while saving you money.
                </p>
                <p className="text-gray-600 max-w-prose text-slate-600 sm:hidden">
                    GE-Z sources data directly from{" "}
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
                    to find you high-quality, articulatable
                    <Popover>
                        <PopoverTrigger>
                            <HelpCircle className="inline-block h-4 w-4" />
                        </PopoverTrigger>
                        <PopoverContent>
                            <p className="text-sm">
                                &quot;An articulated course is a course... that
                                can be used to satisfy... general education
                                requirements at another college or
                                university.&quot; - <br />
                                <Link
                                    href={
                                        "https://www.sdmesa.edu/about-mesa/administration/articulation/homepage-docs/Articulated%20vs%20Transferable.pdf"
                                    }
                                    referrerPolicy="no-referrer"
                                    target="_blank"
                                >
                                    <i>
                                        <u>San Diego Mesa College</u>
                                    </i>
                                </Link>
                            </p>
                        </PopoverContent>
                    </Popover>{" "}
                    communiy college courses.
                </p>

                <Link href={"/search"}>
                    <Button
                        className={cn(
                            buttonVariants({
                                size: "lg",
                                className: "mt-5",
                            }),
                            "flex-center w-fit gap-2 text-lg text-white",
                        )}
                    >
                        Discover Courses <Search className="h-5 w-5" />
                    </Button>
                </Link>
            </div>

            <div>
                <div className="relative isolate">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu blur-[52px] sm:-top-48"
                    >
                        <div
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[26.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-500 to-purple-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[42.1875rem]"
                        />
                    </div>
                </div>
                <div className="relative isolate hidden md:flex">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu blur-[52px] sm:-top-72"
                    >
                        <div
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                            className="relative aspect-[1155/678] w-[16.125rem] rotate-[30deg] bg-gradient-to-tr from-blue-500 to-purple-500 opacity-30 sm:w-[22.1875rem] md:-right-[5vw] lg:-right-[15vw] xl:-right-[20vw]"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
