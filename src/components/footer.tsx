import Link from "next/link";
import { GithubIcon } from "lucide-react";

export function Footer() {
    return (
        <div className="text-primary-foreground mt-24 flex w-full shrink-0 justify-between bg-[#005581] px-4 py-4 text-base md:px-16">
            <span className="font-medium">Built with 💖 </span>
            <Link
                href="https://github.com/laurelin60/GE-Z-Frontend"
                target="_blank"
                referrerPolicy="no-referrer"
            >
                <GithubIcon />
            </Link>
        </div>
    );
}
