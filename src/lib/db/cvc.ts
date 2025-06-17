"server-only";

import { db } from "@/db";
import { cvcCourseSchema } from "@/lib/types/cvc";
import { Prisma } from "@prisma/client";
import { uniqBy } from "lodash";
import { z } from "zod/v4";

export const getCvcCoursesByGE = async (props: {
    institution: string;
    ge: string;
    take?: number;
    skip?: number;
}) => {
    const institution = await db.institution.findFirst({
        where: {
            OR: [{ name: props.institution }, { code: props.institution }],
        },
    });

    if (!institution) {
        throw new Error(`Institution '${props.institution}' not found`);
    }

    const geCategory = await db.geCategory.findFirst({
        where: {
            institution: {
                id: institution.id,
            },
            category: props.ge,
        },
    });

    if (!geCategory) {
        throw new Error(
            `Category '${props.ge}' not found for institution '${props.institution}'`
        );
    }

    const cvcCourses = await db.cvcCourse.findMany({
        take: props.take,
        skip: props.skip,
        where: {
            fulfillsGEs: {
                some: {
                    geCategory: {
                        id: geCategory.id,
                    },
                },
            },
        },
        include: {
            fulfillsGEs: {
                include: {
                    geCategory: true,
                },
                where: {
                    geCategory: {
                        institution: {
                            id: institution.id,
                        },
                    },
                },
            },
            articulatesTo: {
                where: {
                    toInstitution: {
                        id: institution.id,
                    },
                },
                include: {
                    to: true,
                    toInstitution: true,
                },
            },
        },
    });
    return cvcCourses.map(cvcQueryToResponse);
};

export const getCvcLastUpdated = async () => {
    const cvcCourse = await db.cvcCourse.findFirst();

    if (!cvcCourse) {
        throw new Error("No CVC courses found, cannot get last updated");
    }
    return cvcCourse.updatedAt.getTime();
};

function cvcQueryToResponse(
    cvcCourse: Prisma.CvcCourseGetPayload<{
        include: {
            fulfillsGEs: {
                include: {
                    geCategory: true;
                };
            };
            articulatesTo: { include: { to: true; toInstitution: true } };
        };
    }>
) {
    return {
        sendingInstitution: cvcCourse.college,
        courseCode: cvcCourse.courseCode,
        courseName: cvcCourse.courseName,
        cvcId: cvcCourse.cvcId,
        assistPath: cvcCourse.articulatesTo[0].assistPath,
        niceToHaves: cvcCourse.niceToHaves,
        units: cvcCourse.units,
        tuition: cvcCourse.tuition,
        startDate: cvcCourse.startDate.getTime(),
        endDate: cvcCourse.endDate.getTime(),
        async: cvcCourse.async,
        hasOpenSeats: cvcCourse.hasOpenSeats,
        hasPrereqs: cvcCourse.hasPrereqs,
        instantEnrollment: cvcCourse.instantEnrollment,
        fulfillsGEs: cvcCourse.fulfillsGEs.map((fulfillsGe) => ({
            count: fulfillsGe.count,
            category: fulfillsGe.geCategory.category,
        })),
        articulatesTo: uniqBy(
            cvcCourse.articulatesTo.flatMap((articulation) => articulation.to),
            "id"
        ).flatMap((to) => to.courseDepartment + " " + to.courseNumber),
    } satisfies z.infer<typeof cvcCourseSchema>;
}
