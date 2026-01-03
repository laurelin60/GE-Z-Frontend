import { cn } from "@/lib/utils";
import {
    BicepsFlexedIcon,
    BookCheckIcon,
    BookOpenTextIcon,
    CircleDollarSignIcon,
    ClockIcon,
    GraduationCapIcon,
    UniversityIcon,
    type LucideIcon,
} from "lucide-react";

const PAIN_POINTS = [
    {
        icon: UniversityIcon,
        title: "Search across 100+ colleges and universities",
    },
    {
        icon: GraduationCapIcon,
        title: "Clear prerequisite credit and GE requirements",
    },
    {
        icon: CircleDollarSignIcon,
        title: "Save money on expensive tuition and fees",
    },
    {
        icon: BookCheckIcon,
        title: "Based on verified course articulation agreements",
    },
    {
        icon: ClockIcon,
        title: "Study on your own schedule with asynchronous courses",
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
            <span className="flex flex-col items-center gap-y-2 md:gap-y-4">
                <span className="text-center text-3xl font-medium tracking-[-0.055em] text-balance sm:tracking-tighter md:text-3xl lg:text-4xl xl:text-5xl xl:tracking-tight">
                    Find courses that work for you
                </span>
                <span
                    className={cn(
                        "text-muted-foreground text-center tracking-tight text-balance",
                        "text-base lg:text-lg xl:text-xl"
                    )}
                >
                    Don't be limited by your university's offerings
                </span>
            </span>

            <div className="grid w-fit max-w-5xl grid-cols-1 gap-8 gap-y-12 sm:grid-cols-3">
                {PAIN_POINTS.map((painPoint, index) => (
                    <div
                        className={cn(
                            "mx-auto flex w-fit max-w-fit flex-col items-center gap-y-2 text-center",
                            index >= PAIN_POINTS.length / 2 && "hidden md:flex"
                        )}
                        key={painPoint.title}
                    >
                        <span>
                            <painPoint.icon className="text-primary size-8" />
                        </span>
                        <span
                            className={cn(
                                "mx-auto leading-tight font-medium text-balance",
                                "text-sm md:text-base lg:text-lg"
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
