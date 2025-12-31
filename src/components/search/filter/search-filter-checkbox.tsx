import { Checkbox } from "@/components/ui/checkbox";

interface SearchFilterCheckboxProps {
    title: string;
    value: boolean[];
    onChange: (input: boolean[]) => void;
    categories: string[];
}

export const SearchFilterCheckbox = ({
    title,
    categories,
    onChange,
    value,
}: SearchFilterCheckboxProps) => {
    const toggleCategory = (index: number) => {
        const newCategoryStates = [...value];
        newCategoryStates[index] = !value[index];

        onChange(newCategoryStates);
    };

    return (
        <div className="flex flex-col">
            <div className="mb-2 text-2xl font-medium">{title}</div>
            <div className="flex flex-row flex-wrap gap-x-4 gap-y-2">
                {categories.map((category, index) => (
                    <div
                        key={category}
                        className="flex items-center justify-center space-x-2"
                    >
                        <Checkbox
                            id={category + "label"}
                            className="size-5 text-white"
                            checked={value[index]}
                            onClick={() => toggleCategory(index)}
                        />
                        <label
                            htmlFor={category + "label"}
                            className="text-lg"
                        >
                            {category}
                        </label>
                    </div>
                ))}
            </div>
            <div className="mt-4 border-2 border-t border-[#D9D9D9]"></div>
        </div>
    );
};
