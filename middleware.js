export { auth as middleware } from "@/auth"

export const config = {
  // Protect all routes except login, api/auth, and public assets
  matcher: ["/((?!api/auth|login|_next/static|_next/image|favicon.ico|login-bg|y-space-logo|.*\\.png|.*\\.svg).*)"],
};
