"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DatabaseReturn, queryDatabase } from "@/lib/utils/query-db";

interface Example {
    name: string;
    geText: string;
    institution: string;
    ge: string;
    link: string;
}

const EXAMPLES: Example[] = [
    {
        name: "UC Irvine",
        geText: "GE IV - Arts and Humanities",
        institution: "UCI",
        ge: "IV",
        link: "/search?uni=University%20of%20California%2C%20Irvine&ge=GE%20IV",
    },
    {
        name: "UCLA",
        geText: "Life Sciences",
        institution: "UCLA",
        ge: "Scientific Inquiry: Life Sciences",
        link: "search?uni=University%20of%20California%2C%20Los%20Angeles&ge=Scientific%20Inquiry%3A%20Life%20Sciences",
    },
    {
        name: "UC Santa Barbara",
        geText: "GE E - Culture and Thought",
        institution: "UCSB",
        ge: "E",
        link: "/search?uni=University%20of%20California%2C%20Santa%20Barbara&ge=GE%20E",
    },
];

const ExampleCard = ({ example }: { example: Example }) => {
    const [data, setData] = useState<DatabaseReturn>();

    useEffect(() => {
        const fetchData = async () => {
            const courses = await queryDatabase(
                example.institution,
                example.ge
            );
            setData(courses);
        };
        fetchData();
    }, [example.name, example.ge, example.institution]);

    return (
        <Link
            href={example.link}
            key={example.name + example.ge}
        >
            <Card className="w-[275px] drop-shadow-md hover:shadow-md sm:w-[300px]">
                <CardHeader>
                    <CardTitle>{example.name}</CardTitle>
                    <CardDescription>{example.geText}</CardDescription>
                </CardHeader>
                <CardFooter className="flex text-neutral-600">
                    <span className="font-bold text-primary">
                        <b>{data?.data.length ?? "..."}</b>
                    </span>
                    &nbsp;Courses&nbsp;
                    <span className="hidden sm:flex">Found</span>
                </CardFooter>
            </Card>
        </Link>
    );
};

const Examples = () => {
    return (
        <div className="flex flex-wrap gap-4 px-6 sm:justify-center lg:px-8">
            {EXAMPLES.map((example) => (
                <ExampleCard
                    key={example.institution + example.ge}
                    example={example}
                />
            ))}
        </div>
    );
};

export default Examples;
