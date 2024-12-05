export const UNIVERSITIES = [
    "University of California, Irvine",
    "University of California, Santa Barbara",
    "University of California, Los Angeles",
] as const;

export type University = (typeof UNIVERSITIES)[number];

export const UNIVERSITY_GE: Record<University, readonly string[]> = {
    "University of California, Irvine": [
        "GE Ia",
        "GE Ib",
        "GE II",
        "GE III",
        "GE IV",
        "GE Va",
        "GE Vb",
        "GE VI",
        "GE VII",
        "GE VIII",
    ] as const,
    "University of California, Santa Barbara": [
        "GE A1",
        "GE A2",
        "GE B",
        "GE C",
        "GE D",
        "GE E",
        "GE F",
        "GE G",
    ] as const,
    "University of California, Los Angeles": [
        "Arts and Humanities: Literary and Cultural Analysis",
        "Arts and Humanities: Philosophical and Linguistic Analysis",
        "Arts and Humanities: Visual and Performance Arts Analysis and Practice",
        "Scientific Inquiry: Life Sciences",
        "Scientific Inquiry: Physical Sciences",
        "Society and Culture: Historical Analysis",
        "Society and Culture: Social Analysis",
    ] as const,
};
