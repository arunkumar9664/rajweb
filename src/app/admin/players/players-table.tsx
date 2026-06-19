"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import { apiFetch, handleApiFetch } from "@/lib/api-client";
import {
  CertificateDetailsModal,
  IssuePlayerCertificateModal,
  type EligiblePlayer,
  type PlayerCertificateInfo,
} from "@/shared/components/admin/issue-player-certificate-modal";

export type PlayerRow = EligiblePlayer & {
  status: string;
  certificate: PlayerCertificateInfo | null;
};

export function PlayersTable({ players }: { players: PlayerRow[] }) {
  const [viewPlayer, setViewPlayer] = useState<(EligiblePlayer & { certificate: PlayerCertificateInfo }) | null>(null);
  const [issuePlayer, setIssuePlayer] = useState<EligiblePlayer | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const eligibleForIssue = players
    .filter((p) => p.status === "APPROVED" && !p.certificate)
    .map(({ id, playerId, name, email, district }) => ({ id, playerId, name, email, district }));

  async function handleApproveReject(player: PlayerRow, action: "approve" | "reject") {
    setLoading(`${player.id}-${action}`);
    try {
      const res = await apiFetch(`/api/admin/players/${player.id}/${action}`, { method: "POST" });
      const { message } = await handleApiFetch(res);
      toast.success(message ?? "Action completed");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Action failed");
    } finally {
      setLoading(null);
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              <th className="pb-3 pr-4 font-semibold text-slate-600">Player ID</th>
              <th className="pb-3 pr-4 font-semibold text-slate-600">Name</th>
              <th className="pb-3 pr-4 font-semibold text-slate-600">District</th>
              <th className="pb-3 pr-4 font-semibold text-slate-600">Email</th>
              <th className="pb-3 pr-4 font-semibold text-slate-600">Status</th>
              <th className="pb-3 pr-4 font-semibold text-slate-600">Certificate</th>
              <th className="pb-3 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500">
                  No players registered yet
                </td>
              </tr>
            ) : (
              players.map((player) => (
                <tr key={player.id} className="border-b border-slate-100">
                  <td className="py-3 pr-4 font-mono text-xs">{player.playerId}</td>
                  <td className="py-3 pr-4 font-medium">{player.name}</td>
                  <td className="py-3 pr-4">{player.district}</td>
                  <td className="py-3 pr-4">{player.email}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        player.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : player.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {player.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    {player.certificate ? (
                      <button
                        type="button"
                        onClick={() => setViewPlayer({ ...player, certificate: player.certificate! })}
                        className="text-left text-xs font-mono text-accent hover:underline"
                      >
                        {player.certificate.certificateNumber}
                      </button>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-3">
                    <div className="flex flex-wrap gap-2">
                      {player.status === "PENDING" && (
                        <>
                          <Button size="sm" onClick={() => handleApproveReject(player, "approve")} disabled={!!loading}>
                            {loading === `${player.id}-approve` ? "..." : "Approve"}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleApproveReject(player, "reject")} disabled={!!loading}>
                            {loading === `${player.id}-reject` ? "..." : "Reject"}
                          </Button>
                        </>
                      )}
                      {player.status === "APPROVED" && !player.certificate && (
                        <Button size="sm" variant="accent" onClick={() => setIssuePlayer(player)}>
                          Issue Cert
                        </Button>
                      )}
                      {player.certificate && (
                        <Button size="sm" variant="outline" onClick={() => setViewPlayer({ ...player, certificate: player.certificate! })}>
                          View Cert
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {viewPlayer && <CertificateDetailsModal player={viewPlayer} onClose={() => setViewPlayer(null)} />}
      <IssuePlayerCertificateModal
        open={!!issuePlayer}
        onClose={() => setIssuePlayer(null)}
        players={eligibleForIssue}
        preselectedPlayerId={issuePlayer?.id}
      />
    </>
  );
}
