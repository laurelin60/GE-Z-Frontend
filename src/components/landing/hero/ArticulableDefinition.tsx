import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { HelpCircle } from "lucide-react";

export function ArticulableDefinition() {
    return (
        <Popover>
            <PopoverTrigger aria-label="definition">
                <HelpCircle className="inline-block h-lh cursor-pointer align-[calc(-0.25lh)]" />
            </PopoverTrigger>

            <PopoverContent>
                <p className="text-muted-foreground text-sm">
                    &quot;An articulated course is a course... that can be used
                    to satisfy... general education requirements at another
                    college or university.&quot; - <br />
                    <i>
                        <u>San Diego Mesa College</u>
                    </i>
                </p>
            </PopoverContent>
        </Popover>
    );
}
