"use server";

import { cookies } from "next/headers";
import { UNIVERSITIES, University } from "@/lib/constants";

const GEZ_UNIVERSITY_COOKIE = "GEZ_university";

export async function setUniversityCookie(university: University) {
    const cookieStore = await cookies();
    cookieStore.set(GEZ_UNIVERSITY_COOKIE, university, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: "/",
    });
}

export async function getUniversityCookie(): Promise<University | null> {
    const cookieStore = await cookies();
    const value = cookieStore.get(GEZ_UNIVERSITY_COOKIE)?.value;

    if (value && UNIVERSITIES.includes(value as University)) {
        return value as University;
    }

    return null;
}
