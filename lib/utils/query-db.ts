import { CourseObject } from "../../components/search/Search";

type DatabaseReturn = {
    data: CourseObject[];
    lastUpdated: number;
};

const cache: Record<string, [Date, DatabaseReturn]> = {};

export async function queryDatabase(
    university: string,
    ge: string,
): Promise<DatabaseReturn> {
    const cacheKey = university + ge;

    if (cache[cacheKey] && cache[cacheKey][0]) {
        const [cachedDate, cachedData] = cache[cacheKey];

        // If not older than 30 minutes, return cached courses
        if ((new Date().getTime() - cachedDate.getTime()) / (1000 * 60) <= 30) {
            return cachedData;
        }
    }

    const universityParam = encodeURIComponent(university);
    const geParam = encodeURIComponent(ge);

    const url = `https://ge-z.info/api/cvc-courses?institution=${universityParam}&ge=${geParam}`;

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
