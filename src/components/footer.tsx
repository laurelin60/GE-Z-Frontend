import { GithubIcon } from "lucide-react";

export function Footer() {
    return (
        <div className="flex h-24 flex-col items-center justify-between px-2 py-2 text-center sm:relative sm:w-[100%] sm:place-content-center sm:px-8 sm:py-0">
            <div className="flex flex-col">
                <div className="text-lg sm:text-xl">Made with 💖</div>
                <div className="text-xs sm:text-sm">
                    Copyright &copy; 2024 | All Rights Reserved
                </div>
            </div>
            <div className="flex text-3xl sm:absolute sm:right-24 sm:top-[26px] sm:text-4xl">
                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/laurelin60/GE-Z-Frontend"
                        target="_blank"
                        referrerPolicy="no-referrer"
                        aria-label="GE-Z GitHub"
                    >
                        <GithubIcon />
                    </a>
                </div>
            </div>
        </div>
    );
}
