"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cookie,
  ShieldCheck,
  Sliders,
  Database,
  Lock,
  Calendar,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Settings,
  Info,
  Server,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

export default function CookiesClient() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const cookieCategories = [
    {
      id: "essential",
      title: "1. Strictly Necessary Cookies",
      badge: "Always Active",
      badgeColor: "bg-emerald-950/40 text-emerald-700 border-emerald-500/30",
      desc: "These cookies are fundamental for the website to function securely and cannot be switched off in our systems. They are usually set in response to actions made by you, such as requesting a consultation booking, logging into the admin portal, or filling out inquiry forms.",
      examples: [
        { name: "admin_token", purpose: "Maintains secure authenticated session for studio faculty and admin portal.", expires: "7 Days" },
        { name: "booking_state", purpose: "Remembers form progress during instrument consultation submission.", expires: "Session" },
        { name: "csrf_protect", purpose: "Prevents Cross-Site Request Forgery on API submissions.", expires: "Session" },
      ],
    },
    {
      id: "security",
      title: "2. Security & Anti-Abuse Cookies",
      badge: "Security",
      badgeColor: "bg-amber-950/40 text-amber-700 border-amber-500/30",
      desc: "We use Google reCAPTCHA v3 to detect automated bot attacks and protect our student inquiry and trial booking endpoints from spam.",
      examples: [
        { name: "_GRECAPTCHA", purpose: "Google reCAPTCHA risk assessment to distinguish human visitors from automated scripts.", expires: "6 Months" },
      ],
    },
    {
      id: "analytics",
      title: "3. Analytics & Performance Cookies",
      badge: "Optional / Analytics",
      badgeColor: "bg-blue-950/40 text-blue-700 border-blue-500/30",
      desc: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our academy website. They help us know which instrument pages (Piano, Guitar, Drums, Bass, Dance) are the most popular and see how visitors navigate the site.",
      examples: [
        { name: "_ga, _ga_*", purpose: "Google Analytics cookies used to calculate visitor, session, and campaign data anonymously.", expires: "2 Years" },
      ],
    },
    {
      id: "functional",
      title: "4. Functional & Experience Preferences",
      badge: "Preferences",
      badgeColor: "bg-purple-950/40 text-purple-700 border-purple-500/30",
      desc: "These cookies enable enhanced functionality and personalization, such as remembering your volume settings on interactive piano audio tools or saving filter preferences on the faculty showcase.",
      examples: [
        { name: "pref_dept_filter", purpose: "Remembers selected instrument department tab on the Teachers directory.", expires: "30 Days" },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F2E7]">
      <Navbar onOpenTrialModal={() => setIsBookingOpen(true)} />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#4A4335] hover:text-[#B8863B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F1E4C8] border border-[#B8863B]/20 text-[#B8863B] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Cookie className="w-3.5 h-3.5" />
            <span>Cookie Notice</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#17140F] tracking-tight mb-4">
            Cookie Policy
          </h1>
          <p className="text-sm sm:text-base text-[#4A4335] leading-relaxed max-w-2xl mx-auto">
            Learn about how 88 Keys Music Studio uses cookies and similar technologies to ensure a secure, fast, and smooth browsing experience.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#8C826D] mt-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Last Updated: February 2025</span>
          </div>
        </div>

        {/* Intro Banner */}
        <div className="p-6 rounded-md bg-[#EEE5D3]/70 border border-[#17140F]/10 mb-10 flex items-start gap-4">
          <div className="w-9 h-9 rounded-md bg-[#B8863B]/20 text-[#B8863B] flex items-center justify-center shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-lg text-[#17140F] mb-1">What Are Cookies?</h2>
            <p className="text-xs sm:text-sm text-[#4A4335] leading-relaxed">
              Cookies are small text files that are stored on your computer or mobile device when you load a website. They help websites remember your device, keep sessions secure, store preferences, and understand which sections are most useful to visitors.
            </p>
          </div>
        </div>

        {/* Cookie Categories */}
        <div className="space-y-6 mb-12">
          {cookieCategories.map((cat) => (
            <div
              key={cat.id}
              className="p-6 sm:p-8 rounded-md bg-[#F7F2E7] border border-[#17140F]/10 hover:border-[#B8863B]/30 transition-colors shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-[#17140F]/10">
                <h3 className="font-display text-xl font-semibold text-[#17140F]">{cat.title}</h3>
                <span className={`self-start sm:self-auto px-2.5 py-0.5 rounded text-[11px] font-mono font-medium border ${cat.badgeColor}`}>
                  {cat.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#4A4335] leading-relaxed mb-4">{cat.desc}</p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#17140F]/10 text-[#17140F] font-mono">
                      <th className="py-2 pr-4 font-semibold">Cookie Name</th>
                      <th className="py-2 px-4 font-semibold">Purpose</th>
                      <th className="py-2 pl-4 font-semibold text-right">Lifespan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#17140F]/5">
                    {cat.examples.map((item, idx) => (
                      <tr key={idx} className="hover:bg-[#EEE5D3]/30 transition-colors">
                        <td className="py-2.5 pr-4 font-mono font-medium text-[#B8863B]">{item.name}</td>
                        <td className="py-2.5 px-4 text-[#4A4335]">{item.purpose}</td>
                        <td className="py-2.5 pl-4 text-right font-mono text-[#8C826D] whitespace-nowrap">{item.expires}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* How to Manage / Disable Cookies */}
        <div className="p-6 sm:p-8 rounded-md bg-[#EEE5D3]/60 border border-[#17140F]/10 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-5 h-5 text-[#B8863B]" />
            <h2 className="font-display font-semibold text-xl text-[#17140F]">
              How to Control &amp; Disable Cookies
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4A4335] leading-relaxed mb-4">
            You can control or delete cookies at any time through your browser settings. If you choose to block strictly necessary cookies, some features such as the booking form verification or admin console may not function properly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-[#F7F2E7] rounded border border-[#17140F]/10">
              <p className="font-bold text-[#17140F] mb-1">Google Chrome</p>
              <p className="text-[#8C826D] text-[11px]">Settings &rarr; Privacy &amp; Security &rarr; Cookies and other site data</p>
            </div>
            <div className="p-3 bg-[#F7F2E7] rounded border border-[#17140F]/10">
              <p className="font-bold text-[#17140F] mb-1">Apple Safari</p>
              <p className="text-[#8C826D] text-[11px]">Preferences &rarr; Privacy &rarr; Manage Website Data</p>
            </div>
            <div className="p-3 bg-[#F7F2E7] rounded border border-[#17140F]/10">
              <p className="font-bold text-[#17140F] mb-1">Mozilla Firefox</p>
              <p className="text-[#8C826D] text-[11px]">Settings &rarr; Privacy &amp; Security &rarr; Enhanced Tracking Protection</p>
            </div>
            <div className="p-3 bg-[#F7F2E7] rounded border border-[#17140F]/10">
              <p className="font-bold text-[#17140F] mb-1">Microsoft Edge</p>
              <p className="text-[#8C826D] text-[11px]">Settings &rarr; Cookies and site permissions &rarr; Manage and delete</p>
            </div>
          </div>
        </div>

        {/* Contact Footer Banner */}
        <div className="p-6 rounded-md bg-[#17140F] text-[#F7F2E7] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display font-semibold text-base text-[#B8863B]">Questions about our cookie usage?</p>
            <p className="text-xs text-[#B3A98F]">Contact our administrative office at 88keysacademy88@gmail.com</p>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-sm bg-[#B8863B] text-[#17140F] text-xs font-semibold hover:bg-[#F7F2E7] transition-colors whitespace-nowrap"
          >
            Get In Touch
          </Link>
        </div>
      </main>

      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
