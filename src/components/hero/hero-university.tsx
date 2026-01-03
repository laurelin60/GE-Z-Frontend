"use client";

import { UNIVERSITIES, University } from "@/lib/constants";
import { parseAsStringLiteral, useQueryState } from "nuqs";

interface HeroUniversityProps {
    defaultUniversity: University | null;
}

export function HeroUniversity({ defaultUniversity }: HeroUniversityProps) {
    const [university] = useQueryState(
        "university",
        parseAsStringLiteral(UNIVERSITIES).withOptions({
            shallow: false,
            clearOnDefault: false,
        })
    );

    const effectiveUniversity = university ?? defaultUniversity;

    switch (effectiveUniversity) {
        case "University of California, Irvine":
            return "UCI";
        case "University of California, Los Angeles":
            return "UCLA";
        case "University of California, Santa Barbara":
            return "UCSB";
        default:
            return "UC";
    }
}
