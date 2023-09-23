import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { getToken } from "next-auth/jwt";

const getRedisCredentials = (): { redisUrl: string; redisToken: string } => {
  const redisUrl = process.env.REDIS_URL;
  const redisToken = process.env.REDIS_SECRET;

  if (!redisUrl || redisUrl.length === 0) {
    throw new Error("Missing REDIS_URL");
  }
  if (!redisToken || redisToken.length === 0) {
    throw new Error("Missing REDIS_SECRET");
  }

  return { redisToken, redisUrl };
};

const redis = new Redis({
  url: getRedisCredentials().redisUrl,
  token: getRedisCredentials().redisToken,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
});

const middleware = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  //* Manage rate limiting
  if (pathname.startsWith("/api")) {
    const ip = req.ip ?? "127.0.0.1";

    try {
      const { success } = await ratelimit.limit(ip);

      if (!success) return NextResponse.json({ error: "Too many requests." });
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json({ error: "Internal Server Error" });
    }
  }

  //* Manage route protection
  const token = await getToken({ req });
  const isAuth = !!token;

  const isAuthPage = pathname.startsWith("/login");

  const sensitiveRoutes = ["/dashboard"];

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return null;
  }

  if (!isAuth && sensitiveRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

const callbacks = {
  async authorized() {
    return true;
  },
};

export default withAuth(middleware, {
  callbacks,
});

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/api/:path*"],
};
