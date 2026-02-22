import { searchCourseParamsCache } from "@/app/search-course/searchParams";
import SearchError from "@/app/search/error";
import { SearchCourse } from "@/components/search-course/search-course";
import { queryCourseDatabase } from "@/lib/utils/query-db";
import type { SearchParams } from "nuqs";

export default async function Page(props: {
    searchParams: Promise<SearchParams>;
}) {
    const searchParams = await props.searchParams;
    const { university, courseCode } =
        await searchCourseParamsCache.parse(searchParams);

    let courses: Awaited<ReturnType<typeof queryCourseDatabase>> | null = null;

    const sanitizedCode =
        courseCode
            ?.toUpperCase()
            .replace(/[^A-Z0-9& ]/g, "")
            .trim() || null;

    if (sanitizedCode) {
        courses = await queryCourseDatabase(university, sanitizedCode).catch(
            (e) => {
                console.error(e);
                return null;
            }
        );
    }

    if (sanitizedCode && !courses) {
        return (
            <SearchError
                error={`Failed to fetch courses for ${sanitizedCode}`}
            />
        );
    }

    return (
        <SearchCourse
            university={university}
            courseCode={sanitizedCode ?? ""}
            courses={courses?.data ?? []}
            lastUpdated={courses?.lastUpdated ?? 0}
        />
    );
}
