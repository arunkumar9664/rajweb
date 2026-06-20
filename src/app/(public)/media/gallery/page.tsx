import type { Metadata } from "next";
import { PageHeader, PageContent } from "@/shared/components/layout";
import { MediaImage } from "@/shared/components/ui/media-image";
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteImages.gallery.map((photo) => (
            <figure
              key={photo.src}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <MediaImage
                src={photo.src}
                alt={photo.title}
                aspect="gallery"
                fit="cover"
                rounded={false}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <figcaption className="border-t border-slate-100 px-4 py-3">
                {"category" in photo && photo.category && (
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                    {photo.category}
                  </p>
                )}
                <p className="text-sm font-semibold text-primary">{photo.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </PageContent>
    </>
  );
}
