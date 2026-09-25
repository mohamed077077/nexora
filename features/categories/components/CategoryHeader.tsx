"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import CategoryDialog from "./CategoryDialog";

interface CategoryHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function CategoryHeader({ search, onSearchChange }: CategoryHeaderProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <div className="flex w-full items-center gap-3">
            {/* Search bar */}
            <div className="relative min-w-0 flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search categories..."
                    className="h-10 pl-9"
                />
            </div>

            <Button
                aria-label="Add category"
                onClick={() => setIsDialogOpen(true)}
                className="
                fixed bottom-6 right-6 z-50 cursor-pointer
                size-14 rounded-full p-0 shadow-lg

                lg:static
                lg:h-10
                lg:w-auto
                lg:rounded-md
                lg:px-4
                lg:shadow-none
            "
            >
                <Plus className="size-6 lg:size-4" />
                <span className="hidden lg:inline">
                    Add Category
                </span>
            </Button>
        </div>
        <CategoryDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
        </>
    );
}