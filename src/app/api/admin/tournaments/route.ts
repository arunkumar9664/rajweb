import { z } from "zod";
import prisma from "@/infrastructure/database/prisma";
import { withApiHandler, jsonSuccess, AppError } from "@/core/api/with-api-handler";
import { requirePermission } from "@/security/auth/session";
import { PERMISSIONS } from "@/security/rbac/permissions";
import { assertDistrictAccess, isFederationWide } from "@/security/rbac/district-scope";
import { slugify } from "@/lib/utils";
import { sanitizeText } from "@/security/sanitize";
import { createAuditLog } from "@/services/audit/audit-service";

const createTournamentSchema = z.object({
  name: z.string().min(3).max(200),
  description: z.string().max(2000).optional(),
  category: z.enum(["JUNIOR", "SENIOR", "OPEN", "PROFESSIONAL"]),
  status: z.enum(["DRAFT", "REGISTRATION_OPEN", "REGISTRATION_CLOSED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(),
  districtId: z.string().optional(),
  venue: z.string().max(200).optional(),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  registrationDeadline: z.string().optional(),
  maxParticipants: z.coerce.number().int().positive().max(10000).optional(),
});

async function uniqueSlug(base: string): Promise<string> {
  let slug = slugify(base);
  if (!slug) slug = "tournament";
  let candidate = slug;
  let counter = 1;
  while (await prisma.tournament.findUnique({ where: { slug: candidate } })) {
    candidate = `${slug}-${counter++}`;
  }
  return candidate;
}

export const POST = withApiHandler(
  async (request, { requestId }) => {
    const user = await requirePermission(PERMISSIONS.TOURNAMENTS_MANAGE);
    const body = createTournamentSchema.parse(await request.json());

    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    if (endDate < startDate) {
      throw AppError.validation("End date must be on or after start date");
    }

    let districtId: string | undefined = body.districtId;

    if (!isFederationWide(user)) {
      if (!user.districtId) {
        throw AppError.forbidden("District assignment required");
      }
      districtId = user.districtId;
    } else if (districtId) {
      const district = await prisma.district.findUnique({ where: { id: districtId } });
      if (!district) throw AppError.validation("Invalid district selected");
    }

    if (districtId) {
      assertDistrictAccess(user, districtId);
    }

    const slug = await uniqueSlug(body.name);

    const tournament = await prisma.tournament.create({
      data: {
        name: sanitizeText(body.name),
        slug,
        description: body.description ? sanitizeText(body.description) : undefined,
        category: body.category,
        status: body.status ?? "REGISTRATION_OPEN",
        districtId: districtId ?? null,
        venue: body.venue ? sanitizeText(body.venue) : undefined,
        startDate,
        endDate,
        registrationDeadline: body.registrationDeadline ? new Date(body.registrationDeadline) : undefined,
        maxParticipants: body.maxParticipants,
      },
      include: { district: true },
    });

    await createAuditLog({
      userId: user.id,
      action: "CREATE",
      module: "tournaments",
      entityId: tournament.id,
      details: { name: tournament.name, slug: tournament.slug },
    });

    return jsonSuccess(
      {
        id: tournament.id,
        name: tournament.name,
        slug: tournament.slug,
        status: tournament.status,
      },
      requestId,
      `Tournament "${tournament.name}" created`
    );
  },
  { module: "admin-tournaments", requireCsrf: true }
);
