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
import { useCategoriesWithProducts } from "@/features/categories/hooks/useCategories";

type ProductDesktopTableProps = {
  products: Product[];
};

export default function ProductDesktopTable({
  products,
}: ProductDesktopTableProps) {
  const { data: categoriesData } = useCategoriesWithProducts();
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
          const category = categoriesData?.categories.find(
            (c) => c._id === product.categoryId
          );
          const firstVariant = product.variants[0];
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
                <DashboardImage
                  src={firstVariant.image}
                  alt={product.title}
                />
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
                <ProductActions title="product" size="lg" />
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
