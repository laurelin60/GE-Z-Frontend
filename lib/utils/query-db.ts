import { CollegeObject } from "@/components/search/Search";

const cache: Record<string, [Date, CollegeObject[]]> = {};

export async function queryDatabase(
    university: string,
    ge: string,
): Promise<CollegeObject[]> {
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

    const url = `https://ge-z.info:5000/api/cvc-courses?uni=${universityParam}&ge=${geParam}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        cache[cacheKey] = [new Date(), data.courses];

        return data.courses;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
