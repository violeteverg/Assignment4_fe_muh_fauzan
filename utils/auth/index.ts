import { JWTPayload, jwtVerify, JWTVerifyResult } from "jose";
import { cookies } from "next/headers";
// import { JwtSchema } from "../schemas/LoginUser";

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY;
  console.log(secret, "secret");
  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set");
  }
  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    // console.log(verified, "verified");
    // console.log(token, "token");
    if (!verified) {
      return undefined;
    } else {
      return verified;
    }
  } catch {
    return undefined;
  }
};

export function getAccessToken(): string | undefined {
  const cookie = cookies();
  // console.log(">>>>><", cookie);
  const user = cookie.get("Token")?.value;
  // console.log(">>>>><>", user);
  return user;
}

export const checkUserLogin = async (): Promise<JWTPayload | null> => {
  const cookieStore = cookies();
  const token = cookieStore.get("Token")?.value;
  if (!token) return null;

  const { payload } = (await verifyAuth(token)) as JWTVerifyResult;

  console.log(payload, "user");

  return payload;
};

// console.log(checkUserLogin());

export function isAuthenticateds(): boolean {
  return !!getAccessToken();
}
