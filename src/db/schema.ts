import { relations } from "drizzle-orm";
import {
    boolean,
    integer,
    numeric,
    pgTable,
    primaryKey,
    serial,
    text,
    timestamp,
    uniqueIndex,
    varchar,
} from "drizzle-orm/pg-core";

export const institutions = pgTable(
    "institution",
    {
        id: serial("id").primaryKey(),
        updatedAt: timestamp("updated_at", {
            withTimezone: true,
            mode: "date",
        })
            .notNull()
            .defaultNow(),
        createdAt: timestamp("created_at", {
            withTimezone: true,
            mode: "date",
        })
            .notNull()
            .defaultNow(),
        name: varchar("name", { length: 255 }).notNull(),
        code: varchar("code", { length: 255 }).notNull(),
    },
    (table) => {
        return {
            nameUniq: uniqueIndex("institution_name_unique").on(table.name),
            codeUniq: uniqueIndex("institution_code_unique").on(table.code),
        };
    }
);

export const geCategories = pgTable(
    "ge_category",
    {
        id: serial("id").primaryKey(),
        updatedAt: timestamp("updated_at", {
            withTimezone: true,
            mode: "date",
        })
            .notNull()
            .defaultNow(),
        createdAt: timestamp("created_at", {
            withTimezone: true,
            mode: "date",
        })
            .notNull()
            .defaultNow(),
        category: varchar("category", { length: 255 }).notNull(),
        institutionId: integer("institution_id")
            .notNull()
            .references(() => institutions.id, { onDelete: "cascade" }),
    },
    (table) => {
        return {
            institutionCategoryUniq: uniqueIndex(
                "gecategory_institution_category_unique"
            ).on(table.institutionId, table.category),
        };
    }
);

export const courses = pgTable(
    "course",
    {
        id: serial("id").primaryKey(),
        updatedAt: timestamp("updated_at", {
            withTimezone: true,
            mode: "date",
        })
            .notNull()
            .defaultNow(),
        createdAt: timestamp("created_at", {
            withTimezone: true,
            mode: "date",
        })
            .notNull()
            .defaultNow(),
        courseCode: varchar("course_code", { length: 255 }).notNull(),
        courseDepartment: varchar("course_department", {
            length: 255,
        }).notNull(),
        courseNumber: varchar("course_number", { length: 255 }).notNull(),
        courseName: text("course_name").default(""),

        institutionId: integer("institution_id")
            .notNull()
            .references(() => institutions.id, { onDelete: "cascade" }),
    },
    (table) => {
        return {
            uniqueInstitutionCourse: uniqueIndex(
                "course_institution_coursecode_unique"
            ).on(table.institutionId, table.courseCode),
        };
    }
);

export const cvcCourses = pgTable(
    "cvc_course",
    {
        id: serial("id").primaryKey(),
        updatedAt: timestamp("updated_at", {
            withTimezone: true,
            mode: "date",
        })
            .notNull()
            .defaultNow(),
        createdAt: timestamp("created_at", {
            withTimezone: true,
            mode: "date",
        })
            .notNull()
            .defaultNow(),
        college: varchar("college", { length: 255 }).notNull(),
        courseCode: varchar("course_code", { length: 255 }).notNull(),
        courseName: text("course_name").notNull(),
        cvcId: varchar("cvc_id", { length: 255 }).notNull(),

        niceToHaves: text("nice_to_haves").array(),
        units: numeric("units"),
        startDate: timestamp("start_date", {
            withTimezone: true,
            mode: "date",
        }).notNull(),
        endDate: timestamp("end_date", {
            withTimezone: true,
            mode: "date",
        }).notNull(),
        async: boolean("async").notNull(),
        hasOpenSeats: boolean("has_open_seats").notNull(),
        hasPrereqs: boolean("has_prereqs").notNull(),
        instantEnrollment: boolean("instant_enrollment").notNull(),
        tuition: integer("tuition").notNull(),
    },
    (table) => {
        return {
            uniqueCvc: uniqueIndex("cvccourse_cvcid_coursecode_unique").on(
                table.cvcId,
                table.courseCode
            ),
        };
    }
);

export const cvcFulfillsGe = pgTable(
    "cvc_fulfills_ge",
    {
        id: serial("id").primaryKey(),
        updatedAt: timestamp("updated_at", {
            withTimezone: true,
            mode: "date",
        })
            .notNull()
            .defaultNow(),
        createdAt: timestamp("created_at", {
            withTimezone: true,
            mode: "date",
        })
            .notNull()
            .defaultNow(),
        count: integer("count").default(1).notNull(),
        cvcCourseId: integer("cvc_course_id")
            .notNull()
            .references(() => cvcCourses.id, { onDelete: "cascade" }),
        geCategoryId: integer("ge_category_id")
            .notNull()
            .references(() => geCategories.id, { onDelete: "cascade" }),
    },
    (table) => {
        return {
            uniqueCvcGe: uniqueIndex("cvcfulfillsge_cvc_ge_unique").on(
                table.cvcCourseId,
                table.geCategoryId
            ),
        };
    }
);

export const articulations = pgTable(
    "articulation",
    {
        id: serial("id").primaryKey(),
        updatedAt: timestamp("updated_at", {
            withTimezone: true,
            mode: "date",
        })
            .notNull()
            .defaultNow(),
        createdAt: timestamp("created_at", {
            withTimezone: true,
            mode: "date",
        })
            .notNull()
            .defaultNow(),
        assistPath: text("assist_path").notNull(),
        fromCollege: varchar("from_college", { length: 255 }).notNull(),
        toInstitutionName: varchar("to_institution_name", {
            length: 255,
        }).notNull(),
        fromCoursesStrings: text("from_courses_strings").array().notNull(),
        toCoursesStrings: text("to_courses_strings").array().notNull(),
        toInstitutionId: integer("to_institution_id").references(
            () => institutions.id,
            {
                onDelete: "set null",
            }
        ),
    },
    (table) => {
        return {
            articulationUnique: uniqueIndex(
                "articulation_from_to_courses_unique"
            ).on(
                table.fromCollege,
                table.toInstitutionName,
                table.fromCoursesStrings,
                table.toCoursesStrings
            ),
        };
    }
);

export const courseGeCategories = pgTable(
    "course_ge_category",
    {
        courseId: integer("course_id")
            .notNull()
            .references(() => courses.id, { onDelete: "cascade" }),
        geCategoryId: integer("ge_category_id")
            .notNull()
            .references(() => geCategories.id, { onDelete: "cascade" }),
    },
    (table) => [primaryKey({ columns: [table.courseId, table.geCategoryId] })]
);

export const articulationCvcCourses = pgTable(
    "articulation_cvc_course",
    {
        articulationId: integer("articulation_id")
            .notNull()
            .references(() => articulations.id, { onDelete: "cascade" }),
        cvcCourseId: integer("cvc_course_id")
            .notNull()
            .references(() => cvcCourses.id, { onDelete: "cascade" }),
    },
    (table) => [
        primaryKey({
            columns: [table.articulationId, table.cvcCourseId],
        }),
    ]
);

export const articulationCourses = pgTable(
    "articulation_course",
    {
        articulationId: integer("articulation_id")
            .notNull()
            .references(() => articulations.id, { onDelete: "cascade" }),
        courseId: integer("course_id")
            .notNull()
            .references(() => courses.id, { onDelete: "cascade" }),
    },
    (table) => [primaryKey({ columns: [table.articulationId, table.courseId] })]
);

export const institutionRelations = relations(institutions, ({ many }) => ({
    geCategories: many(geCategories),
    courses: many(courses),
    articulations: many(articulations),
}));

export const geCategoryRelations = relations(geCategories, ({ one, many }) => ({
    institution: one(institutions, {
        fields: [geCategories.institutionId],
        references: [institutions.id],
    }),
    courses: many(courseGeCategories),
    cvcCourses: many(cvcFulfillsGe),
}));

export const courseRelations = relations(courses, ({ one, many }) => ({
    institution: one(institutions, {
        fields: [courses.institutionId],
        references: [institutions.id],
    }),
    geCategories: many(courseGeCategories),
    articulations: many(articulationCourses),
}));

export const cvcCourseRelations = relations(cvcCourses, ({ many }) => ({
    geCategories: many(cvcFulfillsGe),
    articulations: many(articulationCvcCourses),
}));

export const articulationRelations = relations(
    articulations,
    ({ one, many }) => ({
        toInstitution: one(institutions, {
            fields: [articulations.toInstitutionId],
            references: [institutions.id],
        }),
        fromCourses: many(articulationCvcCourses),
        toCourses: many(articulationCourses),
    })
);
