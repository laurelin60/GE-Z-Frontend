import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "../../ui/button";

interface SearchFilterDateSelectProps {
    onStartChange: (input: Date | undefined) => void;
    onEndChange: (input: Date | undefined) => void;
    start: Date | undefined;
    end: Date | undefined;
}

export function SearchFilterDateSelect({
    onStartChange,
    onEndChange,
    start,
    end,
}: SearchFilterDateSelectProps) {
    const handleStartChange = (date: Date | undefined) => {
        if (!date) {
            console.error("No start date selected");
            return;
        }

        onStartChange(date);
    };

    const handleEndChange = (date: Date | undefined) => {
        onEndChange(date);
    };

    return (
        <div className="relative flex flex-col">
            <div className="mb-2 text-2xl font-medium">Timeframe</div>
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
                <div>
                    <label className="text-sm font-medium text-gray">
                        Starts After
                    </label>
                    <div className="flex flex-row items-center gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-44 justify-start rounded-lg border-[1px] border-gray text-left font-normal",
                                        !start && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {start ? (
                                        format(start, "PP")
                                    ) : (
                                        <span>Start date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={start}
                                    onSelect={handleStartChange}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray">
                        Ends Before
                    </label>
                    <div className="flex flex-row items-center gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-44 justify-start rounded-lg border-[1px] border-gray text-left font-normal",
                                        !end && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {end ? (
                                        format(end, "PP")
                                    ) : (
                                        <span>End date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={end}
                                    onSelect={handleEndChange}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
            <div className="mt-4 border-2 border-t border-[#D9D9D9]"></div>
        </div>
    );
}
