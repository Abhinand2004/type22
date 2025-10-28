import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {},
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        await connectToDatabase();
        const userDoc = await User.findOne({ email: credentials.email }).lean();
        if (!userDoc) return null;
        const user = userDoc as unknown as {
          _id: string | { toString(): string };
          name: string;
          email: string;
          passwordHash: string;
          role: "user" | "admin";
        };
        const ok = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!ok) return null;
        const authUser: { id: string; name: string; email: string; role: "user" | "admin" } = {
          id: String(user._id),
          name: user.name,
          email: user.email,
          role: user.role,
        };
        return authUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as { role?: "user" | "admin" };
        (token as import("next-auth/jwt").JWT & { role?: string }).role = u.role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        type SessionUser = typeof session.user & { role?: string; id?: string };
        (session.user as SessionUser).role = (token as { role?: string }).role;
        (session.user as SessionUser).id = token.sub as string | undefined;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


