import { authMiddleware } from "@clerk/nextjs";
 
// Configure authMiddleware to allow public access to specific routes
export default authMiddleware({
  // Add "/api/uploadthing" to publicRoutes to allow access without authentication
  publicRoutes: ["/api/uploadthing", "/api/webhook"]
});
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
