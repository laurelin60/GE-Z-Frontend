import { CourseObject } from "@/components/search/search.types";

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

    const universityUri = encodeURIComponent(universityParam);
    const geUri = encodeURIComponent(geParam);

    const url = `https://doin-ur.mom/api/cvc-courses?institution=${universityUri}&ge=${geUri}`;

    try {
        const response = await fetch(url, {
            cache: "no-cache",
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const output = { data: data.data, lastUpdated: data.lastUpdated };

        cache[cacheKey] = [Date.now(), output];

        return output;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
