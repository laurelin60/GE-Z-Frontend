import { useState } from "react";
import { FilterValues } from "@/components/search/search.types";

export function useSearchState() {
    const [format, setFormat] = useState<boolean[]>([true, true]);
    const [enrollment, setEnrollment] = useState<boolean[]>([true]);
    const [available, setAvailable] = useState<boolean[]>([true]);
    const [start, setStart] = useState<Date>();
    const [end, setEnd] = useState<Date>();
    const [institution, setInstitution] = useState<string>("Any Institution");
    const [min, setMin] = useState<number>(0);
    const [max, setMax] = useState<number>(20);
    const [sort, setSort] = useState<string>("Default Sort");

    const filterValues: FilterValues = {
        format,
        enrollment,
        available,
        start,
        end,
        institution,
        min,
        max,
        sort,
    };

    return {
        format,
        setFormat,
        enrollment,
        setEnrollment,
        available,
        setAvailable,
        start,
        setStart,
        end,
        setEnd,
        institution,
        setInstitution,
        min,
        setMin,
        max,
        setMax,
        sort,
        setSort,
        filterValues,
    };
}
