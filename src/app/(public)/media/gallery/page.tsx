import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader, PageContent } from "@/shared/components/layout";
import { siteImages } from "@/shared/config/site";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Photo gallery featuring racquetball tournaments, training camps, and events organized by the Rajasthan Racquetball Association.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Media"
        title="Photo Gallery"
        description="Capturing the spirit of racquetball across Rajasthan — tournaments, training, and community events."
      />
      <PageContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteImages.gallery.map((photo) => (
            <div key={photo.src} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-sm font-semibold text-white">{photo.title}</p>
              </div>
            </div>
          ))}
        </div>
      </PageContent>
    </>
  );
}
