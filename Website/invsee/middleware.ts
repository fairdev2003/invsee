import { withAuth } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard", "/admin/workspace"],
};

export default withAuth({
  pages: {
    signIn: "/login",
    error: "/error",
    newUser: "/",
  },
});
