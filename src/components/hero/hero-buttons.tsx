"use client";

import { useCallback, useEffect, useMemo, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setUniversityCookie } from "@/actions/university";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { UNIVERSITIES, University } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { parseAsStringLiteral, useQueryState } from "nuqs";

interface HeroButtonsProps {
    defaultUniversity: University | null;
}

export function HeroButtons({ defaultUniversity }: HeroButtonsProps) {
    const router = useRouter();
    const [, startTransition] = useTransition();

    const [university, setUniversity] = useQueryState(
        "university",
        parseAsStringLiteral(UNIVERSITIES).withOptions({
            shallow: false,
            clearOnDefault: false,
        })
    );

    // Use URL state if available, otherwise fall back to server-side cookie value
    const effectiveUniversity = university ?? defaultUniversity;

    const clickSearchDisabled = useMemo(() => {
        return (
            !effectiveUniversity ||
            !UNIVERSITIES.includes(effectiveUniversity as University)
        );
    }, [effectiveUniversity]);

    const handleUniversityChange = useCallback(
        (value: string) => {
            setUniversity(value as University);
            // Persist to cookie for future visits
            startTransition(() => {
                setUniversityCookie(value as University);
            });
        },
        [setUniversity]
    );

    const handleClickSearch = useCallback(() => {
        if (clickSearchDisabled) {
            return;
        }

        router.push(`/search?university=${effectiveUniversity}`);
    }, [clickSearchDisabled, effectiveUniversity, router]);

    // Sync URL state with cookie default on mount (if URL doesn't have university param)
    useEffect(() => {
        if (!university && defaultUniversity) {
            setUniversity(defaultUniversity);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="mx-auto flex max-w-full flex-col gap-4 lg:mx-0 lg:flex-row">
            <div className="flex flex-col gap-0 sm:flex-row">
                {/* Button wrapper comes first in DOM for peer selector, but displays second via order */}
                <div
                    className={cn(
                        "order-last shrink-0",
                        clickSearchDisabled
                            ? "peer cursor-default"
                            : "cursor-pointer"
                    )}
                    onClick={
                        clickSearchDisabled ? undefined : handleClickSearch
                    }
                >
                    <Button
                        size="lg"
                        className="h-full w-full max-w-full rounded-lg rounded-t-none px-8 py-3 text-base disabled:opacity-100 sm:rounded-t-lg sm:rounded-l-none md:text-xl"
                        disabled={clickSearchDisabled}
                    >
                        Search Courses{" "}
                    </Button>
                </div>

                <Select
                    value={effectiveUniversity ?? undefined}
                    onValueChange={handleUniversityChange}
                >
                    <SelectTrigger className="data-placeholder:text-muted-foreground text-md peer-active:ring-primary box-border h-full w-[350px] rounded-r-none rounded-b-none px-8 py-3 peer-active:animate-pulse peer-active:ring-2 peer-active:[animation-duration:600ms] focus:ring-0 sm:rounded-l-lg sm:rounded-b-lg md:text-xl [&>svg]:h-6 [&>svg]:w-6">
                        <SelectValue placeholder="Your University" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            value="University of California, Irvine"
                            className="text-base md:text-lg"
                        >
                            UC Irvine
                        </SelectItem>
                        <SelectItem
                            value="University of California, Los Angeles"
                            className="text-base md:text-lg"
                        >
                            UC Los Angeles
                        </SelectItem>
                        <SelectItem
                            value="University of California, Santa Barbara"
                            className="text-base md:text-lg"
                        >
                            UC Santa Barbara
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Link href={"#how-it-works"}>
                <Button
                    variant="outline"
                    size="lg"
                    className="text-md h-full w-full max-w-full rounded-lg px-8 py-3 md:text-xl"
                >
                    How does it work?
                </Button>
            </Link>
        </div>
    );
}
