import React from "react";
import { FaChalkboard, FaAward, FaHandHoldingDollar } from "react-icons/fa6";

const Tags = (props: any) => {
    const { tag } = props;

    if (tag == "Online Tutoring") {
        return (
            <div className="flex w-fit flex-row items-center gap-2 whitespace-nowrap rounded-full border-2 border-border-muted px-4 py-1 font-medium">
                <div className="text-primary">
                    <FaChalkboard />
                </div>
                <div className="text-muted">Online Tutoring</div>
            </div>
        );
    }

    if (tag == "Zero Textbook Cost") {
        return (
            <div className="flex w-fit flex-row items-center gap-2 whitespace-nowrap rounded-full border-2 border-border-muted px-4 py-1 font-medium">
                <div className="text-primary">
                    <FaHandHoldingDollar />
                </div>
                <div className="text-muted">Zero Textbook Cost</div>
            </div>
        );
    }

    if (tag == "Quality Reviewed") {
        return (
            <div className="flex w-fit flex-row items-center gap-2 whitespace-nowrap rounded-full border-2 border-border-muted px-4 py-1 font-medium">
                <div className="text-primary">
                    <FaAward />
                </div>
                <div className="text-muted">Quality Reviewed</div>
            </div>
        );
    }
};

export default Tags;
