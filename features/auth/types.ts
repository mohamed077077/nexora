import type { SuccessResponse, ErrorResponse } from "@/shared/types/Response";

// ── Login ────────────────────────────────────────────────────────────────────
export type LoginSuccessResponse = SuccessResponse<{
  message: string;
  accessToken: string;
}>;

// ── Logout ───────────────────────────────────────────────────────────────────
export type LogoutSuccessResponse = SuccessResponse<{
  message: string;
}>;

// ── Refresh ──────────────────────────────────────────────────────────────────
export type RefreshSuccessResponse = SuccessResponse<{
  accessToken: string;
}>;

// ── Shared error shape ───────────────────────────────────────────────────────
export type AuthErrorResponse = ErrorResponse;