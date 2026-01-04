"use client";

import { HeroButtonsUniversitySearch } from "@/components/landing/hero/hero-buttons-university-search";
import { Button } from "@/components/ui/button";
import type { University } from "@/lib/constants";

interface HeroButtonsProps {
    defaultUniversity: University | null;
}

export function HeroButtons({ defaultUniversity }: HeroButtonsProps) {
    return (
        <div className="mx-auto flex w-full max-w-full flex-col gap-4 lg:mx-0 lg:flex-row">
            <HeroButtonsUniversitySearch
                defaultUniversity={defaultUniversity}
            />

            <Button
                variant="outline"
                size="lg"
                className="text-md h-full w-full rounded-lg px-8 py-3 md:text-xl lg:w-fit"
                onClick={() => {
                    document
                        .getElementById("how-it-works")
                        ?.scrollIntoView({ behavior: "smooth" });
                }}
            >
                How does it work?
            </Button>
        </div>
    );
}
