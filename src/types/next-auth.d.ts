import "next-auth";
import type { RoleSlug } from "@/security/rbac/permissions";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: RoleSlug;
      permissions: string[];
      districtId?: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: RoleSlug;
    permissions: string[];
    districtId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: RoleSlug;
    permissions: string[];
    districtId?: string | null;
  }
}

export {};
