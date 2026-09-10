import { AppError } from "./AppError";
export function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new AppError(`${name} is not defined`);
  }

  return value;
}
