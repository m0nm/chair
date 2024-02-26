import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.includes("/api/")) {
    throw Error("This demo is read only");
  }

  if (!pathname.includes("/en")) {
    if (!pathname.includes("/ar")) {
      const url = request.nextUrl.clone();
      url.pathname = "/en" + pathname;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!static|.*\\..*|_next).*)",
};
