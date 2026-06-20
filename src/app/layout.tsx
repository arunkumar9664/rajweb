import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SessionProvider } from "@/shared/components/providers/session-provider";
import { Toaster } from "sonner";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || "https://rajasthanracquetball.com"),
  title: {
    default: "Rajasthan Racquetball Association (RRA)",
    template: "%s | RRA",
  },
  description:
    "Official State Body for Racquetball in Rajasthan. RRA conducts structured tournaments, certification programs, and official training initiatives.",
  keywords: ["racquetball", "rajasthan", "RRA", "sports", "tournament", "membership"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Rajasthan Racquetball Association",
  },
  icons: {
    icon: "/images/cropped-rra-logo-32x32.webp",
    apple: "/images/cropped-rra-logo-180x180.webp",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col antialiased">
        <SessionProvider>
          {children}
          <Toaster position="top-right" richColors />
        </SessionProvider>
      </body>
    </html>
  );
}
