export async function queryDatabase(GE: string) {
    const url = `http://ge-z.info:5000/api/cvc-courses?category=${GE}`;

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
