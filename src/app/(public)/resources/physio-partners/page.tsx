import type { Metadata } from "next";
import { HeartPulse, MapPin, Phone } from "lucide-react";
import { PageHeader, PageContent } from "@/shared/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { MediaImage } from "@/shared/components/ui/media-image";
import { physioPartners } from "@/shared/config/site";

export const metadata: Metadata = {
  title: "Physio Partners",
  description:
    "RRA's official physiotherapy partner ABPT — sports injury prevention, treatment, and rehabilitation for racquetball athletes.",
};

export default function PhysioPartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Physio Partners"
        description="Official physiotherapy partners supporting RRA athletes with injury prevention, treatment, and recovery services."
      />
      <PageContent>
        <MediaImage
          src={physioPartners[0].banner}
          alt="ABPT — Official Physiotherapy Partner of Rajasthan Racquetball Association"
          aspect="wide"
          fit="contain"
          containerClassName="mb-10 bg-white ring-1 ring-slate-200"
          sizes="(max-width: 1200px) 100vw, 1024px"
        />

        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-slate-600">
          RRA collaborates with ABPT — High Performance Sports Science Centre as its official
          physiotherapy partner. Registered RRA members receive professional sports science and
          recovery support for training and tournaments.
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          {physioPartners.map((partner) => (
            <Card key={partner.name}>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <HeartPulse className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-lg">{partner.name}</CardTitle>
                <p className="text-sm font-semibold text-secondary">{partner.role}</p>
                <p className="text-sm text-slate-600">{partner.director}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4 text-accent" />
                  {partner.location}, Rajasthan
                </div>
                <a
                  href={`tel:${partner.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-secondary"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  {partner.phone}
                </a>
                <ul className="space-y-1 border-t border-slate-100 pt-4">
                  {partner.services.map((service) => (
                    <li key={service} className="text-sm text-slate-500">
                      • {service}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageContent>
    </>
  );
}
