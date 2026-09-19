import ProductTable from "@/features/products/components/ProductTable";
import { Plus } from "lucide-react";
import { Button } from "@/shared/ui/button";

export default function ProductsPage() {
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

  <Button className="h-11  rounded-md text-sm font-medium cursor-pointer">
    <Plus className="size-4" />
    Add Product
  </Button>
</div>
      <ProductTable />
    </div>
  );
}