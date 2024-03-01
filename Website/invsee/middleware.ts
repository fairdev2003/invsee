import withAuth from "next-auth/middleware"

export const config = { matcher: ["/dashboard", "/"]}

withAuth({
    pages: {
      signIn: '/login',
      error: '/error',
}})

export default withAuth

