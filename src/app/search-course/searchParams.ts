import { UNIVERSITIES } from "@/lib/constants";
import {
    createSearchParamsCache,
    parseAsString,
    parseAsStringLiteral,
} from "nuqs/server";

export const searchCourseParamsCache = createSearchParamsCache({
    university: parseAsStringLiteral(UNIVERSITIES).withDefault(
        "University of California, Irvine"
    ),
    courseCode: parseAsString,
});
