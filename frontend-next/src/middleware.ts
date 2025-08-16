import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { config as appConfig } from '@/configs/configs';

const middleware = appConfig.disableAuth
  ? (_req: NextRequest) => NextResponse.next()
  : withAuth({
      pages: {
        signIn: "/auth/signin",
      },
    });

export default middleware;

export const config = {
  matcher: ["/:path*"],
};