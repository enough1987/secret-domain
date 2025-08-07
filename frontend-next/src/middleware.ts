import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/auth/signin", // Redirect unauthenticated users here
  },
})

export const config = {
  matcher: ["/:path*", "/:path*"], // Only these routes require auth
}