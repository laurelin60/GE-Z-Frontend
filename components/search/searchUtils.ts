import { CollegeObject, FilterValues } from "./Search";

const startsAfter = (start: string, result: CollegeObject) => {
    if (start == undefined) return true;

    return (
        `2024-${result.startMonth.toString().padStart(2, "0")}-${result.startDay
            .toString()
            .padStart(2, "0")}` >= start
    );
};

const endsBefore = (end: string | undefined, result: CollegeObject) => {
    if (end == undefined) return true;

    return (
        `2024-${result.endMonth.toString().padStart(2, "0")}-${result.endDay
            .toString()
            .padStart(2, "0")}` <= end
    );
};

export function filterData(data: CollegeObject[], filterValues: FilterValues) {
    const filteredResults = data?.filter((result) => {
        const onlineFormat =
            (filterValues.format[0] && filterValues.format[1]) ||
            (result.async && filterValues.format[0]) ||
            (!result.async && filterValues.format[1]);

        const instantEnrollment = filterValues.enrollment[0]
            ? result.instantEnrollment
            : false;
        const hasOpenSeats = filterValues.available[0]
            ? result.hasOpenSeats
            : false;
        const teachingInstitution =
            result.college == filterValues.institution ||
            filterValues.institution == "Any Institution";
        const withinUnits =
            parseFloat(result.units) >= filterValues.min &&
            parseFloat(result.units) <= filterValues.max;
        const withinTime =
            startsAfter(filterValues.start, result) &&
            endsBefore(filterValues.end, result);

        return (
            onlineFormat &&
            instantEnrollment &&
            hasOpenSeats &&
            teachingInstitution &&
            withinUnits &&
            withinTime
        );
    });

    const sortedResults =
        filterValues.sort == "Alphabetical"
            ? filteredResults.sort((courseA, courseB) => {
                  const nameA = courseA.courseCode + courseA.courseName;
                  const nameB = courseB.courseCode + courseB.courseName;

                  return nameA.localeCompare(nameB);
              })
            : filterValues.sort == "Tuition"
              ? filteredResults.sort((courseA, courseB) => {
                    return courseA.tuition - courseB.tuition;
                })
              : filteredResults;

    return sortedResults;
}
