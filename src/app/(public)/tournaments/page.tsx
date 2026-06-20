import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, PageContent } from "@/shared/components/layout";
import { Button } from "@/shared/components/ui/button";
import { tournamentEvents } from "@/shared/config/site";
import { TournamentEventCard } from "./tournament-event-card";

export const metadata: Metadata = {
  title: "Tournaments",
  description:
    "Racquetball Training Camp & State Championship — Rajasthan Racquetball Association, Jaipur, 30 June 2026.",
};

export default function TournamentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Tournaments"
        description="State-level racquetball tournaments and training camps organized by RRA across Rajasthan."
      />
      <PageContent>
        <div className="mb-10 flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/register/player">Register as Player</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Host a Tournament</Link>
          </Button>
        </div>

        <section>
          <h2 className="mb-6 text-xl font-bold text-primary">Upcoming Events</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            {tournamentEvents.map((tournament) => (
              <TournamentEventCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        </section>
      </PageContent>
    </>
  );
}
