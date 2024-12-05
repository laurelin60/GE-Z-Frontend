export interface CourseObject {
    sendingInstitution: string;
    courseCode: string;
    courseName: string;
    cvcId: string;
    assistPath: string;
    niceToHaves: string[];
    units: number;
    tuition: number;
    startDate: number;
    endDate: number;
    async: boolean;
    hasOpenSeats: boolean;
    hasPrereqs: boolean;
    instantEnrollment: boolean;
    fulfillsGEs: FullFillsGE[];
    articulatesTo: string[];
}

type FullFillsGE = {
    category: string;
    count: number;
};

export type FilterValues = {
    format: boolean[];
    enrollment: boolean[];
    available: boolean[];
    start: Date | undefined;
    end: Date | undefined;
    institution: string;
    min: number;
    max: number;
    sort: string;
};
