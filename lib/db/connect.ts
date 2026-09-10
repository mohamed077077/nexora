import mongoose from "mongoose";
import {AppError} from "@/lib/AppError"

const MONGODB_URI = process.env.MONGODB_URI;

export default async function dbConnect() {
  if (!MONGODB_URI) {
    throw new AppError("Field to connect with database", 500);
  }
  try{
     await mongoose.connect(MONGODB_URI);
  return mongoose;
  }catch{
    throw new AppError("Field to connect with database", 500);
  }
}