import React, { useEffect, useState } from "react";
import { ChevronUpIcon } from "lucide-react";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 700) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <div
            className={`${
                isVisible
                    ? "visible opacity-60 hover:w-40 hover:opacity-100"
                    : "invisible opacity-0"
            } group fixed bottom-4 right-4 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-primary px-3 transition-all`}
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
};

export default ScrollToTop;
