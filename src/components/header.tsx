import Link from "next/link";
import { GraduationCapIcon } from "lucide-react";

export function Header() {
    return (
        <header className="bg-background box-border h-fit px-4 py-4 leading-none shadow-xs md:px-16">
            <Link
                href="/"
                className="flex w-fit"
            >
                <div className="outline-border/80 w-fit rounded-md p-1.5 outline-2">
                    <GraduationCapIcon className="text-primary size-8" />
                </div>
            </Link>
        </header>
    );
}
