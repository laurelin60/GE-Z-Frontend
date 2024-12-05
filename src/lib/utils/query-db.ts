import { CourseObject } from "@/components/search/search.types";

export type DatabaseReturn = {
    data: CourseObject[];
    lastUpdated: number;
};

const cache: Record<string, [Date, DatabaseReturn]> = {};

export async function queryDatabase(
    university: string,
    ge: string
): Promise<DatabaseReturn> {
    const universityParam = university;
    const geParam = ge.includes("GE") ? ge.split(" ")[1] : ge;

    const cacheKey = universityParam + geParam;

    if (cache[cacheKey] && cache[cacheKey][0]) {
        const [cachedDate, cachedData] = cache[cacheKey];

        // If not older than 30 minutes, return cached courses
        if ((new Date().getTime() - cachedDate.getTime()) / (1000 * 60) <= 30) {
            return cachedData;
        }
    }

    const universityUri = encodeURIComponent(universityParam);
    const geUri = encodeURIComponent(geParam);

    const url = `https://i-did-ur.mom/api/cvc-courses?institution=${universityUri}&ge=${geUri}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const output = { data: data.data, lastUpdated: data.lastUpdated };

        cache[cacheKey] = [new Date(), output];

        return output;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
