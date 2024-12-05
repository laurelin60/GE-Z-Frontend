import { Suspense } from "react";
import { searchParamsCache } from "@/app/search/searchParams";
import { Search } from "@/components/search/search";
import { UNIVERSITY_GE } from "@/lib/constants";
import { queryDatabase } from "@/lib/utils/query-db";
import { SearchParams } from "nuqs";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const { university: searchUniversity, ge: searchGe } =
        await searchParamsCache.parse(searchParams);

    const university = searchUniversity || Object.keys(UNIVERSITY_GE)[0];
    const ge = searchGe || UNIVERSITY_GE[university][0];

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
