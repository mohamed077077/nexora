import { useQuery } from "@tanstack/react-query";
import { getColors } from "../http/GetColors";
import { getColorsWithProducts } from "../http/getColorsWithProducts";

export function useColors() {
  return useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });
}


export function useColorsWithProducts() {
  return useQuery({
    queryKey: ["colors-with-products"],
    queryFn: getColorsWithProducts,
  });
}
