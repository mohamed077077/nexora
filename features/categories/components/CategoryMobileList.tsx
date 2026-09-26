import DashboardActions from "@/shared/components/dashboard/DashboardActions";
import DashboardImage from "@/shared/components/dashboard/DashboardImage";
import { Category } from "../types";

type CategoryMobileListProps = {
  categories: Category[];
}

export default function CategoryMobileList({ categories }: CategoryMobileListProps) {
  return (
    <div>
      {categories.map((category) => (
        <div
          key={category._id}
          className="flex items-center gap-4 border-b border-border px-4 py-4 last:border-b-0"
        >
          <DashboardImage src={category.iconUrl} alt={category.title} />

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[15px] font-medium leading-5 text-foreground">
              {category.title}
            </h3>
            <p className="mt-1 text-[13px] leading-5 text-muted-foreground">
              {0} Products
            </p>
          </div>

          <div className="shrink-0">
            <DashboardActions title="category" size="default" />
          </div>
        </div>
      ))}
    </div>
  );
}
