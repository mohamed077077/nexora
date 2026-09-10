import { AppError } from "@/lib/AppError";
import connectDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import {
  verifyRefreshToken,
  createAccessToken,
  createRefreshToken,
} from "./jwt";

export async function refreshAccessToken(refreshToken: string) {
  if (!refreshToken) {
    throw new AppError("Invalid refresh token", 401);
  }

  const payload = await verifyRefreshToken(refreshToken);

  if (!payload.sub) {
    throw new AppError("Invalid refresh token", 401);
  }

  await connectDB();

  const user = await User.findById(payload.sub);

  if (!user || user.refreshToken !== refreshToken) {
    throw new AppError("Invalid refresh token", 401);
  }

  const accessToken = await createAccessToken(user._id.toString());

  // Rotate refresh token
  const newRefreshToken = await createRefreshToken(
    user._id.toString()
  );

  user.refreshToken = newRefreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
}