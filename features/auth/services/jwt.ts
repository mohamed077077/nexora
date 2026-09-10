import { importPKCS8, importSPKI, SignJWT, jwtVerify, type CryptoKey } from "jose";
import {getEnv} from '@/lib/getEnv'
import { randomUUID } from "node:crypto";
import {AppError} from '@/lib/AppError'

const privateKeyPem = getEnv("JWT_PRIVATE_KEY").replace(/\\n/g, "\n");
const publicKeyPem = getEnv("JWT_PUBLIC_KEY").replace(/\\n/g, "\n");

export const getPrivateKey = async (): Promise<CryptoKey> => {
  return importPKCS8(privateKeyPem, "RS256");
};

export const getPublicKey = async (): Promise<CryptoKey> => {
  return importSPKI(publicKeyPem, "RS256");
};

export async function createAccessToken(userId: string) {
  const privateKey = await getPrivateKey();

  return new SignJWT({
    type: "access",
  })
    .setProtectedHeader({
      alg: "RS256",
      typ: "JWT",
    })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(privateKey);
}

export async function createRefreshToken(userId: string) {
  const privateKey = await getPrivateKey();

  return new SignJWT({
    type: "refresh",
  })
    .setProtectedHeader({
      alg: "RS256",
      typ: "JWT",
    })
    .setSubject(userId)
    .setJti(randomUUID())
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(privateKey);
}


export async function createTokenPair(userId: string) {
  const [accessToken, refreshToken] = await Promise.all([
    createAccessToken(userId),
    createRefreshToken(userId),
  ]);

  return {
    accessToken,
    refreshToken,
  };
}

export async function verifyAccessToken(token: string) {
  try {
    const publicKey = await getPublicKey();

    const { payload } = await jwtVerify(token, publicKey, {
      algorithms: ["RS256"],
    });

    if (payload.type !== "access") {
      throw new AppError("Invalid access token", 401);
    }

    return payload;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Invalid access token", 401);
  }
}

export async function verifyRefreshToken(token: string) {
  try {
    const publicKey = await getPublicKey();

    const { payload } = await jwtVerify(token, publicKey, {
      algorithms: ["RS256"],
    });

    if (payload.type !== "refresh") {
      throw new AppError("Invalid refresh token", 401);
    }

    if (!payload.jti) {
      throw new AppError("Invalid refresh token", 401);
    }

    return payload;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Invalid refresh token", 401);
  }
}