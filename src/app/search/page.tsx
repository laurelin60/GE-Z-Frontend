import Error from "@/app/search/error";
import { searchParamsCache } from "@/app/search/searchParams";
import { Search } from "@/components/search/search";
import { UNIVERSITY_GE } from "@/lib/constants";
import { queryDatabase } from "@/lib/db";
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

    if (!UNIVERSITY_GE[university].includes(ge)) {
        return (
            <Error
                error={`GE (${ge}) not found for University (${university})`}
            />
        );
    }

    const data = await queryDatabase(university, ge).catch((e) => {
        console.error(e);
    });

    if (!data) {
        return <Error error={`No course response`} />;
    }

    const { data: courses, lastUpdated } = data;

    return (
        <Search
            university={university}
            ge={ge}
            courses={courses}
            lastUpdated={lastUpdated}
        />
    );
}
