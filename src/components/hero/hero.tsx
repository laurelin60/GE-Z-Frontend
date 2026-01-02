import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <div className="flex h-full flex-col gap-y-12 text-center">
            <div className="inline-block space-y-6 text-left">
                <div className="text-8xl font-medium tracking-tight text-balance">
                    Get{" "}
                    <Image
                        src="/seals/uc.svg"
                        alt="UC Seal"
                        width={108}
                        height={108}
                        priority
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
                    Find online, community college classes that save you time
                    and money. Search across 100+ campuses for courses you can
                    transfer for prerequisite credit and GE requirements.
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
