import DashboardImage from "@/shared/components/dashboard/DashboardImage";

import type { Product } from "@/features/products/types";
import ProductActions from "../ProductDialog/ProductActions";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { useProductFilterStore } from "@/features/products/store/useProductFilterStore";
type ProductMobileListProps = {
  products: Product[];
};

export default function ProductMobileList({
  products,
}: ProductMobileListProps) {
  const { data: categoriesData } = useCategories(true);
  const categories = categoriesData ?? [];
  const color = useProductFilterStore((state) => state.color);

  return (
    <div>
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
          <div
            key={product._id}
            className="flex items-center gap-4 border-b border-border px-4 py-4 last:border-b-0"
          >
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
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[15px] font-medium leading-5 text-foreground">
                {product.title}
              </h3>

              <p className="text-[13px] leading-5">
                ${product.price.toFixed(2)}
              </p>

              <div className="mt-1 flex items-center gap-2 whitespace-nowrap text-xs leading-5 text-muted-foreground">
                <span>{category?.title}</span>
                <span>|</span>
                <span>
                  Stock:
                  <span className={`ml-1 ${getStockColor(totalStock)}`}>
                    {totalStock}
                  </span>
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <ProductActions product={product} size="default" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getStockColor(stock: number) {
  if (stock < 10) return "text-destructive";
  if (stock > 20) return "text-success";
  return "text-primary";
}
