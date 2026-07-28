"use client";

import Link from "next/link";
import { ArrowRight, Home, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PianoKeys from "@/components/PianoKeys";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#F7F2E7] text-[#17140F] font-sans selection:bg-[#17140F] selection:text-[#F7F2E7]">
      <Navbar />

      <section className="relative pt-32 pb-0 md:pt-40 overflow-hidden bg-[#F7F2E7]">
        <div className="absolute top-24 right-0 w-130 h-130 bg-[#B8863B]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-10 text-6xl text-[#17140F]/4 font-display select-none pointer-events-none animate-note-1">♪</div>
        <div className="absolute top-1/2 left-1/3 text-8xl text-[#B8863B]/6 font-display select-none pointer-events-none animate-note-2">♫</div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-24 md:pb-32 text-center">
          <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-7">
            <span className="w-6 h-px bg-[#B8863B]" />
            Error 404
            <span className="w-6 h-px bg-[#B8863B]" />
          </span>

          <h1 className="font-display text-6xl sm:text-8xl font-semibold text-[#17140F] tracking-tight leading-none mb-6">
            <span className="italic gradient-text-brass">Off</span>-Key
          </h1>

          <p className="text-lg text-[#4A4335] font-normal leading-relaxed max-w-xl mx-auto mb-10">
            The page you&apos;re looking for hit a wrong note and wandered off. It may have moved, or the address might be off by a beat.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-4 bg-[#17140F] text-[#F7F2E7] font-semibold rounded-sm hover:bg-[#B8863B] hover:text-[#17140F] transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-[#17140F] font-semibold rounded-sm border border-[#17140F]/25 hover:border-[#17140F] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#B8863B]" />
              <span>Contact Us</span>
            </Link>
          </div>

          <div className="mt-14 pt-8 border-t border-[#17140F]/10 flex flex-wrap items-center justify-center gap-3 font-mono text-xs uppercase tracking-wider">
            {[
              { name: "Piano", href: "/piano" },
              { name: "Guitar", href: "/guitar" },
              { name: "Bass", href: "/bass" },
              { name: "Drums", href: "/drums" },
              { name: "Dance", href: "/dance" },
              { name: "Gallery", href: "/gallery" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 border border-[#17140F]/15 text-[#4A4335] hover:border-[#17140F] hover:text-[#17140F] transition-colors inline-flex items-center gap-1.5"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-3 h-3 text-[#B8863B]" />
              </Link>
            ))}
          </div>
        </div>

        <PianoKeys variant="light" keyCount={36} className="h-9" />
      </section>

      <Footer />
    </div>
  );
}
