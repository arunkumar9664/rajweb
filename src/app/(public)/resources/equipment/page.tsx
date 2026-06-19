import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader, PageContent } from "@/shared/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { siteImages } from "@/shared/config/site";

export const metadata: Metadata = {
  title: "Equipment Information",
  description:
    "Essential racquetball equipment guide — racquets, balls, eyewear, and gear recommendations for players at all levels.",
};

const equipment = [
  {
    title: "Racquetball Racquet",
    image: siteImages.equipment.racquet,
    description: "High-quality racquetball racquets suitable for training, tournaments, and competitive play.",
    details: [
      "Designed for excellent grip, balance, and control",
      "Suitable for beginners, intermediate, and advanced players",
      "Manufactured using durable materials for long-term performance",
      "Ideal for both practice sessions and official matches",
    ],
  },
  {
    title: "Protective Glasses",
    image: siteImages.equipment.eyewear,
    description: "Player safety is our priority. Protective racquetball eyewear that meets safety requirements.",
    details: [
      "Shatter-resistant lenses for maximum eye protection",
      "Comfortable fit for long matches and training sessions",
      "Clear visibility without distortion",
      "Mandatory for all sanctioned RRA and IRA competitions",
    ],
  },
  {
    title: "Racquetball Balls",
    image: siteImages.equipment.balls,
    description: "Standard racquetball balls designed for indoor courts and competitive play.",
    details: [
      "Consistent bounce and speed",
      "Suitable for training sessions and tournaments",
      "Durable and performance-tested for regular use",
      "Appropriate for different skill levels and match conditions",
    ],
  },
];

export default function EquipmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Equipment Information"
        description="Quality equipment for training and competition — following nationally and internationally accepted standards."
      />
      <PageContent>
        <div className="mb-12 overflow-hidden rounded-2xl">
          <Image
            src={siteImages.equipment.overview}
            alt="Racquetball equipment"
            width={1024}
            height={1024}
            className="mx-auto max-h-80 w-full object-contain"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {equipment.map(({ title, image, description, details }) => (
            <Card key={title} className="overflow-hidden">
              <div className="relative aspect-square bg-slate-50">
                <Image src={image} alt={title} fill className="object-contain p-4" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <p className="text-sm text-slate-600">{description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {details.map((detail) => (
                    <li key={detail} className="flex gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                      {detail}
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
