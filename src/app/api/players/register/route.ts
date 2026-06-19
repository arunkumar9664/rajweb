import { z } from "zod";
import { withApiHandler, jsonSuccess } from "@/core/api/with-api-handler";
import { registerPlayer } from "@/modules/players/player.service";

const playerSchema = z.object({
  name: z.string().min(2).max(100),
  dateOfBirth: z.string(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  email: z.string().email().max(254),
  mobile: z.string().min(10).max(20),
  district: z.string().min(1).max(100),
});

export const POST = withApiHandler(
  async (request, { requestId }) => {
    const body = await request.json();
    const data = playerSchema.parse(body);
    const player = await registerPlayer(data);
    return jsonSuccess(
      { playerId: player.playerId, status: player.status },
      requestId,
      "Player registration submitted for approval"
    );
  },
  { module: "players", rateLimit: { limit: 20, windowMs: 60000 }, requireCsrf: true }
);
