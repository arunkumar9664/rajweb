import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig, siteImages, navigation } from "@/shared/config/site";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src={siteImages.logo}
                alt={siteConfig.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-lg object-contain bg-white/10 p-1"
              />
              <div>
                <p className="text-lg font-bold">{siteConfig.shortName}</p>
                <p className="text-sm text-slate-300">{siteConfig.tagline}</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-4">
              {[
                { label: "Facebook", href: siteConfig.social.facebook, icon: siteImages.social.facebook },
                { label: "Instagram", href: siteConfig.social.instagram, icon: siteImages.social.instagram },
                { label: "YouTube", href: siteConfig.social.youtube, icon: siteImages.social.youtube },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/10 transition-colors hover:bg-secondary"
                  aria-label={label}
                  title={label}
                >
                  <Image src={icon} alt={label} width={24} height={24} className="h-6 w-6 object-contain" />
                </a>
              ))}
            </div>
          </div>

          {navigation.footer.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-accent">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-300 transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-3">
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <Mail className="h-5 w-5 shrink-0 text-accent" />
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
              {siteConfig.email}
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <Phone className="h-5 w-5 shrink-0 text-accent" />
            <a href={`tel:${siteConfig.phone}`} className="hover:text-white">
              {siteConfig.phone}
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <MapPin className="h-5 w-5 shrink-0 text-accent" />
            <span>{siteConfig.address}</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/governance/rti" className="hover:text-white">RTI</Link>
            <Link href="/governance/anti-doping" className="hover:text-white">Anti-Doping</Link>
            <Link href="/about/rules-policies" className="hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
