import { cn } from "@/lib/utils";
import {
    BookCheckIcon,
    BookOpenTextIcon,
    CircleDollarSignIcon,
    ClockIcon,
    GraduationCapIcon,
    SchoolIcon,
    type LucideIcon,
} from "lucide-react";

const PAIN_POINTS = [
    {
        icon: SchoolIcon,
        title: "Search across 100+ colleges and universities",
    },
    {
        icon: GraduationCapIcon,
        title: "Clear prerequisite credit and GE requirements",
    },
    {
        icon: CircleDollarSignIcon,
        title: "Save money on expensive tuition costs and fees",
    },
    {
        icon: BookCheckIcon,
        title: "Based on verified course articulation agreements",
    },
    {
        icon: ClockIcon,
        title: "Study on your  schedule with async courses",
    },
    {
        icon: BookOpenTextIcon,
        title: "Over 500 transferable classes to choose from",
    },
] satisfies {
    icon: LucideIcon;
    title: string;
}[];

export function PainPoints() {
    return (
        <div className="flex flex-col items-center gap-y-12">
            <div className="flex w-full flex-col gap-y-2 text-center md:gap-y-4">
                <span
                    className={cn(
                        "font-medium tracking-[-0.055em] text-balance",
                        "sm:tracking-tighter xl:tracking-tight",
                        "text-3xl md:text-3xl lg:text-4xl xl:text-5xl"
                    )}
                >
                    Find courses that work for you
                </span>
                <span
                    className={cn(
                        "text-muted-foreground tracking-tight text-balance",
                        "text-base lg:text-lg xl:text-xl"
                    )}
                >
                    Don't be limited by your university's offerings
                </span>
            </div>

            <div className="grid w-full max-w-5xl grid-cols-1 gap-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                {PAIN_POINTS.map((painPoint, index) => (
                    <div
                        className={cn(
                            "mx-auto flex w-full flex-col justify-start gap-y-2",
                            "items-center text-center",
                            index >= 4 && "hidden md:flex"
                        )}
                        key={painPoint.title}
                    >
                        <div className="outline-border/80 flex w-fit items-center rounded-md p-2 outline-2">
                            <painPoint.icon
                                className={cn(
                                    "text-primary",
                                    "size-8 md:size-8"
                                )}
                            />
                        </div>
                        <span
                            className={cn(
                                "w-3/5 leading-tight font-medium text-balance sm:w-3/4 xl:w-3/4",
                                "text-base md:text-base lg:text-lg"
                            )}
                        >
                            {painPoint.title}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
