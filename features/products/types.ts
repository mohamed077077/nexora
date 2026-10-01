import type { ErrorResponse, SuccessResponse } from "@/shared/types/Response";

export type Variant = {
  colorId: string;
  size: string | number;
  image: string;
  stock: number;
};

export type Product = {
  _id: string;
  title: string;
  categoryId: string;
  price: number;
  variants: Variant[];
};

export type ProductSuccessResponse = SuccessResponse<{
  message: string;
  product: Product;
}>;

export type ProductsSuccessResponse = SuccessResponse<{
  message: string;
  products: Product[];
}>;

export type ProductErrorResponse = ErrorResponse;
