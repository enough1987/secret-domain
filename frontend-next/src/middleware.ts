import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { appConfig } from '@/configs/appConfig';

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