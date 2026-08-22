"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  UserCheck,
  Bell,
  Mail,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Calendar,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import PianoKeys from "@/components/PianoKeys";

export default function PrivacyClient() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const sections = [
    {
      id: "overview",
      icon: ShieldCheck,
      title: "1. Overview & Commitment",
      content: (
        <>
          <p className="text-[#4A4335] leading-relaxed mb-4">
            Welcome to <strong>88 Keys Music Studio</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We operate the website and academy services located at Guniyal Gaon, Purkul Road, Dehradun, Uttarakhand, India. We are deeply committed to protecting the privacy, confidentiality, and personal data of our students, parents, visitors, and community members.
          </p>
          <p className="text-[#4A4335] leading-relaxed">
            This Privacy Policy explains what personal information we collect when you visit our website, enroll in music or dance lessons, book trial sessions or consultations, submit inquiries, or interact with our academy staff.
          </p>
        </>
      ),
    },
    {
      id: "collection",
      icon: Eye,
      title: "2. Information We Collect",
      content: (
        <>
          <p className="text-[#4A4335] leading-relaxed mb-4">
            We collect information that you voluntarily provide to us when expressing an interest in obtaining information about our programs, participating in activities, or enrolling:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-md bg-[#EEE5D3]/60 border border-[#17140F]/10">
              <h4 className="font-bold text-[#17140F] text-sm mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8863B]"></span>
                Student &amp; Parent Details
              </h4>
              <p className="text-xs text-[#4A4335] leading-relaxed">
                Full name, age/date of birth (for junior students), email address, phone number, residential address, and emergency contact details.
              </p>
            </div>
            <div className="p-4 rounded-md bg-[#EEE5D3]/60 border border-[#17140F]/10">
              <h4 className="font-bold text-[#17140F] text-sm mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8863B]"></span>
                Musical Background &amp; Goals
              </h4>
              <p className="text-xs text-[#4A4335] leading-relaxed">
                Chosen instrument (Piano, Guitar, Bass, Drums, Dance, Vocals), skill level, Trinity/ABRSM examination goals, and preferred scheduling slots.
              </p>
            </div>
            <div className="p-4 rounded-md bg-[#EEE5D3]/60 border border-[#17140F]/10">
              <h4 className="font-bold text-[#17140F] text-sm mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8863B]"></span>
                Payment &amp; Billing Info
              </h4>
              <p className="text-xs text-[#4A4335] leading-relaxed">
                Transaction reference numbers, invoice records, and billing receipts. We do not store sensitive credit/debit card numbers directly on our servers.
              </p>
            </div>
            <div className="p-4 rounded-md bg-[#EEE5D3]/60 border border-[#17140F]/10">
              <h4 className="font-bold text-[#17140F] text-sm mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8863B]"></span>
                Automated Technical Data
              </h4>
              <p className="text-xs text-[#4A4335] leading-relaxed">
                IP address, browser type, device type, approximate location, referring URLs, and page navigation patterns via secure analytics and Google reCAPTCHA v3.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "usage",
      icon: FileText,
      title: "3. How We Use Your Information",
      content: (
        <>
          <p className="text-[#4A4335] leading-relaxed mb-4">
            We use personal data collected via our website and studio administration strictly for legitimate academic and administrative purposes:
          </p>
          <ul className="space-y-2.5 text-sm text-[#4A4335] mb-4">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#B8863B] shrink-0 mt-0.5" />
              <span><strong>Lesson Delivery &amp; Scheduling:</strong> Managing class schedules, instructor assignments, attendance tracking, and studio room reservations.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#B8863B] shrink-0 mt-0.5" />
              <span><strong>Examination Registration:</strong> Facilitating candidate entry for Trinity College London, Rockschool, or Cambridge Music grade exams upon student/parent request.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#B8863B] shrink-0 mt-0.5" />
              <span><strong>Recitals &amp; Events:</strong> Coordinating participation in our annual concerts, student recitals, jam band sessions, and workshops.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#B8863B] shrink-0 mt-0.5" />
              <span><strong>Important Studio Updates:</strong> Sending critical schedule changes, holiday announcements, billing receipts, and emergency alerts.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#B8863B] shrink-0 mt-0.5" />
              <span><strong>Security &amp; Spam Prevention:</strong> Protecting our contact forms and inquiry channels against abuse via Google reCAPTCHA.</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "minors",
      icon: UserCheck,
      title: "4. Minor Safety & Children's Privacy",
      content: (
        <>
          <p className="text-[#4A4335] leading-relaxed mb-4">
            As a music academy offering programs for young learners (ages 5 and above), protecting children&apos;s privacy is of paramount importance to us.
          </p>
          <div className="p-4 rounded-md bg-[#F1E4C8]/50 border border-[#B8863B]/30 mb-4">
            <p className="text-xs text-[#17140F] font-medium leading-relaxed">
              We do not knowingly collect personal information directly from children under 18 without verified parental or legal guardian consent. All enrollment forms, consultation bookings, and communication regarding minors must be initiated by a parent or guardian.
            </p>
          </div>
          <p className="text-[#4A4335] leading-relaxed text-sm">
            Recital photographs and video recordings featuring students are captured during public performances and studio events only with prior parental media consent. Parents may opt out of promotional photography at any time by notifying studio administration in writing.
          </p>
        </>
      ),
    },
    {
      id: "sharing",
      icon: Lock,
      title: "5. Information Sharing & Third Parties",
      content: (
        <>
          <p className="text-[#4A4335] leading-relaxed mb-4">
            <strong>We do not sell, rent, trade, or monetize your personal data to third parties.</strong> We only share information with trusted service providers under strict confidentiality agreements:
          </p>
          <ul className="space-y-2 text-sm text-[#4A4335]">
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#17140F]">•</span>
              <span><strong>Examination Boards:</strong> Trinity College London, Rockschool (RSL Awards), and associated exam bodies solely for examination registration.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#17140F]">•</span>
              <span><strong>Infrastructure &amp; Security Providers:</strong> Secure cloud hosting, encrypted database providers, and Google reCAPTCHA v3 for bot mitigation.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-[#17140F]">•</span>
              <span><strong>Legal Compliance:</strong> When required by Indian law, court order, or governmental authorities to protect the safety and rights of our students and staff.</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "security",
      icon: ShieldCheck,
      title: "6. Data Security & Retention",
      content: (
        <>
          <p className="text-[#4A4335] leading-relaxed mb-4">
            We implement administrative, technical, and physical safeguards designed to protect personal information against unauthorized access, loss, alteration, or disclosure.
          </p>
          <p className="text-[#4A4335] leading-relaxed text-sm">
            Student records are retained only for the duration of active enrollment plus the necessary statutory period required for tax, accounting, and grade certification verification. When data is no longer needed, it is securely destroyed or anonymized.
          </p>
        </>
      ),
    },
    {
      id: "rights",
      icon: Bell,
      title: "7. Your Privacy Rights",
      content: (
        <>
          <p className="text-[#4A4335] leading-relaxed mb-4">
            Under applicable Indian data protection guidelines, you have the right to:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
            <div className="p-3 bg-[#EEE5D3]/50 rounded border border-[#17140F]/10 text-center">
              <p className="font-bold text-xs text-[#17140F]">Access &amp; Review</p>
              <p className="text-[11px] text-[#4A4335] mt-1">Request a copy of your stored personal details.</p>
            </div>
            <div className="p-3 bg-[#EEE5D3]/50 rounded border border-[#17140F]/10 text-center">
              <p className="font-bold text-xs text-[#17140F]">Rectification</p>
              <p className="text-[11px] text-[#4A4335] mt-1">Update incorrect or outdated contact information.</p>
            </div>
            <div className="p-3 bg-[#EEE5D3]/50 rounded border border-[#17140F]/10 text-center">
              <p className="font-bold text-xs text-[#17140F]">Erasure / Opt-Out</p>
              <p className="text-[11px] text-[#4A4335] mt-1">Request deletion of non-essential profile data.</p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "contact-privacy",
      icon: Mail,
      title: "8. Contact Us",
      content: (
        <>
          <p className="text-[#4A4335] leading-relaxed mb-4">
            If you have questions, concerns, or requests regarding this Privacy Policy or how your personal information is handled, please contact our administrative team:
          </p>
          <div className="p-5 rounded-md bg-[#17140F] text-[#F7F2E7] space-y-2 text-sm">
            <p className="font-display font-semibold text-[#B8863B] text-base">88 Keys Music Studio</p>
            <p className="text-[#B3A98F] text-xs">Attn: Privacy &amp; Data Compliance</p>
            <p className="text-xs text-[#B3A98F]">Guniyal Gaon, Purkul Road, Dehradun, Uttarakhand, India</p>
            <p className="text-xs text-[#B3A98F]">Phone: +91 9639721993</p>
            <p className="text-xs text-[#B3A98F]">Email: <a href="mailto:88keysacademy88@gmail.com" className="text-[#B8863B] hover:underline">88keysacademy88@gmail.com</a></p>
          </div>
        </>
      ),
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
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Policy</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#17140F] tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-[#4A4335] leading-relaxed max-w-2xl mx-auto">
            Your trust is our cornerstone. Learn how 88 Keys Music Studio safeguards your personal and academic information.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#8C826D] mt-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Last Updated: February 2025</span>
          </div>
        </div>

        {/* Summary Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="p-5 rounded-md bg-[#EEE5D3]/70 border border-[#17140F]/10 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded bg-[#B8863B]/15 text-[#B8863B] flex items-center justify-center font-bold mb-3">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="font-display font-semibold text-base text-[#17140F] mb-1">Strict Confidentiality</h3>
              <p className="text-xs text-[#4A4335] leading-relaxed">
                We never sell or monetize your personal or payment information to advertisers.
              </p>
            </div>
          </div>
          <div className="p-5 rounded-md bg-[#EEE5D3]/70 border border-[#17140F]/10 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded bg-[#B8863B]/15 text-[#B8863B] flex items-center justify-center font-bold mb-3">
                <UserCheck className="w-4 h-4" />
              </div>
              <h3 className="font-display font-semibold text-base text-[#17140F] mb-1">Child Safety First</h3>
              <p className="text-xs text-[#4A4335] leading-relaxed">
                Minor student enrollment and communication require verified parental consent.
              </p>
            </div>
          </div>
          <div className="p-5 rounded-md bg-[#EEE5D3]/70 border border-[#17140F]/10 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded bg-[#B8863B]/15 text-[#B8863B] flex items-center justify-center font-bold mb-3">
                <Eye className="w-4 h-4" />
              </div>
              <h3 className="font-display font-semibold text-base text-[#17140F] mb-1">Transparent Control</h3>
              <p className="text-xs text-[#4A4335] leading-relaxed">
                Request data copies or updates to your academic profile at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Policy Sections */}
        <div className="space-y-6">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <section
                key={sec.id}
                id={sec.id}
                className="p-6 sm:p-8 rounded-md bg-[#F7F2E7] border border-[#17140F]/10 hover:border-[#B8863B]/30 transition-colors shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#17140F]/10">
                  <div className="w-7 h-7 rounded bg-[#F1E4C8] text-[#B8863B] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#17140F]">
                    {sec.title}
                  </h2>
                </div>
                <div>{sec.content}</div>
              </section>
            );
          })}
        </div>

        {/* Bottom Help CTA */}
        <div className="mt-12 p-6 rounded-md bg-[#EEE5D3] border border-[#B8863B]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-[#B8863B] shrink-0" />
            <div>
              <p className="font-display font-semibold text-base text-[#17140F]">Have questions about your data?</p>
              <p className="text-xs text-[#4A4335]">Our team is always here to assist with any privacy queries.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-sm bg-[#17140F] text-[#F7F2E7] text-xs font-semibold hover:bg-[#B8863B] hover:text-[#17140F] transition-colors whitespace-nowrap"
          >
            Contact Academy
          </Link>
        </div>
      </main>

      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
