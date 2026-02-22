import type { CourseObject } from "@/components/search/search.types";

export type DatabaseReturn = {
    data: CourseObject[];
    lastUpdated: number;
};

const cache: Record<string, [number, DatabaseReturn]> = {};
const THIRTY_MINUTES = 30 * 60 * 1000;

async function cachedFetch(
    cacheKey: string,
    url: string
): Promise<DatabaseReturn> {
    if (cache[cacheKey]) {
        const [cachedDate, cachedData] = cache[cacheKey];

        if (Date.now() - cachedDate <= THIRTY_MINUTES) {
            return cachedData;
        }
    }

    const response = await fetch(url, { cache: "no-cache" });

    if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
            return { data: [], lastUpdated: Date.now() };
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const output: DatabaseReturn = {
        data: data.data ?? [],
        lastUpdated: data.lastUpdated ?? Date.now(),
    };

    cache[cacheKey] = [Date.now(), output];

    return output;
}

export async function queryDatabase(
    university: string,
    ge: string
): Promise<DatabaseReturn> {
    const geParam = ge.includes("GE") ? ge.split(" ")[1] : ge;
    const cacheKey = university + geParam;

    const universityUri = encodeURIComponent(university);
    const geUri = encodeURIComponent(geParam);
    const url = `https://doin-ur.mom/api/cvc-courses?institution=${universityUri}&ge=${geUri}`;

    return cachedFetch(cacheKey, url);
}

export async function queryCourseDatabase(
    university: string,
    courseCode: string
): Promise<DatabaseReturn> {
    const cacheKey = `course:${university}:${courseCode}`;

    const universityUri = encodeURIComponent(university);
    const courseCodeUri = encodeURIComponent(courseCode);
    const url = `https://doin-ur.mom/api/cvc-courses/course?institution=${universityUri}&courseCode=${courseCodeUri}`;

    return cachedFetch(cacheKey, url);
}
