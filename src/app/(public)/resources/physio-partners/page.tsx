import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { PageHeader, PageContent } from "@/shared/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { MediaImage } from "@/shared/components/ui/media-image";
import { physioPartners, siteImages } from "@/shared/config/site";

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
          src={siteImages.rra.leadershipCardsBanner}
          alt="RRA leadership — President Aamir Khan, General Secretary Aashish Poonia, and Head Physio Ankit Bhardwaj"
          aspect="wide"
          fit="contain"
          containerClassName="mb-10 bg-white ring-1 ring-slate-200"
          sizes="(max-width: 1200px) 100vw, 1024px"
        />

        <p className="mb-12 max-w-3xl text-lg leading-relaxed text-slate-600">
          RRA collaborates with ABPT — High Performance Sports Science Centre as its official
          physiotherapy partner. Registered RRA members receive professional sports science and
          recovery support for training and tournaments.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {physioPartners.map((partner) => (
            <Card key={partner.name} className="overflow-hidden">
              <MediaImage
                src={partner.photo}
                alt={partner.name}
                aspect="portrait"
                fit="cover"
                rounded={false}
                className="object-top"
              />
              <CardHeader>
                <CardTitle className="text-lg">{partner.name}</CardTitle>
                <p className="text-sm font-semibold text-secondary">{partner.role}</p>
                <p className="text-xs text-slate-500">{partner.organization}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4 shrink-0 text-accent" />
                  {partner.location}, Rajasthan
                </div>
                <a
                  href={`tel:${partner.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-slate-600 hover:text-secondary"
                >
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
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
