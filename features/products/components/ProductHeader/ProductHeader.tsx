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

export default function ProductHeader() {
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [search, setSearch] = useState("");

    return (
        <>
            <div className="grid w-full gap-3 lg:flex lg:items-center">
                <AppSearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Search products..."
                />

                <div className="grid min-w-0 grid-cols-3 gap-3 lg:flex">
                    {/* Select Category */}
                    <Select>
                        <SelectTrigger className="h-11 w-full lg:h-10 lg:w-[140px] lg:shrink-0">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="shoes">Shoes</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Select Color */}
                    <Select>
                        <SelectTrigger className="h-11 min-w-0 w-full lg:h-10 lg:w-[140px] lg:shrink-0">
                            <SelectValue placeholder="Color" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Colors</SelectItem>
                            <SelectItem value="black">Black</SelectItem>
                            <SelectItem value="white">White</SelectItem>
                            <SelectItem value="red">Red</SelectItem>
                            <SelectItem value="blue">Blue</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Select Price */}
                    <Select>
                        <SelectTrigger className="h-11 min-w-0 w-full lg:h-10 lg:w-[140px] lg:shrink-0">
                            <SelectValue placeholder="Price" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Prices</SelectItem>
                            <SelectItem value="0-50">$0 - $50</SelectItem>
                            <SelectItem value="50-100">$50 - $100</SelectItem>
                            <SelectItem value="100-plus">Over $100</SelectItem>
                        </SelectContent>
                    </Select>
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
