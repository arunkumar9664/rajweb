import { AppError } from "@/core/errors/app-error";
import { ROLES, type SessionUser } from "@/security/rbac/permissions";

export function isFederationWide(user: SessionUser): boolean {
  return user.role === ROLES.SUPER_ADMIN || user.role === ROLES.FEDERATION_ADMIN;
}

export function getDistrictWhereClause(user: SessionUser): { districtId?: string } {
  if (user.role === ROLES.DISTRICT_ADMIN && user.districtId) {
    return { districtId: user.districtId };
  }
  return {};
}

export function assertDistrictAccess(user: SessionUser, entityDistrictId: string): void {
  if (isFederationWide(user)) return;

  if (user.role === ROLES.DISTRICT_ADMIN) {
    if (!user.districtId) {
      throw AppError.forbidden("District assignment required");
    }
    if (user.districtId !== entityDistrictId) {
      throw AppError.forbidden("Access denied for this district");
    }
    return;
  }
}

export function playerCertDistrictWhere(districtId?: string) {
  return districtId ? { player: { districtId } } : {};
}

export function coachCertDistrictWhere(districtId?: string) {
  return districtId ? { coach: { districtId } } : {};
}
