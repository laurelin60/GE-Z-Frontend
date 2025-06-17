import z from "zod/v4";

export const geAndCount = z
    .object({
        category: z.string(),
        count: z.number(),
    })
    .strict();

export const cvcCourseSchema = z
    .object({
        sendingInstitution: z.string(),
        courseCode: z.string(),
        courseName: z.string(),
        cvcId: z.string(),
        assistPath: z.string(),
        niceToHaves: z.array(z.string()),
        units: z.number(),
        tuition: z.number(),
        startDate: z.number(),
        endDate: z.number(),
        async: z.boolean(),
        hasOpenSeats: z.boolean(),
        hasPrereqs: z.boolean(),
        instantEnrollment: z.boolean(),
        fulfillsGEs: z.array(geAndCount),
        articulatesTo: z.array(z.string()),
    })
    .strict();
