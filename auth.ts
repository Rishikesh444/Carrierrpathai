import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import { authConfig } from "./auth.config"

const hasValidMongo = process.env.MONGODB_URI && !process.env.MONGODB_URI.includes("YOUR_USER")

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  ...(hasValidMongo ? { adapter: MongoDBAdapter(clientPromise) } : {}),
})
