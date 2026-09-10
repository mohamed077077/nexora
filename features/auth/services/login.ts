import bcrypt from "bcryptjs";

import connectDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import { AppError } from "@/lib/AppError";
import { createTokenPair } from "./jwt";

export async function loginUser(
  email: string,
  password: string
) {
  await connectDB();

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const { accessToken, refreshToken } = await createTokenPair(
    user._id.toString()
  );

  user.refreshToken = refreshToken;

  await user.save();

  return {
    accessToken,
    refreshToken,
  };
}