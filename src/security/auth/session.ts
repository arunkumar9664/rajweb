import { AppError } from "@/core/errors/app-error";
import { auth } from "@/modules/auth/config/auth";
import {
  hasPermission,
  hasAnyPermission,
  type PermissionSlug,
  type SessionUser,
} from "@/security/rbac/permissions";

export async function getSession() {
  return auth();
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await getSession();
  if (!session?.user) return null;
  return session.user as SessionUser;
}

export async function requireAuth(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) throw AppError.unauthorized();
  return user;
}

export async function requirePermission(permission: PermissionSlug) {
  const user = await requireAuth();
  if (!hasPermission(user, permission)) throw AppError.forbidden();
  return user;
}

export async function requireAnyPermission(permissions: PermissionSlug[]) {
  const user = await requireAuth();
  if (!hasAnyPermission(user, permissions)) throw AppError.forbidden();
  return user;
}
