import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";

export function SearchFilterDialog({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Dialog>
            <DialogTrigger className="flex items-center gap-2 rounded-full border-2 bg-primary px-4 py-2 text-white transition-all active:border-primary active:bg-transparent active:text-primary xl:hidden">
                <ListFilterIcon />
                Search Filters
            </DialogTrigger>

            <DialogContent
                className={cn(
                    "max-h-full overflow-auto border-none bg-transparent",
                    "[&>button.absolute]:right-8 [&>button.absolute]:top-8" // target close button
                )}
            >
                <DialogHeader>
                    <DialogDescription asChild>{children}</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
