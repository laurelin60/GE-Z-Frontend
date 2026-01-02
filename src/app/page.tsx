import Image from "next/image";
import Link from "next/link";
import { ArticulableDefinition } from "@/components/hero/ArticulableDefinition";
import Examples from "@/components/hero/Examples";
import Graphics from "@/components/hero/Graphics";
import { Hero } from "@/components/hero/hero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
    return (
        <main className="flex min-h-full flex-col gap-y-12 px-16 py-24">
            <Hero />

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

            {/* <Graphics /> */}
        </main>
    );
}
