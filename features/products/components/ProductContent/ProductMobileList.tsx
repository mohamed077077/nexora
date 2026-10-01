import DashboardImage from "@/shared/components/dashboard/DashboardImage";

import type { Product } from "../data";
import ProductActions from "../ProductDialog/ProductActions";

type ProductMobileListProps = {
  products: Product[];
};

export default function ProductMobileList({
  products,
}: ProductMobileListProps) {
  return (
    <div>
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center gap-4 border-b border-border px-4 py-4 last:border-b-0"
        >
          <DashboardImage src={product.image} alt={product.title} />

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[15px] font-medium leading-5 text-foreground">
              {product.title}
            </h3>

            <p className="text-[13px] leading-5">
              ${product.price.toFixed(2)}
            </p>

            <div className="mt-1 flex items-center gap-2 whitespace-nowrap text-xs leading-5 text-muted-foreground">
              <span>{product.category}</span>
              <span>|</span>
              <span>
                Stock:
                <span className={`ml-1 ${getStockColor(product.stock)}`}>
                  {product.stock}
                </span>
              </span>
              <span>|</span>
              <span>Orders: {product.orders}</span>
            </div>
          </div>

          <div className="shrink-0">
            <ProductActions title="product" size="default" />
          </div>
        </div>
      ))}
    </div>
  );
}

function getStockColor(stock: number) {
  if (stock < 10) return "text-destructive";
  if (stock > 20) return "text-success";
  return "text-primary";
}
