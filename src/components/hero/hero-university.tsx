"use client";

import { UNIVERSITIES } from "@/lib/constants";
import { parseAsStringLiteral, useQueryState } from "nuqs";

export function HeroUniversity() {
    const [university, _] = useQueryState(
        "university",
        parseAsStringLiteral(UNIVERSITIES).withOptions({
            shallow: false,
            clearOnDefault: false,
        })
    );

    switch (university) {
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
