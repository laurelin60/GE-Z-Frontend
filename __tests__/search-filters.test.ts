import { FilterValues } from "@/components/search/search";
import {
    endsBefore,
    filterData,
    startsAfter,
} from "@/components/search/filterUtils";
import "@testing-library/jest-dom";

const data = {
    institution: "University of California, Irvine",
    geCategory: "II",
    courses: [
        {
            sendingInstitution: "placeholder sending institution 1",
            courseCode: "placeholder course code 1",
            courseName: "placeholder course name 1",
            cvcId: "123456",
            niceToHaves: ["Zero Textbook Cost"],
            units: 4,
            term: "Mar 11 - May 25",
            startMonth: 1,
            startDay: 1,
            endMonth: 6,
            endDay: 1,
            tuition: 138,
            async: true,
            hasOpenSeats: true,
            hasPrereqs: false,
            instantEnrollment: true,
            assistPath: "placeholder path 1",
            articulatesTo: ["placeholder course 1"],
            fulfillsGEs: ["II"],
        },
        {
            sendingInstitution: "placeholder sending institution 2",
            courseCode: "placeholder course code 2",
            courseName: "placeholder course name 2",
            cvcId: "1234567",
            niceToHaves: ["Zero Textbook Cost"],
            units: 16,
            term: "Mar 11 - May 25",
            startMonth: 1,
            startDay: 1,
            endMonth: 6,
            endDay: 1,
            tuition: 100,
            async: false,
            hasOpenSeats: false,
            hasPrereqs: false,
            instantEnrollment: false,
            assistPath: "placeholder path 2",
            articulatesTo: ["placeholder course 2"],
            fulfillsGEs: ["II"],
        },
    ],
};

const defaultFilterValues: FilterValues = {
    format: [true, true],
    enrollment: [false],
    available: [false],
    start: "2023-12-20",
    end: undefined,
    institution: "Any Institution",
    min: 0,
    max: 20,
    sort: "Default Sort",
};

describe("Search Filters", () => {
    test("empty courses do not throw error", async () => {
        expect(() => filterData([], defaultFilterValues)).not.toThrow(Error);
    });

    test("default filter values do not throw error", async () => {
        expect(() => filterData(data.courses, defaultFilterValues)).not.toThrow(
            Error,
        );
    });

    test("default filter values return all", async () => {
        const result = filterData(data.courses, {
            ...defaultFilterValues,
        });
        expect(result).toEqual(data.courses);
    });

    test("no formats filters correctly", async () => {
        const result = filterData(data.courses, {
            ...defaultFilterValues,
            format: [false, false],
        });
        expect(result).toEqual([]);
    });

    test("both formats filters correctly", async () => {
        const result = filterData(data.courses, {
            ...defaultFilterValues,
            format: [true, true],
        });
        expect(result).toEqual(data.courses);
    });

    test("only async format filters correctly", async () => {
        const result = filterData(data.courses, {
            ...defaultFilterValues,
            format: [true, false],
        });
        expect(result.every((course) => course.async)).toBe(true);
    });

    test("only sync format filters correctly", async () => {
        const result = filterData(data.courses, {
            ...defaultFilterValues,
            format: [false, true],
        });

        expect(result.every((course) => !course.async)).toBe(true);
    });

    test("only instant enrollment filters correctly", async () => {
        const result = filterData(data.courses, {
            ...defaultFilterValues,
            enrollment: [true],
        });

        expect(result.every((course) => course.instantEnrollment)).toBe(true);
    });

    test("only available seats filters correctly", async () => {
        const result = filterData(data.courses, {
            ...defaultFilterValues,
            available: [true],
        });
        expect(result.every((course) => course.hasOpenSeats)).toBe(true);
    });

    test("any institution filters correctly", async () => {
        const result = filterData(data.courses, {
            ...defaultFilterValues,
            institution: "Any Institution",
        });
        expect(result).toEqual(data.courses);
    });

    test("specific institution filters correctly", async () => {
        const result = filterData(data.courses, {
            ...defaultFilterValues,
            institution: "placeholder sending institution 1",
        });
        expect(result[0].sendingInstitution).toEqual(
            "placeholder sending institution 1",
        );
    });

    test("min units filters correctly", async () => {
        const result = filterData(data.courses, {
            ...defaultFilterValues,
            min: 5,
        });
        expect(result.every((course) => course.units >= 5)).toBe(true);
    });

    test("max units filters correctly", async () => {
        const result = filterData(data.courses, {
            ...defaultFilterValues,
            max: 5,
        });
        expect(result.every((course) => course.units <= 5)).toBe(true);
    });
});

describe("Filter Utils' Time Utilities", () => {
    test("startsAfter undefined", async () => {
        const result = startsAfter(undefined, data.courses[0]);
        expect(result).toBe(true);
    });

    test("startsAfter defined returns true", async () => {
        const result = startsAfter("2023-12-25", data.courses[0]);
        expect(result).toBe(true);
    });

    test("startsAfter defined returns false", async () => {
        const result = startsAfter("2024-12-25", data.courses[0]);
        expect(result).toBe(false);
    });

    test("endsBefore undefined", async () => {
        const result = endsBefore(undefined, data.courses[0]);
        expect(result).toBe(true);
    });

    test("endsBefore defined returns true", async () => {
        const result = endsBefore("2024-06-14", data.courses[0]);
        expect(result).toBe(true);
    });

    test("endsBefore defined returns false", async () => {
        const result = endsBefore("2024-05-14", data.courses[0]);
        expect(result).toBe(false);
    });

    test("tuition sorts correctly", async () => {
        const result = filterData(data.courses, {
            ...defaultFilterValues,
            sort: "Tuition",
        });
        expect(result[0].sendingInstitution).toEqual(
            "placeholder sending institution 2",
        );
    });
});

describe("Search Sorting", () => {
    test("default sorts correctly", async () => {
        const result = filterData(data.courses, {
            ...defaultFilterValues,
            sort: "Alphabetical",
        });
        expect(result[0].sendingInstitution).toEqual(
            "placeholder sending institution 1",
        );
    });

    test("alphabetical sorts correctly", async () => {
        const result = filterData(data.courses, {
            ...defaultFilterValues,
            sort: "Alphabetical",
        });
        expect(result[0].sendingInstitution).toEqual(
            "placeholder sending institution 1",
        );
    });

    test("tuition sorts correctly", async () => {
        const result = filterData(data.courses, {
            ...defaultFilterValues,
            sort: "Tuition",
        });
        expect(result[0].sendingInstitution).toEqual(
            "placeholder sending institution 2",
        );
    });
});
