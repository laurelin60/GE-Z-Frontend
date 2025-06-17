"server-only";

import { CourseObject } from "@/components/search/search.types";
import { getCvcCoursesByGE, getCvcLastUpdated } from "@/lib/db/cvc";

export type DatabaseReturn = {
    data: CourseObject[];
    lastUpdated: number;
};

const cache: Record<string, [number, DatabaseReturn]> = {};
const THIRTY_MINUTES = 30 * 60 * 1000;

export async function queryDatabase(
    university: string,
    ge: string
): Promise<DatabaseReturn> {
    const universityParam = university;
    const geParam = ge.includes("GE") ? ge.split(" ")[1] : ge;

    const cacheKey = universityParam + geParam;

    if (cache[cacheKey]) {
        const [cachedDate, cachedData] = cache[cacheKey];

        if (Date.now() - cachedDate <= THIRTY_MINUTES) {
            return cachedData;
        }
    }

    try {
        const [data, lastUpdated] = await Promise.all([
            getCvcCoursesByGE({
                institution: universityParam,
                ge: geParam,
            }),
            getCvcLastUpdated(),
        ]);

        const output = { data, lastUpdated };
        cache[cacheKey] = [Date.now(), output];

        return output;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
