import connectDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";

export async function logoutUser(refreshToken: string) {
  if (!refreshToken) return;
  
  await connectDB();

  await User.updateOne(
    { refreshToken },
    {
      $unset: {
        refreshToken: 1,
      },
    }
  );
}