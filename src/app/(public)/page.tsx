import type { Metadata } from "next";
import { HeroSlider } from "@/modules/home/components/hero-slider";
import { StatsBar } from "@/modules/home/components/stats-bar";
import { AboutSection } from "@/modules/home/components/about-section";
import {
  PresidentMessage,
  TestimonialsSection,
  MembershipCTA,
} from "@/modules/home/components/president-message";
import {
  UpcomingTournaments,
  LatestNews,
  PartnersSection,
  FederationsSection,
  ContactSection,
} from "@/modules/home/components/home-sections";
import { siteConfig } from "@/shared/config/site";

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
      <UpcomingTournaments />
      <LatestNews />
      <PresidentMessage />
      <TestimonialsSection />
      <MembershipCTA />
      <FederationsSection />
      <PartnersSection />
      <ContactSection />
    </>
  );
}
