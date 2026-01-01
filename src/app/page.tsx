import Image from "next/image";
import Link from "next/link";
import { ArticulableDefinition } from "@/components/hero/ArticulableDefinition";
import Examples from "@/components/hero/Examples";
import Graphics from "@/components/hero/Graphics";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
    return (
        <main className="flex flex-col space-y-12 px-16 py-24">
            <div className="flex flex-col gap-y-12 text-center">
                <div className="inline-block space-y-6 text-left">
                    <div className="text-8xl font-medium tracking-tight text-balance">
                        Get{" "}
                        <img
                            src="/seals/uc.svg"
                            alt="UC Seal"
                            className="inline-block h-lh align-[calc(-0.15lh)]"
                        />
                        <span>UC</span> Credits from Community College Courses
                    </div>

                    <div className="text-muted-foreground w-3/4 text-2xl">
                        {/* GE-Z sources data directly from{" "}
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
                        courses that save you time and money. */}
                        Find online, asynchronous classes that save you time and
                        money. Search across 120 CSU campuses for courses you
                        can transfer for prerequisite credit and GE
                        requirements.
                    </div>
                </div>

                <div className="flex flex-row gap-4">
                    <Link href={"/search"}>
                        <Button
                            size="lg"
                            className="h-fit rounded-lg px-8 py-3 text-xl"
                        >
                            Search Courses{" "}
                        </Button>
                    </Link>

                    <Link href={"/search"}>
                        <Button
                            variant="outline"
                            size="lg"
                            className="h-fit rounded-lg px-8 py-3 text-xl"
                        >
                            Search by UC Course
                        </Button>
                    </Link>
                </div>
            </div>

            {/* <div className="grid grid-cols-3 gap-8">
                <Card className="aspect-square w-full">FOOBAR</Card>
                <Card className="aspect-square w-full">FOOBAR</Card>
                <Card className="aspect-square w-full">FOOBAR</Card>
            </div> */}

            {/* 
            <div className="w-3/4 rounded-t-4xl">
                <p className="text-6xl font-semibold">With support for:</p>
                <div className="grid grid-cols-3 gap-8">
                    <Image
                        src="/seals/ucla.svg"
                        alt="UCLA"
                        width={120}
                        height={120}
                    />
                    <Image
                        src="/seals/uci.svg"
                        alt="UCI"
                        width={120}
                        height={120}
                    />
                    <Image
                        src="/seals/ucsb.png"
                        alt="UCSB"
                        width={120}
                        height={120}
                    />
                </div>
            </div> */}

            {/* <div className="mx-auto my-24 flex max-w-5xl flex-col gap-4 md:my-32">
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
            </div> */}

            <Graphics />
        </main>
    );
}
