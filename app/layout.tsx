import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.88keys.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "88 Keys Music Studio | Premium Music & Dance Academy",
    template: "%s | 88 Keys Music Studio",
  },
  description:
    "Master Piano, Guitar, Bass, Drums, Keyboard, Vocals, and Dance with world-class certified instructors at 88 Keys Music Studio in Dehradun. Book a consultation or enquire today!",
  keywords: [
    "Music Studio",
    "Piano Lessons",
    "Guitar Academy",
    "Drum School",
    "Vocal Coaching",
    "Dance Classes",
    "88 Keys",
    "Music Studio Dehradun",
    "Music Classes Purkul Road",
    "Dance Academy Dehradun",
  ],
  authors: [{ name: "88 Keys Music Studio", url: siteUrl }],
  creator: "88 Keys Music Studio",
  publisher: "88 Keys Music Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "88 Keys Music Studio",
    title: "88 Keys Music Studio | Premium Music & Dance Academy",
    description:
      "Master Piano, Guitar, Bass, Drums, Keyboard, Vocals, and Dance with world-class certified instructors at 88 Keys Music Studio in Dehradun.",
  },
  twitter: {
    card: "summary_large_image",
    title: "88 Keys Music Studio | Premium Music & Dance Academy",
    description:
      "Master Piano, Guitar, Bass, Drums, Keyboard, Vocals, and Dance with world-class certified instructors at 88 Keys Music Studio in Dehradun.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${fraunces.variable} ${plexMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F2E7] text-[#17140F] font-sans selection:bg-[#17140F] selection:text-[#F7F2E7]">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}

