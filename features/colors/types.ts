import type { ErrorResponse, SuccessResponse } from "@/shared/types/Response";

export type Color = {
  _id: string;
  title: string;
  iconUrl: string;
  variantCount: number;
};

export type ColorSuccessResponse = SuccessResponse<{
  message: string;
  color: Color;
}>;

export type ColorsSuccessResponse = SuccessResponse<{
  message: string;
  colors: Color[];
}>;

export type ColorErrorResponse = ErrorResponse;
