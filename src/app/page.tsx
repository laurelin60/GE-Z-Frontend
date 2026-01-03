import { Suspense } from "react";
import Link from "next/link";
import { getUniversityCookie } from "@/actions/university";
import { Hero } from "@/components/landing/hero/hero";
import { PainPoints } from "@/components/landing/pain-points";
import Plasma from "@/components/Plasma";

export default async function Page() {
    const defaultUniversity = await getUniversityCookie();

    return (
        <main className="flex min-h-full flex-col gap-y-24 px-4 md:px-16">
            <div className="pointer-events-none fixed inset-0 top-0 left-0 -z-10 hidden h-screen w-full opacity-15 lg:block">
                <Plasma
                    speed={0.5}
                    color="#1295d8"
                    scale={2}
                    mouseInteractive={false}
                    direction="reverse"
                />
            </div>

            <Suspense>
                <Hero defaultUniversity={defaultUniversity} />
            </Suspense>

            <PainPoints />

            {/* <div
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
            </div> */}
        </main>
    );
}
