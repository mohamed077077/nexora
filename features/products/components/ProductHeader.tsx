import { Search, Plus } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select";
import { useState } from "react";
import ProductDialog from "@/features/products/components/ProductDialog";

export default function ProductHeader() {
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);

    return (
        <>
            <div className="grid w-full gap-3 lg:flex lg:items-center">
                {/* Search bar */}
                <div className="relative min-w-0 lg:flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        className="pl-9 h-10"
                    />
                </div>

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
                <Button
                    aria-label="Add product"
                    onClick={() => setIsAddProductOpen(true)}
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
                        Add Product
                    </span>
                </Button>



            </div>

            <ProductDialog
                open={isAddProductOpen}
                onOpenChange={setIsAddProductOpen}
            />
        </>
    );
}
