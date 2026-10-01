import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../http/GetCategories";
import { getCategoriesWithProducts } from "../http/getCategoriesWithProducts";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}


export function useCategoriesWithProducts() {
  return useQuery({
    queryKey: ["categories-with-products"],
    queryFn: getCategoriesWithProducts,
  });
}
