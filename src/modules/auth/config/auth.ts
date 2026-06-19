import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/infrastructure/database/prisma";
import { ROLE_PERMISSIONS, type RoleSlug } from "@/security/rbac/permissions";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          include: { role: true },
        });

        if (!user || !user.isActive || !user.passwordHash) return null;

        const isValid = await compare(credentials.password as string, user.passwordHash);
        if (!isValid) return null;

        const roleSlug = user.role.slug as RoleSlug;
        const permissions = ROLE_PERMISSIONS[roleSlug] ?? [];

        try {
          await prisma.auditLog.create({
            data: {
              userId: user.id,
              action: "LOGIN",
              module: "auth",
              details: { email: user.email },
            },
          });
        } catch {
          // DB may be unavailable during dev
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: roleSlug,
          permissions: permissions as string[],
          districtId: user.districtId,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role: RoleSlug }).role;
        token.permissions = (user as { permissions: string[] }).permissions;
        token.districtId = (user as { districtId?: string | null }).districtId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as RoleSlug;
        session.user.permissions = token.permissions as string[];
        session.user.districtId = token.districtId as string | null;
      }
      return session;
    },
  },
});
