import { CourseObject, FilterValues } from "@/components/search/Search";
import { endsBefore, filterData, startsAfter } from "@/lib/utils/filter";
import "@testing-library/jest-dom";

interface CourseData {
    status: number;
    data: CourseObject[];
    lastUpdated: number; // unix
}

const data: CourseData = {
    status: 200,
    data: [
        {
            sendingInstitution: "placeholder sending institution 1",
            courseCode: "placeholder course code 1",
            courseName: "placeholder course name 1",
            cvcId: "123456",
            niceToHaves: ["Zero Textbook Cost"],
            units: 4,
            startDate: 1704096000000,
            endDate: 1717138800000,
            tuition: 138,
            async: true,
            hasOpenSeats: true,
            hasPrereqs: false,
            instantEnrollment: true,
            assistPath: "placeholder path 1",
            articulatesTo: ["placeholder course 1"],
            fulfillsGEs: [{ category: "II", count: 1 }],
        },
        {
            sendingInstitution: "placeholder sending institution 2",
            courseCode: "placeholder course code 2",
            courseName: "placeholder course name 2",
            cvcId: "1234567",
            niceToHaves: ["Zero Textbook Cost"],
            units: 16,
            startDate: 1704096000000,
            endDate: 1717225200000,
            tuition: 100,
            async: false,
            hasOpenSeats: false,
            hasPrereqs: false,
            instantEnrollment: false,
            assistPath: "placeholder path 2",
            articulatesTo: ["placeholder course 2"],
            fulfillsGEs: [{ category: "II", count: 1 }],
        },
        {
            sendingInstitution: "placeholder sending institution 3",
            courseCode: "placeholder course code 3",
            courseName: "placeholder course name 3",
            cvcId: "1234567",
            niceToHaves: ["Zero Textbook Cost"],
            units: 16,
            startDate: 1704009600000,
            endDate: 1704096000000,
            tuition: 100,
            async: false,
            hasOpenSeats: false,
            hasPrereqs: false,
            instantEnrollment: false,
            assistPath: "placeholder path 3",
            articulatesTo: ["placeholder course 3"],
            fulfillsGEs: [{ category: "II", count: 1 }],
        },
    ],
    lastUpdated: 100,
};

const defaultFilterValues: FilterValues = {
    format: [true, true],
    enrollment: [false],
    available: [false],
    start: new Date(2023, 11, 20),
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
        expect(() => filterData(data.data, defaultFilterValues)).not.toThrow(
            Error,
        );
    });

    test("default filter values return all", async () => {
        const result = filterData(data.data, {
            ...defaultFilterValues,
        });
        expect(result).toEqual(data.data);
    });

    test("no formats filters correctly", async () => {
        const result = filterData(data.data, {
            ...defaultFilterValues,
            format: [false, false],
        });
        expect(result).toEqual([]);
    });

    test("both formats filters correctly", async () => {
        const result = filterData(data.data, {
            ...defaultFilterValues,
            format: [true, true],
        });
        expect(result).toEqual(data.data);
    });

    test("only async format filters correctly", async () => {
        const result = filterData(data.data, {
            ...defaultFilterValues,
            format: [true, false],
        });
        expect(result.every((course) => course.async)).toBe(true);
    });

    test("only sync format filters correctly", async () => {
        const result = filterData(data.data, {
            ...defaultFilterValues,
            format: [false, true],
        });

        expect(result.every((course) => !course.async)).toBe(true);
    });

    test("only instant enrollment filters correctly", async () => {
        const result = filterData(data.data, {
            ...defaultFilterValues,
            enrollment: [true],
        });

        expect(result.every((course) => course.instantEnrollment)).toBe(true);
    });

    test("only available seats filters correctly", async () => {
        const result = filterData(data.data, {
            ...defaultFilterValues,
            available: [true],
        });
        expect(result.every((course) => course.hasOpenSeats)).toBe(true);
    });

    test("any institution filters correctly", async () => {
        const result = filterData(data.data, {
            ...defaultFilterValues,
            institution: "Any Institution",
        });
        expect(result).toEqual(data.data);
    });

    test("specific institution filters correctly", async () => {
        const result = filterData(data.data, {
            ...defaultFilterValues,
            institution: "placeholder sending institution 1",
        });
        expect(result[0].sendingInstitution).toEqual(
            "placeholder sending institution 1",
        );
    });

    test("min units filters correctly", async () => {
        const result = filterData(data.data, {
            ...defaultFilterValues,
            min: 5,
        });
        expect(result.every((course) => course.units >= 5)).toBe(true);
    });

    test("max units filters correctly", async () => {
        const result = filterData(data.data, {
            ...defaultFilterValues,
            max: 5,
        });
        expect(result.every((course) => course.units <= 5)).toBe(true);
    });
});

describe("Filter Utils' Time Utilities", () => {
    test("startsAfter defined returns true", async () => {
        const result = startsAfter(new Date("2023-12-25"), data.data[0]);
        expect(result).toBe(true);
    });

    test("startsAfter defined returns false", async () => {
        const result = startsAfter(new Date("2024-12-25"), data.data[0]);
        expect(result).toBe(false);
    });

    test("endsBefore undefined", async () => {
        const result = endsBefore(undefined, data.data[0]);
        expect(result).toBe(true);
    });

    test("endsBefore defined returns true", async () => {
        const result = endsBefore(new Date("2024-06-14"), data.data[0]);
        expect(result).toBe(true);
    });

    test("endsBefore defined returns false", async () => {
        const result = endsBefore(new Date("2024-05-14"), data.data[0]);
        expect(result).toBe(false);
    });

    test("tuition sorts correctly", async () => {
        const result = filterData(data.data, {
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
        const result = filterData(data.data, {
            ...defaultFilterValues,
            sort: "Alphabetical",
        });
        expect(result[0].sendingInstitution).toEqual(
            "placeholder sending institution 1",
        );
    });

    test("alphabetical sorts correctly", async () => {
        const result = filterData(data.data, {
            ...defaultFilterValues,
            sort: "Alphabetical",
        });
        expect(result[0].sendingInstitution).toEqual(
            "placeholder sending institution 1",
        );
    });

    test("tuition sorts correctly", async () => {
        const result = filterData(data.data, {
            ...defaultFilterValues,
            sort: "Tuition",
        });
        expect(result[0].sendingInstitution).toEqual(
            "placeholder sending institution 2",
        );
    });

    test("shortest term sorts correctly", async () => {
        const result = filterData(data.data.slice(0, 2), {
            ...defaultFilterValues,
            sort: "Shortest Term",
        });
        expect(result[0].sendingInstitution).toEqual(
            "placeholder sending institution 1",
        );
    });

    test("shortest term sorts correctly on december courses", async () => {
        const result = filterData(data.data, {
            ...defaultFilterValues,
            sort: "Shortest Term",
        });

        console.log(result);

        expect(result[0].sendingInstitution).toEqual(
            "placeholder sending institution 3",
        );
    });
});
