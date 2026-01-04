import { Suspense } from "react";
import { getUniversityCookie } from "@/actions/university";
import { Hero } from "@/components/landing/hero/hero";
import { HeroButtons } from "@/components/landing/hero/hero-buttons";
import { HeroButtonsUniversitySearch } from "@/components/landing/hero/hero-buttons-university-search";
import { HowItWorks } from "@/components/landing/how-it-works";
import { PainPoints } from "@/components/landing/pain-points";
import Plasma from "@/components/Plasma";
import { cn } from "@/lib/utils";

export default async function Page() {
    const defaultUniversity = await getUniversityCookie();

    return (
        <main className="flex min-h-full flex-col gap-y-36 px-4 md:px-16">
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

            {/* <HowItWorks /> */}

            <div className="mx-auto flex w-full max-w-6xl flex-col items-center space-y-12 rounded-xl text-center">
                <div className="flex w-full flex-col gap-y-2 text-center md:gap-y-4">
                    <span
                        className={cn(
                            "font-medium tracking-[-0.055em] text-balance",
                            "sm:tracking-tighter xl:tracking-tight",
                            "text-3xl md:text-3xl lg:text-4xl xl:text-5xl"
                        )}
                    >
                        Discover hundreds of transferable courses
                    </span>
                    <span
                        className={cn(
                            "text-muted-foreground tracking-tight text-balance",
                            "text-base lg:text-lg xl:text-xl"
                        )}
                    >
                        Online, affordable, and backed by California
                        articulation agreements
                    </span>
                </div>

                <HeroButtonsUniversitySearch
                    defaultUniversity={defaultUniversity}
                />
            </div>

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
