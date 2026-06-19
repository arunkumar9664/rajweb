import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { formatDate } from "@/lib/utils";
import { siteImages } from "@/shared/config/site";

const fallbackTournaments = [
  {
    id: "1",
    name: "Rajasthan State Championship 2025",
    category: "OPEN",
    startDate: new Date("2025-08-15"),
    endDate: new Date("2025-08-18"),
    venue: "Jaipur Sports Complex",
    district: { name: "Jaipur" },
  },
  {
    id: "2",
    name: "Jaipur District Open 2025",
    category: "OPEN",
    startDate: new Date("2025-06-20"),
    endDate: new Date("2025-06-22"),
    venue: "Jaipur Racquetball Club",
    district: { name: "Jaipur" },
  },
];

const fallbackNews = [
  {
    id: "1",
    title: "RRA Formed and Affiliated with IRA",
    slug: "rra-formed-affiliated-ira",
    excerpt: "Rajasthan Racquetball Association receives official affiliation from Indian Racquetball Association.",
    category: "Announcement",
    publishedAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    title: "State Championship 2025 Announced",
    slug: "state-championship-2025",
    excerpt: "RRA announces the inaugural Rajasthan State Racquetball Championship.",
    category: "Tournament",
    publishedAt: new Date("2025-02-01"),
  },
  {
    id: "3",
    title: "Player Registration Portal Now Open",
    slug: "player-registration-open",
    excerpt: "Register as an official RRA player through our online portal.",
    category: "Registration",
    publishedAt: new Date("2025-02-15"),
  },
];

async function getTournaments() {
  if (!process.env.DATABASE_URL) return fallbackTournaments;
  try {
    const { default: prisma } = await import("@/infrastructure/database/prisma");
    const results = await prisma.tournament.findMany({
      where: { status: { in: ["REGISTRATION_OPEN", "IN_PROGRESS"] } },
      include: { district: true },
      orderBy: { startDate: "asc" },
      take: 3,
    });
    return results.length > 0 ? results : fallbackTournaments;
  } catch {
    return fallbackTournaments;
  }
}

export async function UpcomingTournaments() {
  const tournaments = await getTournaments();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-secondary">Events</span>
            <h2 className="mt-2 text-3xl font-extrabold text-primary md:text-4xl">Upcoming Tournaments</h2>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href="/tournaments">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tournaments.map((t) => (
            <div key={t.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">{t.category}</span>
              <h3 className="mt-3 text-lg font-bold text-primary">{t.name}</h3>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-secondary" />{formatDate(t.startDate)} - {formatDate(t.endDate)}</div>
                {t.venue && <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-secondary" />{t.venue}</div>}
              </div>
              <Link href="/tournaments" className="mt-4 inline-flex text-sm font-semibold text-secondary hover:underline">
                Register Now →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

async function getNews() {
  if (!process.env.DATABASE_URL) return fallbackNews;
  try {
    const { default: prisma } = await import("@/infrastructure/database/prisma");
    const results = await prisma.news.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });
    return results.length > 0 ? results : fallbackNews;
  } catch {
    return fallbackNews;
  }
}

export async function LatestNews() {
  const news = await getNews();

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-secondary">News</span>
            <h2 className="mt-2 text-3xl font-extrabold text-primary md:text-4xl">Latest News</h2>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href="/media/news">All News <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {news.map((item) => (
            <Link key={item.id} href={`/media/news`} className="group rounded-xl border border-slate-200 bg-background p-6 transition-shadow hover:shadow-md">
              <span className="text-xs font-semibold uppercase text-secondary">{item.category}</span>
              <h3 className="mt-2 text-lg font-bold text-primary group-hover:text-secondary">{item.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">{item.excerpt}</p>
              <p className="mt-4 text-xs text-slate-400">{item.publishedAt ? formatDate(item.publishedAt) : ""}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnersSection() {
  return (
    <section className="border-t border-slate-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-bold uppercase tracking-wider text-slate-500">
          Let&apos;s Win Together — Proudly Sponsored By
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {siteImages.sponsors.map((p) => (
            <div key={p.name} className="flex h-20 w-40 items-center justify-center">
              <Image src={p.logo} alt={p.name} width={160} height={80} className="max-h-20 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FederationsSection() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-primary md:text-3xl">Globally Recognised Governing Bodies</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Racquetball was a charter member of the World Games first held in 1981. It has been included in five IOC-Recognized Continental Games since 1995.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {siteImages.federations.map((org) => (
            <div key={org.name} className="flex h-16 w-28 items-center justify-center" title={org.name}>
              <Image src={org.logo} alt={org.name} width={112} height={64} className="max-h-16 w-auto object-contain" />
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Image
            src={siteImages.banner}
            alt="Road to Chengdu"
            width={1024}
            height={59}
            className="max-w-3xl rounded-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-primary">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 md:p-12">
              <span className="text-sm font-bold uppercase tracking-wider text-accent">Contact</span>
              <h2 className="mt-2 text-3xl font-extrabold text-white">Get in Touch</h2>
              <p className="mt-4 text-slate-300">Have questions about membership, tournaments, or player registration? We&apos;re here to help.</p>
              <div className="mt-8 space-y-4 text-slate-300">
                <p><strong className="text-white">Email:</strong> rajasthanracquetball@gmail.com</p>
                <p><strong className="text-white">Phone:</strong> +91 99289 62982</p>
                <p><strong className="text-white">Address:</strong> Rajasthan, India</p>
              </div>
            </div>
            <div className="flex items-center justify-center bg-secondary/20 p-8 md:p-12">
              <Button variant="accent" size="lg" asChild>
                <Link href="/contact">Contact Us <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
