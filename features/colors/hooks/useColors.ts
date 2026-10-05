import { useQuery } from "@tanstack/react-query";
import { getColors } from "../http/GetColors";

export function useColors(isFilter = false) {
  return useQuery({
    queryKey: ["colors"],
    queryFn: getColors,

    select: (data) => {
      const colors = data.colors;

      if (isFilter) {
        return colors.filter(
          (color) => color.productCount > 0
        );
      }

      return colors;
    },
  });
}