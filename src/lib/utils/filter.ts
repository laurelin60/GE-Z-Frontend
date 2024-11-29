import { CourseObject, FilterValues } from "../../components/search/Search";

export const startsAfter = (start: Date | undefined, result: CourseObject) => {
    if (start === undefined) {
        return true;
    }

    const courseDate = new Date(result.startDate);

    courseDate.setHours(0, 0, 0, 0);
    courseDate.setDate(courseDate.getDate() + 1);

    return courseDate > start;
};

export const endsBefore = (end: Date | undefined, result: CourseObject) => {
    if (end === undefined) {
        return true;
    }

    const courseDate = new Date(result.endDate);

    courseDate.setHours(0, 0, 0, 0);
    courseDate.setDate(courseDate.getDate() + 1);

    return courseDate < end;
};

export function filterData(
    data: CourseObject[] | undefined,
    filterValues: FilterValues
) {
    if (!data) {
        return [];
    }

    const filteredResults = data.filter((result) => {
        const onlineFormat =
            (filterValues.format[0] && filterValues.format[1]) ||
            (result.async && filterValues.format[0]) ||
            (!result.async && filterValues.format[1]);
        const hasOpenSeats = filterValues.available[0]
            ? result.hasOpenSeats
            : true;
        const teachingInstitution =
            result.sendingInstitution == filterValues.institution ||
            filterValues.institution == "Any Institution";
        const withinTime =
            startsAfter(filterValues.start, result) &&
            endsBefore(filterValues.end, result);

        return (
            onlineFormat && hasOpenSeats && teachingInstitution && withinTime
        );
    });

    const sort = filterValues.sort;

    if (sort === "Alphabetical") {
        filteredResults.sort((courseA, courseB) => {
            const nameA = courseA.courseCode + courseA.courseName;
            const nameB = courseB.courseCode + courseB.courseName;

            return nameA.localeCompare(nameB);
        });
    } else if (sort === "Tuition") {
        filteredResults.sort((courseA, courseB) => {
            return courseA.tuition - courseB.tuition;
        });
    } else if (sort === "Shortest Term") {
        filteredResults.sort((courseA, courseB) => {
            const termLengthA = courseA.endDate - courseA.startDate;
            const termLengthB = courseB.endDate - courseB.startDate;

            return termLengthA - termLengthB;
        });
    } else {
        // Default Sort pushes past courses to the bottom of the list

        const pastCourses = filteredResults.filter(
            (course) => new Date(course.startDate) <= new Date()
        );

        const futureCourses = filteredResults.filter(
            (course) => new Date(course.startDate) > new Date()
        );

        const dateAggregatedCourses = [];
        dateAggregatedCourses.push(...futureCourses);
        dateAggregatedCourses.push(...pastCourses);

        return dateAggregatedCourses;
    }

    return filteredResults;
}
