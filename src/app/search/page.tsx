import { Suspense } from "react";
import { Search } from "@/components/search/search";
import { UNIVERSITY_GE } from "@/lib/constants";
import { queryDatabase } from "@/lib/utils/query-db";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    // ! fix me
    const searchUniversity = (await searchParams)["university"] as string;
    const searchGE = (await searchParams)["ge"] as string;

    const university = searchUniversity || Object.keys(UNIVERSITY_GE)[0];
    const ge = searchGE || UNIVERSITY_GE[university][0];

    const coursesResponse = await queryDatabase(university, ge).catch((e) => {
        console.error(e);
    });

    if (!coursesResponse) {
        return <div>An error occurred...</div>;
    }

    const courses = coursesResponse.data;
    const lastUpdated = coursesResponse.lastUpdated;

    return (
        <Suspense>
            <Search
                university={university}
                ge={ge}
                courses={courses}
                lastUpdated={lastUpdated}
            />
        </Suspense>
    );
}
