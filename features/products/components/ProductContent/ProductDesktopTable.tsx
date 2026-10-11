import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

import DashboardImage from "@/shared/components/dashboard/DashboardImage";

import ProductActions from "../ProductDialog/ProductActions";
import type { Product } from "@/features/products/types";
import { useCategories} from "@/features/categories/hooks/useCategories";
import { useProductFilterStore } from "@/features/products/store/useProductFilterStore";
type ProductDesktopTableProps = {
  products: Product[];
};

export default function ProductDesktopTable({
  products,
}: ProductDesktopTableProps) {
  const { data: categoriesData } = useCategories(true);
  const categories = categoriesData ?? [];
  const color = useProductFilterStore((state) => state.color);

  return (
    <Table>
      <TableHeader className="bg-card">
        <TableRow className="h-16 border-0 border-b border-border hover:bg-transparent">
          <TableHead className="table-head-cell">Image</TableHead>
          <TableHead className="table-head-cell">Product</TableHead>
          <TableHead className="table-head-cell">Category</TableHead>
          <TableHead className="table-head-cell">Price</TableHead>
          <TableHead className="table-head-cell">Stock</TableHead>
          <TableHead className="table-head-cell">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product) => {
          const category = categories.find(
            (c) => c._id === product.categoryId
          );

          const selectedVariant = color !== "all" && color ?
            product.variants.find(
                (v) => v.color?.toLowerCase() === color.toLowerCase()
              )
            : null;

          const shownImage =
            selectedVariant?.image?.trim() ||
            product.variants[0]?.image?.trim() ||
            null;

          const totalStock = product.variants.reduce(
            (sum, v) => sum + v.stock,
            0
          );

          return (
            <TableRow
              key={product._id}
              className="border-0 border-b border-border last:border-b-0 hover:bg-transparent"
            >
            <TableCell className="px-5 py-4">
              {shownImage?.trim() ? (
                <DashboardImage
                  src={shownImage}
                  alt={product.title}
                />
              ) : (
                <div className="flex size-12 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
                  No Image
                </div>
              )}
            </TableCell>

              <TableCell>
                <span className="table-text">{product.title}</span>
              </TableCell>

              <TableCell className="table-text">
                {category?.title}
              </TableCell>
              <TableCell className="table-text">
                ${product.price.toFixed(2)}
              </TableCell>

              <TableCell className={getStockClassName(totalStock)}>
                {totalStock}
              </TableCell>

              <TableCell>
                <ProductActions product={product} size="lg" />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function getStockClassName(stock: number) {
  const statusColor =
    stock < 10
      ? "text-destructive"
      : stock > 20
        ? "text-success"
        : "text-primary";
  return `text-base font-medium ${statusColor}`;
}
