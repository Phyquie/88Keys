"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  onOpenTrialModal?: () => void;
}

const instrumentLinks = [
  { name: "Piano", href: "/piano" },
  { name: "Guitar", href: "/guitar" },
  { name: "Bass", href: "/bass" },
  { name: "Drums", href: "/drums" },
];

const leadingLinks = [{ name: "Home", href: "/" }];

const trailingLinks = [
  { name: "Dance", href: "/dance" },
  { name: "Teachers", href: "/teachers" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

function DesktopLink({
  link,
  isActive,
}: {
  link: { name: string; href: string };
  isActive: boolean;
}) {
  return (
    <Link
      href={link.href}
      className={`hover:text-[#17140F] transition-colors relative py-1 group font-medium ${isActive ? "text-[#17140F] font-bold" : "text-[#4A4335]"
        }`}
    >
      {link.name}
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-[#B8863B] rounded-full transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
      />
    </Link>
  );
}

export default function Navbar({ onOpenTrialModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [instrumentsOpen, setInstrumentsOpen] = useState(false);
  const pathname = usePathname();
  const instrumentsRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const instrumentActive = instrumentLinks.some((link) => pathname === link.href);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the dropdown on outside click or Escape
  useEffect(() => {
    if (!instrumentsOpen) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (!instrumentsRef.current?.contains(e.target as Node)) {
        setInstrumentsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInstrumentsOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [instrumentsOpen]);

  // Clear any pending hover-close timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const openInstruments = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setInstrumentsOpen(true);
  };

  // Small delay so the pointer can travel from the trigger to the panel
  const scheduleCloseInstruments = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setInstrumentsOpen(false), 140);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-nav-scrolled py-3.5" : "glass-nav py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 rounded-md bg-[#17140F] flex items-center justify-center text-[#F7F2E7] overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <span className="absolute right-1 top-1 bottom-1 w-0.75 bg-[#F7F2E7]" />
            <span className="absolute right-3 top-1 bottom-1 w-0.75 bg-[#F7F2E7]" />
            <span className="font-display font-semibold text-base tracking-tight">88</span>
          </div>
          <div>
            <span className="font-display font-semibold text-lg text-[#17140F] tracking-tight flex items-center gap-1.5">
              88 Keys <span className="text-[#B8863B] text-[10px] font-mono font-medium uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#F1E4C8] border border-[#B8863B]/20">Studio</span>
            </span>
            <p className="text-[10px] text-[#4A4335] font-mono font-medium tracking-widest uppercase">Music &amp; Dance Academy</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#4A4335]">
          {leadingLinks.map((link) => (
            <DesktopLink key={link.name} link={link} isActive={pathname === link.href} />
          ))}

          {/* Instruments dropdown */}
          <div
            ref={instrumentsRef}
            className="relative"
            onMouseEnter={openInstruments}
            onMouseLeave={scheduleCloseInstruments}
          >
            <button
              type="button"
              onClick={() => setInstrumentsOpen((open) => !open)}
              aria-expanded={instrumentsOpen}
              aria-haspopup="true"
              className={`hover:text-[#17140F] transition-colors relative py-1 group font-medium flex items-center gap-1 cursor-pointer ${instrumentActive || instrumentsOpen ? "text-[#17140F]" : "text-[#4A4335]"
                } ${instrumentActive ? "font-bold" : ""}`}
            >
              Instruments
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${instrumentsOpen ? "rotate-180" : ""
                  }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-[#B8863B] rounded-full transition-all duration-300 ${instrumentActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              />
            </button>

            <AnimatePresence>
              {instrumentsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 top-full pt-3 w-48"
                >
                  <div className="flex flex-col rounded-md border border-[#17140F]/10 bg-[#F7F2E7]/95 backdrop-blur-xl p-1.5 shadow-xl">
                    {instrumentLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setInstrumentsOpen(false)}
                        className={`px-3 py-2 rounded-sm transition-colors ${pathname === link.href
                          ? "bg-[#F1E4C8] text-[#17140F] font-bold"
                          : "hover:bg-[#F1E4C8] hover:text-[#17140F]"
                          }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {trailingLinks.map((link) => (
            <DesktopLink key={link.name} link={link} isActive={pathname === link.href} />
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={onOpenTrialModal}
            className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-[#F7F2E7] transition-all duration-300 bg-[#17140F] rounded-sm hover:bg-[#B8863B] hover:text-[#17140F] shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Book Free Trial</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-[#17140F] hover:bg-[#EEE5D3] transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#F7F2E7]/95 backdrop-blur-xl border-b border-[#17140F]/10 px-4 pt-3 pb-6 shadow-xl"
          >
            <div className="flex flex-col gap-2 font-medium text-[#4A4335] text-sm">
              {[...leadingLinks, ...instrumentLinks, ...trailingLinks].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-md transition-colors ${pathname === link.href
                    ? "bg-[#F1E4C8] text-[#17140F] font-bold"
                    : "hover:bg-[#F1E4C8] hover:text-[#17140F]"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenTrialModal) onOpenTrialModal();
                  }}
                  className="w-full py-3 text-center text-[#F7F2E7] bg-[#17140F] rounded-md font-semibold shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book Free Trial</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
