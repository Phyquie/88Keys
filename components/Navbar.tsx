"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  onOpenTrialModal?: () => void;
}

export default function Navbar({ onOpenTrialModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Piano", href: "/piano" },
    { name: "Guitar", href: "/guitar" },
    { name: "Bass", href: "/bass" },
    { name: "Drums", href: "/drums" },
    { name: "Dance", href: "/dance" },
    { name: "Teachers", href: "/teachers" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },

  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-nav-scrolled py-3.5" : "glass-nav py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
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
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
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
          })}
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
              {navLinks.map((link) => (
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
