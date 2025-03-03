import type { NextAuthOptions } from "next-auth"
import { FirebaseAdapter } from "@next-auth/firebase-adapter"
import { auth } from "@/lib/firebase"
import { db } from "@/lib/firebase-admin"

export const authOptions: NextAuthOptions = {
  providers: [],
  session: {
    strategy: "jwt",
  },
  adapter: FirebaseAdapter(
    auth,
    db.collection("accounts").doc,
    db.collection("sessions").doc,
    db.collection("users").doc,
    db.collection("verificationRequests").doc,
  ),
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth",
  },
}

