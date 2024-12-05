import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
    university: parseAsString.withDefault("University of California, Irvine"),
    ge: parseAsString.withDefault("GE IV"),
});
