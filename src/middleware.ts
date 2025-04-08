import {getToken} from "next-auth/jwt";
import {NextRequest, NextResponse} from "next/server";

export default async function middleware(req:NextRequest) {
  const path = req.nextUrl.pathname;

  const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

  if (
    !session &&
    (path === "/" || path === "/users" || path === "/profile" || path.startsWith("/categories") || path.startsWith('/products') || path.startsWith('/product') || path.startsWith('/reviews') || path === "/cart" || path.startsWith('/orders') || path === '/dashboard')
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (session && session?.user?.role === "user" && (path === "/users" || path.startsWith('/categories') || path.startsWith('/products') || path === "/reviews" || path.startsWith('/reviews/product') || path.startsWith('/reviews/user') || path === "/orders" || path.startsWith('/orders/user'))) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
