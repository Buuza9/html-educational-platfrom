import { clerkMiddleware } from "@clerk/nextjs/server";

// Course content stays public (browse without signing in). Auth is enabled so
// progress can be saved per user (Phase 3); protect specific routes here later
// via createRouteMatcher + auth.protect().
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
