import { CourseObject } from "../../components/search/Search";

const cache: Record<string, [Date, CourseObject[]]> = {};

export async function queryDatabase(
    university: string,
    ge: string,
): Promise<CourseObject[]> {
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

        cache[cacheKey] = [new Date(), data.data];

        return data.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
