import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../http/GetProducts";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
