import { CollegeObject } from "./Search";

const cache: Record<string, CollegeObject[]> = {};

export async function queryDatabase(
    university: string,
    ge: string,
): Promise<CollegeObject[]> {
    console.log(cache);
    if (cache[university + ge]) {
        return cache[university + ge];
    }

    const universityParam = encodeURIComponent(university);
    const geParam = encodeURIComponent(ge);

    const url = `https://ge-z.info:5000/api/cvc-courses?uni=${universityParam}&ge=${geParam}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        cache[university + ge] = data.courses;

        return data.courses;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
