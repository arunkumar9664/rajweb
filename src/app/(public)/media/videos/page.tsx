import type { Metadata } from "next";
import { Play } from "lucide-react";
import { PageHeader, PageContent } from "@/shared/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Watch racquetball training videos, tournament highlights, and educational content from the Rajasthan Racquetball Association.",
};

const videos = [
  {
    title: "Introduction to Racquetball",
    duration: "8:42",
    description: "Learn the basics of racquetball — rules, court layout, and fundamental strokes.",
    category: "Tutorial",
  },
  {
    title: "Rajasthan State Championship 2024 Highlights",
    duration: "12:15",
    description: "Best moments from the inaugural Rajasthan State Racquetball Championship.",
    category: "Highlights",
  },
  {
    title: "Forehand & Backhand Technique",
    duration: "15:30",
    description: "Master the essential forehand and backhand strokes with step-by-step coaching.",
    category: "Training",
  },
  {
    title: "Serve Strategies for Competitive Play",
    duration: "10:20",
    description: "Advanced serving techniques including drive serves, lob serves, and jam serves.",
    category: "Training",
  },
  {
    title: "RRA Youth Development Camp — Jodhpur",
    duration: "6:55",
    description: "Coverage of the youth development camp featuring training sessions and mini-tournaments.",
    category: "Event",
  },
  {
    title: "Court Safety & Equipment Guide",
    duration: "7:10",
    description: "Essential safety tips, eyewear requirements, and equipment recommendations for players.",
    category: "Tutorial",
  },
];

export default function VideosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Media"
        title="Videos"
        description="Training tutorials, tournament highlights, and educational content for racquetball enthusiasts."
      />
      <PageContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <Card key={video.title} className="group overflow-hidden">
              <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-primary to-primary/80">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform group-hover:scale-110">
                  <Play className="h-8 w-8 text-white" fill="white" />
                </div>
                <span className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white">
                  {video.duration}
                </span>
              </div>
              <CardHeader>
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                  {video.category}
                </span>
                <CardTitle className="text-base">{video.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">{video.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageContent>
    </>
  );
}
