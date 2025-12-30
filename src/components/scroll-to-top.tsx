"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronUpIcon } from "lucide-react";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    const toggleVisibility = useCallback(() => {
        const scrollElement = buttonRef.current?.parentElement;
        if (!scrollElement) return;

        if (scrollElement.scrollTop > 700) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, []);

    const scrollToTop = useCallback(() => {
        const scrollElement = buttonRef.current?.parentElement;
        if (!scrollElement) return;

        scrollElement.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        const scrollElement = buttonRef.current?.parentElement;
        if (!scrollElement) return;

        scrollElement.addEventListener("scroll", toggleVisibility);

        return () => {
            scrollElement.removeEventListener("scroll", toggleVisibility);
        };
    }, [toggleVisibility]);

    return (
        <div
            ref={buttonRef}
            className={cn(
                "group fixed bottom-4 right-4 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-primary px-3 transition-all",
                !isVisible
                    ? "invisible opacity-0"
                    : "visible opacity-80 hover:w-40 hover:opacity-100"
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
