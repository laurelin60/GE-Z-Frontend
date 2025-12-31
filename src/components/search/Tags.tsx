import React from "react";
import { AwardIcon, HandCoinsIcon, PresentationIcon } from "lucide-react";

interface TagsProps {
    tag: string;
}

const Tags = (props: TagsProps) => {
    const { tag } = props;

    if (tag == "Online Tutoring") {
        return (
            <div className="text-muted-foreground inline-flex w-fit flex-row items-center rounded-full border-2 px-4 py-1 whitespace-nowrap">
                <PresentationIcon className="size-5" />
                &nbsp;
                <div>Online Tutoring</div>
            </div>
        );
    }

    if (tag == "Zero Textbook Cost") {
        return (
            <div className="text-muted-foreground inline-flex w-fit flex-row items-center rounded-full border-2 px-4 py-1 whitespace-nowrap">
                <HandCoinsIcon className="size-5" />
                &nbsp;
                <div>Zero Textbook Cost</div>
            </div>
        );
    }

    if (tag == "Quality Reviewed") {
        return (
            <div className="text-muted-foreground inline-flex w-fit flex-row items-center rounded-full border-2 px-4 py-1 whitespace-nowrap">
                <AwardIcon className="size-5" />
                &nbsp;
                <div>Quality Reviewed</div>
            </div>
        );
    }
};

export default Tags;
