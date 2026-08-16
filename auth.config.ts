import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

export const authConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "4c9a6e78f110c2e9b87a4891e4f4d2a1b9e83719c2a3847e912401fba45c6123",
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isLoginPage = nextUrl.pathname.startsWith("/login")

      if (!isLoggedIn && !isLoginPage) {
        return false // Redirects to login page
      }
      if (isLoggedIn && isLoginPage) {
        return Response.redirect(new URL("/", nextUrl))
      }
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = (token.id as string) || (token.sub as string)
      }
      return session
    },
  },
  session: { strategy: "jwt" },
} satisfies NextAuthConfig
