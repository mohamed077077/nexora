"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select";
import type { Category } from "@/features/categories/types";
import { useProductFilterStore } from "../../store/useProductFilterStore";

type CategoryFilterProps = {
    categories: Category[];
};

export default function CategoryFilter({ categories }: CategoryFilterProps) {
    const category = useProductFilterStore((state) => state.category);
    const setCategory = useProductFilterStore((state) => state.setCategory);

    return (
        <Select value={category} onValueChange={setCategory as any}>
            <SelectTrigger className="h-11 min-w-0 w-full lg:h-10 lg:w-35 lg:shrink-0">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                        <span className="flex items-center gap-2">
                            <img
                                src={category.iconUrl}
                                alt={category.title}
                                className="h-4 w-4 shrink-0 rounded-full object-cover"
                            />
                            {category.title}
                        </span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
