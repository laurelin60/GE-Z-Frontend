import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCapIcon } from "lucide-react";

export function Header() {
    return (
        <header className="bg-background sticky top-0 z-10 box-border flex h-fit items-center justify-between px-4 py-2 leading-none shadow-xs md:px-16">
            <Link
                href="/"
                className="flex w-fit"
            >
                <div className="w-fit rounded-md p-1.5">
                    <GraduationCapIcon className="text-primary size-10" />
                </div>
            </Link>

            <div className="flex items-center gap-2">
                <Link href="/search">
                    <Button
                        variant="ghost"
                        className="flex items-center gap-0 text-base font-medium"
                    >
                        Search{" "}
                        <span className="hidden md:inline">&nbsp;by&nbsp;</span>
                        GE
                    </Button>
                </Link>
                <Link href="/search-course">
                    <Button
                        variant="ghost"
                        className="flex items-center gap-0 text-base font-medium"
                    >
                        Search{" "}
                        <span className="hidden md:inline">&nbsp;by&nbsp;</span>
                        Course
                    </Button>
                </Link>
            </div>
        </header>
    );
}
