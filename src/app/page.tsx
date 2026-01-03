import { Hero } from "@/components/hero/hero";
import Plasma from "@/components/Plasma";

export default function Home() {
    return (
        <main className="flex min-h-full flex-col gap-y-12 px-4 py-24 md:px-16">
            <div className="pointer-events-none absolute inset-0 top-0 left-0 -z-10 hidden h-screen w-full opacity-15 lg:block">
                <Plasma
                    speed={0.5}
                    color="#1295d8"
                    scale={2}
                    mouseInteractive={true}
                    direction="reverse"
                />
            </div>

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
