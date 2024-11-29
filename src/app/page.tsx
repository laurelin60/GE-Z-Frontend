import { Button, buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";

import Examples from "@/components/hero/Examples";
import Graphics from "@/components/hero/Graphics";
import ArticulableDefinition from "@/components/hero/ArticulableDefinition";

export default function Home() {
    return (
        <main className="flex min-h-[calc(100vh-96px)] flex-col items-center">
            <div className="wrapper mt-20 flex flex-col items-center gap-y-5 text-center md:mt-24">
                <div className="flex flex-col items-center gap-y-5 text-center">
                    <h1 className="flex-center max-w-2xl flex-col text-4xl font-bold xs:text-5xl sm:text-6xl">
                        <span className="hidden md:flex">
                            Online, Async, and{" "}
                        </span>
                        <span className="flex text-center md:hidden">
                            Online, Async,
                        </span>
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-5xl text-transparent xs:text-7xl sm:text-8xl md:text-9xl">
                            Articulable
                        </span>
                    </h1>
                    <p className="max-w-prose px-2 text-muted-foreground sm:text-lg">
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
                        to find you high-quality, articulable
                        <ArticulableDefinition /> California Community College
                        courses that save you time and money.
                    </p>
                </div>
                <Link href={"/search"}>
                    <Button
                        className={cn(
                            buttonVariants({
                                size: "lg",
                            }),
                            "flex-center w-fit gap-2 text-lg text-white",
                        )}
                    >
                        Discover Courses <Search className="h-5 w-5" />
                    </Button>
                </Link>
            </div>

            <Graphics />

            <div className="mx-auto my-24 flex max-w-5xl flex-col gap-4 md:my-32">
                <div className="px-6 lg:px-8">
                    <div className="mx-auto flex max-w-2xl flex-col gap-4 sm:text-center">
                        <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">
                            Check out some searches
                        </h2>
                        <p className="text-lg text-slate-600">
                            GE-Z makes course discovery simple. No complicated
                            articulation agreements necessary.
                        </p>
                    </div>
                </div>

                <Examples />
            </div>
        </main>
    );
}
