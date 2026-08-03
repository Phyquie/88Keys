"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Send, Check } from "lucide-react";
import PianoKeys from "./PianoKeys";

// Mirrors the Navbar: instruments grouped, everything else top level.
const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Dance", href: "/dance" },
  { name: "Teachers", href: "/teachers" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

const instrumentLinks = [
  { name: "Piano", href: "/piano" },
  { name: "Guitar", href: "/guitar" },
  { name: "Bass", href: "/bass" },
  { name: "Drums", href: "/drums" },
];

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) setNewsletterSubmitted(true);
  };

  return (
    <footer id="contact" className="bg-[#17140F] text-[#B3A98F] pt-0 pb-12">
      <PianoKeys variant="dark" keyCount={56} className="h-3" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#3A342A]">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-md bg-[#B8863B] flex items-center justify-center text-[#17140F] font-display font-semibold text-xl">
                88
              </div>
              <span className="font-display font-semibold text-xl text-[#F7F2E7] tracking-tight">
                88 Keys <span className="text-[#B8863B] text-[10px] font-mono font-medium uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#B8863B]/10 border border-[#B8863B]/25">Studio</span>
              </span>
            </Link>
            <p className="text-sm text-[#B3A98F] leading-relaxed mb-6 max-w-sm">
              Where passion meets music. Premier music & dance academy empowering students of all ages through certified instruction, state-of-the-art studios, and live stage performances.
            </p>

            <div className="flex items-center gap-4 text-[#B3A98F]">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#F7F2E7]/5 border border-[#F7F2E7]/10 flex items-center justify-center hover:bg-[#B8863B] hover:text-[#17140F] transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#F7F2E7]/5 border border-[#F7F2E7]/10 flex items-center justify-center hover:bg-[#B8863B] hover:text-[#17140F] transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#F7F2E7]/5 border border-[#F7F2E7]/10 flex items-center justify-center hover:bg-[#B8863B] hover:text-[#17140F] transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-[#F7F2E7] font-mono font-medium text-xs uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-[#F7F2E7] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Instruments */}
          <div>
            <h4 className="text-[#F7F2E7] font-mono font-medium text-xs uppercase tracking-widest mb-5">Instruments</h4>
            <ul className="space-y-3 text-sm">
              {instrumentLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-[#F7F2E7] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Newsletter */}
          <div>
            <h4 className="text-[#F7F2E7] font-mono font-medium text-xs uppercase tracking-widest mb-5">Contact Us</h4>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B8863B] shrink-0 mt-1" />
                <span>88 Melody Boulevard, Suite 400, Music District</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B8863B] shrink-0" />
                <span>+1 (800) 88-KEYS-STUDIO</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B8863B] shrink-0" />
                <span>hello@88keysstudio.com</span>
              </li>
            </ul>

            {/* Newsletter Form */}
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <p className="text-xs font-bold text-[#B3A98F]">Subscribe for Workshop Updates</p>
              {newsletterSubmitted ? (
                <div className="p-2.5 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs rounded-md flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md bg-[#F7F2E7]/5 border border-[#F7F2E7]/10 text-xs text-[#F7F2E7] placeholder:text-[#6B6350] focus:outline-none focus:border-[#B8863B]"
                  />
                  <button type="submit" className="p-2.5 bg-[#B8863B] text-[#17140F] rounded-md hover:bg-[#F7F2E7] transition-colors cursor-pointer">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B6350]">
          <p>© {new Date().getFullYear()} 88 Keys Music Studio. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <a href="/admin" className="hover:text-[#B3A98F]">Admin Login</a>
            <a href="#" className="hover:text-[#B3A98F]">Privacy Policy</a>
            <a href="#" className="hover:text-[#B3A98F]">Terms of Service</a>
            <a href="#" className="hover:text-[#B3A98F]">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
