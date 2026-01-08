import { getUniversityCookie } from "@/actions/university";
import { Hero } from "@/components/landing/hero/hero";
import { HeroButtonsUniversitySearch } from "@/components/landing/hero/hero-buttons-university-search";
import { HowItWorks } from "@/components/landing/how-it-works";
import { PainPoints } from "@/components/landing/pain-points";
import { cn } from "@/lib/utils";
import { MeshGradient } from "@paper-design/shaders-react";

export default async function Page() {
    const defaultUniversity = await getUniversityCookie();

    return (
        <main className="flex min-h-full flex-col gap-y-36 px-4 md:px-16">
            <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 flex justify-center opacity-50 lg:block">
                <MeshGradient
                    style={{ maxWidth: 1728, margin: "auto" }}
                    width={"100%"}
                    height={"100vh"}
                    colors={[
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                        "#0f7cb3",
                        "#ffffff",
                        "#ffffff",
                    ]}
                    distortion={0.1}
                    swirl={1}
                    grainMixer={0.3}
                    grainOverlay={0}
                    speed={0.5}
                    scale={1}
                    offsetX={0.6}
                />
            </div>

            <Hero defaultUniversity={defaultUniversity} />

            <PainPoints />

            <HowItWorks />

            <div className="mx-auto flex w-full max-w-6xl flex-col items-center space-y-12 rounded-xl">
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
        </main>
    );
}
