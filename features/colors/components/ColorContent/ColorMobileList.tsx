import DashboardImage from "@/shared/components/dashboard/DashboardImage";
import type { Color } from "../../types";
import ColorActions from "../ColorDialog/ColorActions";

type ColorMobileListProps = { colors: Color[] };

export default function ColorMobileList({ colors }: ColorMobileListProps) {
  return (
    <div>
      {colors.map((color) => (
        <div
          key={color._id}
          className="flex items-center gap-4 border-b border-border px-4 py-4 last:border-b-0"
        >
          <DashboardImage src={color.iconUrl} alt={color.title} />
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[15px] font-medium leading-5 text-foreground">
              {color.title}
            </h3>
            <p className="mt-1 text-[13px] leading-5 text-muted-foreground">
              {color.variantCount} {color.variantCount === 1 ? "Variant" : "Variants"}
            </p>
          </div>
          <div className="shrink-0">
            <ColorActions color={color} size="default" />
          </div>
        </div>
      ))}
    </div>
  );
}
