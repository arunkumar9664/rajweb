import type { Metadata } from "next";
import { HeartPulse, MapPin, Phone } from "lucide-react";
import { PageHeader, PageContent } from "@/shared/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

export const metadata: Metadata = {
  title: "Physio Partners",
  description:
    "RRA's network of physiotherapy partners providing sports injury prevention, treatment, and rehabilitation for racquetball athletes.",
};

const partners = [
  {
    name: "Rajasthan Sports Physio Centre",
    location: "Jaipur",
    phone: "+91 98200 12345",
    services: ["Sports injury assessment", "Rehabilitation programs", "Pre-competition screening"],
  },
  {
    name: "Elite Recovery Clinic",
    location: "Jodhpur",
    phone: "+91 98200 23456",
    services: ["Manual therapy", "Dry needling", "Return-to-play protocols"],
  },
  {
    name: "Active Life Physiotherapy",
    location: "Udaipur",
    phone: "+91 98200 34567",
    services: ["Injury prevention workshops", "Taping and strapping", "Fitness assessments"],
  },
  {
    name: "ProSport Rehab Hub",
    location: "Kota",
    phone: "+91 98200 45678",
    services: ["ACL rehabilitation", "Shoulder injury care", "Performance enhancement"],
  },
  {
    name: "FitMotion Physio Care",
    location: "Ajmer",
    phone: "+91 98200 56789",
    services: ["On-court injury support", "Sports massage", "Flexibility training"],
  },
  {
    name: "Peak Performance Clinic",
    location: "Bikaner",
    phone: "+91 98200 67890",
    services: ["Biomechanical analysis", "Strength conditioning", "Recovery planning"],
  },
];

export default function PhysioPartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Physio Partners"
        description="Trusted physiotherapy partners supporting RRA athletes with injury prevention, treatment, and recovery services."
      />
      <PageContent>
        <p className="mb-10 max-w-3xl text-lg leading-relaxed text-slate-600">
          RRA collaborates with certified sports physiotherapists across Rajasthan to ensure
          players receive professional care. Registered RRA members may access discounted
          consultation rates at partner clinics.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <Card key={partner.name}>
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <HeartPulse className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-lg">{partner.name}</CardTitle>
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
                    <li key={service} className="text-sm text-slate-500">• {service}</li>
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
