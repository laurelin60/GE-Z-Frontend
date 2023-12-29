export async function queryDatabase(university: string, ge: string) {
    const universityParam = encodeURIComponent(university);
    const geParam = encodeURIComponent(ge);

    const url = `https://ge-z.info:5000/api/cvc-courses?uni=${universityParam}&ge=${geParam}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
