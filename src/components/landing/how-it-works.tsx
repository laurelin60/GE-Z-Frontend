import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";

const STEPS = [
    {
        href: "https://assist.org",
        logo: "/logos/assist.svg",
        alt: "ASSIST",
        title: "1. Official articulation agreements",
        description:
            "Every course is backed by transfer agreements between California's community colleges and universities",
    },
    {
        href: "https://cvc.edu",
        logo: "/logos/cvc.svg",
        alt: "CVC",
        title: "2. Community college courses",
        description:
            "We search for online community college courses from accredited California colleges",
    },
    {
        href: "/search",
        linkProps: { target: "_self" },
        image: <GraduationCap className="text-primary size-full h-1/2" />,
        title: "3. Provide course offerings",
        description:
            "We aggregate course offerings across 100+ campuses and 14,000+ articulation agreements",
    },
];

export function HowItWorks() {
    return (
        <div
            className="bg-primary mx-auto flex w-full flex-col items-baseline space-y-4 rounded-xl p-4 py-8 md:space-y-12 md:p-12 scroll-mt-24"
            id="how-it-works"
        >
            <div className="flex w-full flex-col gap-y-2 text-left md:gap-y-4">
                <span
                    className={cn(
                        "text-primary-foreground font-medium tracking-[-0.055em] text-balance",
                        "sm:tracking-tighter xl:tracking-tight",
                        "text-3xl md:text-3xl lg:text-4xl xl:text-5xl"
                    )}
                >
                    How does it work?
                </span>
                <span
                    className={cn(
                        "text-shadow-primary tracking-tight text-pretty",
                        "text-base lg:text-lg xl:text-xl"
                    )}
                >
                    Our search results are sourced from official articulation
                    agreements and course offerings
                </span>
            </div>

            <div className="flex w-full max-w-full flex-wrap justify-center gap-8">
                {STEPS.map((step) => (
                    <Card
                        key={step.title}
                        className="md:w-[calc((100%-4rem)/3)] md:min-w-[400px]"
                    >
                        <CardContent className="flex flex-col space-y-4 p-4">
                            <Link
                                href={step.href}
                                target="_blank"
                                referrerPolicy="no-referrer"
                                {...step.linkProps}
                            >
                                <div className="outline-border/80 flex aspect-video max-w-full items-center justify-center rounded-md p-4 outline-2">
                                    {step.image ? (
                                        step.image
                                    ) : (
                                        <Image
                                            src={step.logo}
                                            alt={step.alt}
                                            width={100}
                                            height={100}
                                            className="aspect-video h-1/2 w-full object-contain"
                                        />
                                    )}
                                </div>
                            </Link>

                            <div className="space-y-2">
                                <p className="text-lg font-medium">
                                    {step.title}
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    {step.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
