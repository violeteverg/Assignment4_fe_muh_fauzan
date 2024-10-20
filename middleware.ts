import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./utils/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("Token")?.value;
  // console.log(req.cookies);
  // console.log("haii");
  // console.log(">>>>>", token);

  const protectedPaths = ["/cart", "/cart/payment", "/order"];

  //verified token must same at the backend
  const verifiedToken = token && (await verifyAuth(token));
  // console.log(verifiedToken, "verify");

  if (!verifiedToken) {
    if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/Register", req.url));
    }
  }
  if (verifiedToken) {
    if (
      req.nextUrl.pathname.startsWith("/Register") ||
      req.nextUrl.pathname.startsWith("/Login")
    ) {
      return NextResponse.redirect(new URL("/course", req.url));
    }
  }
}
export const config = {
  matcher: ["/Register", "/Login", "/cart", "/cart/(.*)", "/order"],
};
