import withAuth from "next-auth/middleware"

export const config = { matcher: ["/dashboard"]}

withAuth({
    pages: {
      signIn: '/login',
      error: '/error',
      newUser: '/'
}})


export default withAuth

