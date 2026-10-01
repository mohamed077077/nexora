import type { SuccessResponse, ErrorResponse } from "@/shared/types/Response";

export type Category = {
  _id: string;
  title: string;
  iconUrl: string;
  productCount: number;
};

export type CategorySuccessResponse = SuccessResponse<{
  message: string;
  category: Category;
}>;

export type CategoryErrorResponse = ErrorResponse;

export type CategoriesSuccessResponse = SuccessResponse<{
  message: string;
  categories: Category[];
}>;
