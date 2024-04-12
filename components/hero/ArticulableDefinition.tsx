import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { HelpCircle } from "lucide-react";

import Link from "next/link";

const ArticulableDefinition = () => {
    return (
        <Popover>
            <PopoverTrigger aria-label="definition">
                <HelpCircle className="inline-block h-4 w-4" />
            </PopoverTrigger>
            <PopoverContent>
                <p className="text-sm text-muted-foreground">
                    &quot;An articulated course is a course... that can be used
                    to satisfy... general education requirements at another
                    college or university.&quot; - <br />
                    <Link
                        href={
                            "https://www.sdmesa.edu/about-mesa/administration/articulation/homepage-docs/Articulated%20vs%20Transferable.pdf"
                        }
                        referrerPolicy="no-referrer"
                        target="_blank"
                    >
                        <i>
                            <u>San Diego Mesa College</u>
                        </i>
                    </Link>
                </p>
            </PopoverContent>
        </Popover>
    );
};

export default ArticulableDefinition;
