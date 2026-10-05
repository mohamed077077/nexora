import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../http/GetCategories";

export function useCategories(isFilter = false) {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,

    select: (data) => {
      const categories = data.categories;

      if (isFilter) {
        return categories.filter(
          (category) => category.productCount > 0
        );
      }

      return categories;
    },
  });
}