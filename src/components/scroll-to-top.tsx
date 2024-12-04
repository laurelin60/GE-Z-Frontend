"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronUpIcon } from "lucide-react";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = useCallback(() => {
        if (window.scrollY > 700) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, []);

    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, [toggleVisibility]);

    return (
        <div
            className={cn(
                "group fixed bottom-4 right-4 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-primary px-3 transition-all",
                !isVisible
                    ? "invisible opacity-0"
                    : "visible opacity-60 hover:w-40 hover:opacity-100"
            )}
            onClick={scrollToTop}
        >
            <div className="flex items-center justify-center">
                <ChevronUpIcon style={{ color: "white" }} />
                <span className={"hidden px-2 group-hover:inline-flex"}>
                    <p className="line-clamp-1 overflow-hidden truncate text-clip font-medium tracking-wide text-white">
                        Back to top
                    </p>
                </span>
            </div>
        </div>
    );
}
