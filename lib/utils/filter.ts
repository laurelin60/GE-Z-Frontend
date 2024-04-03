import { CollegeObject, FilterValues } from "../../components/search/Search";

export const startsAfter = (start: Date, result: CollegeObject) => {
    const month = result.startMonth.toString().padStart(2, "0");
    const day = result.startDay.toString().padStart(2, "0");
    const courseDate = new Date(`2024-${month}-${day}`);
    courseDate.setHours(0, 0, 0, 0);
    courseDate.setDate(courseDate.getDate() + 1);

    return courseDate > start;
};

export const endsBefore = (end: Date | undefined, result: CollegeObject) => {
    if (end == undefined) {
        return true;
    }

    const month = result.endMonth.toString().padStart(2, "0");
    const day = result.endDay.toString().padStart(2, "0");
    const courseDate = new Date(`2024-${month}-${day}`);
    courseDate.setHours(0, 0, 0, 0);
    courseDate.setDate(courseDate.getDate() + 1);

    return courseDate < end;
};

export function filterData(
    data: CollegeObject[] | undefined,
    filterValues: FilterValues,
) {
    if (!data) {
        return [];
    }

    const filteredResults = data.filter((result) => {
        const onlineFormat =
            (filterValues.format[0] && filterValues.format[1]) ||
            (result.async && filterValues.format[0]) ||
            (!result.async && filterValues.format[1]);

        const instantEnrollment = filterValues.enrollment[0]
            ? result.instantEnrollment
            : true;
        const hasOpenSeats = filterValues.available[0]
            ? result.hasOpenSeats
            : true;
        const teachingInstitution =
            result.sendingInstitution == filterValues.institution ||
            filterValues.institution == "Any Institution";
        const withinUnits =
            result.units >= filterValues.min &&
            result.units <= filterValues.max;
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
              : filterValues.sort == "Shortest Term"
                ? filteredResults.sort((courseA, courseB) => {
                      const termLengthA =
                          ((courseA.endMonth - courseA.startMonth + 12) % 12) *
                              30 +
                          (courseA.endDay - courseA.startDay);

                      const termLengthB =
                          ((courseB.endMonth - courseB.startMonth + 12) % 12) *
                              30 +
                          (courseB.endDay - courseB.startDay);

                      return termLengthA - termLengthB;
                  })
                : filteredResults;

    return sortedResults;
}
