import { CourseObject } from "@/components/search/search.types";

export type DatabaseReturn = {
    data: CourseObject[];
    lastUpdated: number;
};

const cache: Record<string, [number, DatabaseReturn]> = {};
const THIRTY_MINUTES = 30 * 60 * 1000;

console.log(THIRTY_MINUTES);

export async function queryDatabase(
    university: string,
    ge: string
): Promise<DatabaseReturn> {
    const universityParam = university;
    const geParam = ge.includes("GE") ? ge.split(" ")[1] : ge;

    const cacheKey = universityParam + geParam;

    // if (cache[cacheKey]) {
    //     const [cachedDate, cachedData] = cache[cacheKey];
    //     console.log(cachedDate);

    //     if (Date.now() - cachedDate <= THIRTY_MINUTES) {
    //         console.log(cachedData);
    //         return cachedData;
    //     }
    // }

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

        cache[cacheKey] = [Date.now(), output];

        console.log(output.lastUpdated);

        return output;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
