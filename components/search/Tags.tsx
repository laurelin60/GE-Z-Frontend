import React from "react";
import { FaChalkboard, FaAward, FaHandHoldingDollar } from "react-icons/fa6";

interface TagsProps {
    tag: string;
}

const Tags = (props: TagsProps) => {
    const { tag } = props;

    if (tag == "Online Tutoring") {
        return (
            <div className="flex w-fit flex-row items-center gap-2 whitespace-nowrap rounded-full border-2 border-gray px-4 py-1 font-medium text-gray">
                <div className="text-black">
                    <FaChalkboard />
                </div>
                <div>Online Tutoring</div>
            </div>
        );
    }

    if (tag == "Zero Textbook Cost") {
        return (
            <div className="flex w-fit flex-row items-center gap-2 whitespace-nowrap rounded-full border-2 border-gray px-4 py-1 font-medium text-gray">
                <div className="text-black">
                    <FaHandHoldingDollar />
                </div>
                <div>Zero Textbook Cost</div>
            </div>
        );
    }

    if (tag == "Quality Reviewed") {
        return (
            <div className="flex w-fit flex-row items-center gap-2 whitespace-nowrap rounded-full border-2 border-gray px-4 py-1 font-medium text-gray">
                <div className="text-black">
                    <FaAward />
                </div>
                <div>Quality Reviewed</div>
            </div>
        );
    }
};

export default Tags;
