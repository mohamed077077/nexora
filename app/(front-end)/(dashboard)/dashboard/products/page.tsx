"use client"
import ProductTable from "@/features/products/components/ProductTable";
import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useState } from "react";
import AddProductDialog from "@/features/products/components/ProductDialog";


export default function ProductsPage() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center  gap-6">
      <div className="flex w-full items-start justify-between">
  <div className="flex flex-col gap-1">
    <h1 className="text-3xl font-semibold text-foreground">
      Products
    </h1>

    <p className="text-sm text-muted-foreground">
      Manage your store products and inventory
    </p>
  </div>

  <Button className="h-11  rounded-md text-sm font-medium cursor-pointer" onClick={() => setIsAddProductOpen(true)}>
    <Plus className="size-4" />
    Add Product
  </Button>
</div>
      <ProductTable />
      <AddProductDialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen} />
    </div>
  );
}