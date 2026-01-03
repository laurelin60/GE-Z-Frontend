import Link from "next/link";
import { GraduationCapIcon } from "lucide-react";

export function Header() {
    return (
        <header className="bg-background z-10 box-border h-fit px-4 py-2 leading-none shadow-xs md:px-16">
            <Link
                href="/"
                className="flex w-fit"
            >
                <div className="w-fit rounded-md p-1.5">
                    <GraduationCapIcon className="text-primary size-10" />
                </div>
            </Link>
        </header>
    );
}
