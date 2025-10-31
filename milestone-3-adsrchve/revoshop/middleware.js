import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware (req) {
    const token = await getToken({ req, secret:process.env.NEXTAUTH_SECRET });

    const protectedPaths = ["/checkout", "/admin"];

    if (protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
        if(!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/checkout/:path*", "/admin/:path*"],
};
