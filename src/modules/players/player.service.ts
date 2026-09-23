import prisma from "@/infrastructure/database/prisma";
import { AppError } from "@/core/errors/app-error";
import { generateId } from "@/lib/utils";
import { sanitizeEmail, sanitizePhone, sanitizeText } from "@/security/sanitize";
import { createModuleLogger } from "@/core/logger";
import type { Gender } from "@prisma/client";

const log = createModuleLogger("players");

export interface RegisterPlayerInput {
  name: string;
  dateOfBirth: string;
  gender: Gender;
  email: string;
  mobile: string;
  district: string;
  /** Set only when the submitter is a logged-in user — links the record to their account. */
  userId?: string;
}

async function resolveDistrictId(districtName: string) {
  const district = await prisma.district.findFirst({
    where: { name: { equals: districtName, mode: "insensitive" } },
  });

  if (!district) {
    throw AppError.validation("Invalid district selected");
  }

  return district.id;
}

export async function registerPlayer(input: RegisterPlayerInput) {
  if (input.userId) {
    const existing = await prisma.player.findUnique({ where: { userId: input.userId } });
    if (existing) {
      throw AppError.conflict("You already have a player registration.");
    }
  }

  const districtId = await resolveDistrictId(input.district);

  const player = await prisma.player.create({
    data: {
      playerId: generateId("PLR"),
      name: sanitizeText(input.name),
      dateOfBirth: new Date(input.dateOfBirth),
      gender: input.gender,
      email: sanitizeEmail(input.email),
      mobile: sanitizePhone(input.mobile),
      districtId,
      userId: input.userId,
      status: "PENDING",
    },
  });

  log.info({ playerId: player.playerId, districtId, userId: input.userId }, "Player registration submitted");
  return player;
}

export async function approvePlayer(playerId: string, approvedBy: string) {
  const player = await prisma.player.update({
    where: { id: playerId },
    data: { status: "APPROVED", approvedAt: new Date(), approvedBy },
  });
  log.info({ playerId, approvedBy }, "Player approved");
  return player;
}

export async function rejectPlayer(playerId: string) {
  const player = await prisma.player.update({
    where: { id: playerId },
    data: { status: "REJECTED" },
  });
  log.info({ playerId }, "Player rejected");
  return player;
}
