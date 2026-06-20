import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { HeroSlider } from "@/modules/home/components/hero-slider";
import { StatsBar } from "@/modules/home/components/stats-bar";
import { AboutSection } from "@/modules/home/components/about-section";
import { LatestNews } from "@/modules/home/components/home-sections";
import { NewsSkeleton } from "@/modules/home/components/news-skeleton";
import { siteConfig } from "@/shared/config/site";

const PresidentMessage = dynamic(
  () => import("@/modules/home/components/president-message").then((m) => m.PresidentMessage),
  { loading: () => null }
);
const TestimonialsSection = dynamic(
  () => import("@/modules/home/components/president-message").then((m) => m.TestimonialsSection),
  { loading: () => null }
);
const MembershipCTA = dynamic(
  () => import("@/modules/home/components/president-message").then((m) => m.MembershipCTA),
  { loading: () => null }
);
const FederationsSection = dynamic(
  () => import("@/modules/home/components/home-sections").then((m) => m.FederationsSection),
  { loading: () => null }
);
const PartnersSection = dynamic(
  () => import("@/modules/home/components/home-sections").then((m) => m.PartnersSection),
  { loading: () => null }
);
const ContactSection = dynamic(
  () => import("@/modules/home/components/home-sections").then((m) => m.ContactSection),
  { loading: () => null }
);

export const revalidate = 300;

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <StatsBar />
      <AboutSection />
      <Suspense fallback={<NewsSkeleton />}>
        <LatestNews />
      </Suspense>
      <PresidentMessage />
      <TestimonialsSection />
      <MembershipCTA />
      <FederationsSection />
      <PartnersSection />
      <ContactSection />
    </>
  );
}
