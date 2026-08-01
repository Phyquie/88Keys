import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "88 Keys Music Studio | Premium Music & Dance Academy",
  description:
    "Master Piano, Guitar, Bass, Drums, Keyboard, Vocals, and Dance with world-class certified instructors at 88 Keys Music Studio. Book a consultation or enquire today!",
  keywords: [
    "Music Studio",
    "Piano Lessons",
    "Guitar Academy",
    "Drum School",
    "Vocal Coaching",
    "Dance Classes",
    "88 Keys",
  ],
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
        {children}
      </body>
    </html>
  );
}

