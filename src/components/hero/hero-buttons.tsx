"use client";

import { useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

const GEZ_UNIVERSITY_KEY = "GEZ_university";

export function HeroButtons() {
    const router = useRouter();

    const [university, setUniversity] = useQueryState(
        "university",
        parseAsStringLiteral(UNIVERSITIES).withOptions({
            shallow: false,
            clearOnDefault: false,
        })
    );

    const clickSearchDisabled = useMemo(() => {
        return !university || !UNIVERSITIES.includes(university);
    }, [university]);

    const handleUniversityChange = useCallback(
        (value: string) => {
            setUniversity(value as University);
        },
        [setUniversity]
    );

    const handleClickSearch = useCallback(() => {
        if (clickSearchDisabled) {
            return;
        }

        router.push(`/search?university=${university}`);
    }, [clickSearchDisabled, university, router]);

    useEffect(() => {
        if (!university) {
            const stored = localStorage.getItem(GEZ_UNIVERSITY_KEY);
            if (stored && UNIVERSITIES.includes(stored as University)) {
                setUniversity(stored as University);
            }
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (university) {
            localStorage.setItem(GEZ_UNIVERSITY_KEY, university);
        }
    }, [university]);

    return (
        <div className="mx-auto flex max-w-full flex-col gap-4 lg:mx-0 lg:flex-row">
            <div className="flex flex-row gap-0">
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
                        className="h-full max-w-full rounded-lg rounded-l-none px-8 py-3 text-base disabled:opacity-100 md:text-xl"
                        disabled={clickSearchDisabled}
                    >
                        Search Courses{" "}
                    </Button>
                </div>

                <Select
                    value={university ?? undefined}
                    onValueChange={handleUniversityChange}
                >
                    <SelectTrigger className="data-placeholder:text-muted-foreground text-md peer-active:ring-primary box-border h-full w-[300px] rounded-l-lg rounded-r-none px-8 py-3 peer-active:animate-pulse peer-active:ring-2 peer-active:[animation-duration:600ms] focus:ring-0 md:text-xl [&>svg]:h-6 [&>svg]:w-6">
                        <SelectValue placeholder="Your University" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem
                            value="University of California, Irvine"
                            className="text-lg"
                        >
                            UC Irvine
                        </SelectItem>
                        <SelectItem
                            value="University of California, Los Angeles"
                            className="text-lg"
                        >
                            UC Los Angeles
                        </SelectItem>
                        <SelectItem
                            value="University of California, Santa Barbara"
                            className="text-lg"
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
                    className="text-md h-full max-w-full rounded-lg px-8 py-3 md:text-xl"
                >
                    How does it work?
                </Button>
            </Link>
        </div>
    );
}
