"use server";

import dbConnect from "../db/connect";
import User from "../db/models/User";

export async function createUser(prev:FormData,formData: FormData) {
  try {
    // 1. Connect to MongoDB Atlas
    await dbConnect();

    // 2. Get data from the form
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // 3. Basic validation
    if (!email || !password) {
      return {
        success: false,
        message: "Email and password are required",
      };
    }

    // 4. Create user
    const user = await User.create({
      email,
      password,
    });

    console.log("✅ User created:", user._id);

    return {
      success: true,
      message: `User created successfully: ${user.email}`,
    };
  } catch (error) {
    console.error("❌ Create user error:", error);

    return {
      success: false,
      message: "Failed to create user",
    };
  }
}