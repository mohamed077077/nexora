"use client";

import { useState } from "react";

import AppAddButton from "@/shared/components/AppAddButton";
import AppSearchBar from "@/shared/components/AppSearchBar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select";
import ProductDialog from "@/features/products/components/ProductDialog/ProductDialog";
import type { Category } from "@/features/categories/types";
import type { Color } from "@/features/colors/types";
import CategoryFilter from "./CategoryFilter";
import ColorFilter from "./ColorFilter";
import { useProductFilterStore } from "../../store/useProductFilterStore";

type ProductHeaderProps = {
    categories: Category[];
    colors: Color[];
};

export default function ProductHeader({
    categories,
    colors,
}: ProductHeaderProps) {
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    
    const search = useProductFilterStore((state) => state.search);
    const setSearch = useProductFilterStore((state) => state.setSearch);
    const price = useProductFilterStore((state) => state.price);
    const setPrice = useProductFilterStore((state) => state.setPrice);

    return (
        <>
            <div className="grid w-full gap-3 lg:flex lg:items-center">
                <AppSearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Search products..."
                />

                <div className="grid min-w-0 grid-cols-3 gap-3 lg:flex">
                    {categories.length > 0 && (
                        <CategoryFilter categories={categories} />
                    )}

                    {colors.length > 0 && <ColorFilter colors={colors} />}

                    {categories.length > 0 && colors.length > 0 && (
                        <Select value={price} onValueChange={setPrice as any}>
                            <SelectTrigger className="h-11 min-w-0 w-full lg:h-10 lg:w-35 lg:shrink-0">
                                <SelectValue placeholder="Price" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All Prices</SelectItem>
                                <SelectItem value="0-50">$0 - $50</SelectItem>
                                <SelectItem value="50-100">$50 - $100</SelectItem>
                                <SelectItem value="100-plus">
                                    Over $100
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                </div>

                <AppAddButton
                    label="Add Product"
                    ariaLabel="Add product"
                    onClick={() => setIsAddProductOpen(true)}
                />
            </div>

            <ProductDialog
                open={isAddProductOpen}
                onOpenChange={setIsAddProductOpen}
            />
        </>
    );
}

