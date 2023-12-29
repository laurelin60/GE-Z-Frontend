import Hero from "@/components/hero/Hero";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-[calc(100vh-96px)] flex-col items-center">
            <div className="wrapper mt-20 flex flex-col items-center gap-y-5 text-center md:mt-28">
                {/* <h1 className="text-9xl font-bold">GE-Z</h1> */}
                <h1 className="flex-center max-w-2xl flex-col text-6xl font-bold md:text-7xl">
                    <span className="hidden md:flex">Online, Async, and </span>
                    <span className="flex text-center md:hidden">
                        Online, Async,
                    </span>
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-7xl text-transparent">
                        Articulatable
                    </span>
                </h1>
                <p className="text-gray-600 max-w-prose text-lg text-slate-600">
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
                    to find you high-quality California Community College
                    courses that can accelerate your academic goals, while
                    saving you money.
                </p>
            </div>

            <div>
                <Link href={"/search"}>
                    <Button
                        className={cn(
                            buttonVariants({ size: "lg", className: "mt-5" }),
                            "flex-center w-fit gap-2 text-lg text-white",
                        )}
                    >
                        Discover Courses <Search className="h-5 w-5" />
                    </Button>
                </Link>
            </div>
        </main>
    );
}
