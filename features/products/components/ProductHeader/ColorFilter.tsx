"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select";
import type { Color } from "@/features/colors/types";

type ColorFilterProps = {
    colors: Color[];
};

export default function ColorFilter({ colors }: ColorFilterProps) {
    return (
        <Select>
            <SelectTrigger className="h-11 min-w-0 w-full lg:h-10 lg:w-[140px] lg:shrink-0">
                <SelectValue placeholder="Color" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Colors</SelectItem>
                {colors.map((color) => (
                    <SelectItem key={color._id} value={color._id}>
                        <span className="flex items-center gap-2">
                            <img
                                src={color.iconUrl}
                                alt={color.title}
                                className="h-4 w-4 shrink-0 rounded-full object-cover"
                            />
                            {color.title}
                        </span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
