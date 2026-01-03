import { Suspense } from "react";
import Link from "next/link";
import { getUniversityCookie } from "@/actions/university";
import { Hero } from "@/components/landing/hero/hero";
import { PainPoints } from "@/components/landing/pain-points";
import Plasma from "@/components/Plasma";
import { Card, CardContent } from "@/components/ui/card";
import { ClockIcon } from "lucide-react";

export default async function Page() {
    const defaultUniversity = await getUniversityCookie();

    return (
        <main className="flex min-h-full flex-col gap-y-24 px-4 md:px-16">
            <div className="pointer-events-none absolute inset-0 top-0 left-0 -z-10 hidden h-screen w-full opacity-15 lg:block">
                <Plasma
                    speed={0.5}
                    color="#1295d8"
                    scale={2}
                    mouseInteractive={true}
                    direction="reverse"
                />
            </div>

            <Suspense>
                <Hero defaultUniversity={defaultUniversity} />
            </Suspense>

            <PainPoints />

            <div
                className="flex flex-col items-center gap-y-12"
                id="how-it-works"
            >
                <span className="text-center text-5xl font-medium tracking-[-0.055em] sm:tracking-tighter xl:tracking-tight">
                    How does it work?
                </span>

                <div className="grid w-full grid-cols-2 gap-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="aspect-video w-full bg-blue-300" />
                            <p>Foo</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>foo</CardContent>
                    </Card>
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
        </main>
    );
}
