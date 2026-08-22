"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileCheck,
  Scale,
  Calendar,
  CreditCard,
  Clock,
  Sparkles,
  ShieldAlert,
  HelpCircle,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Music,
  MapPin,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

export default function TermsClient() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const sections = [
    {
      id: "agreement",
      icon: Scale,
      title: "1. Studio Agreement & Acceptance",
      content: (
        <>
          <p className="text-[#4A4335] leading-relaxed mb-4">
            By enrolling in courses, booking a consultation or trial session, accessing our website, or utilizing studio facilities at <strong>88 Keys Music Studio</strong> (&quot;the Studio&quot;), you (&quot;Student,&quot; &quot;Parent,&quot; or &quot;Guardian&quot;) agree to be bound by these Terms of Service.
          </p>
          <p className="text-[#4A4335] leading-relaxed">
            If you are enrolling on behalf of a minor child, you confirm that you are the parent or legal guardian with full authority to accept these terms on their behalf.
          </p>
        </>
      ),
    },
    {
      id: "enrollment",
      icon: Music,
      title: "2. Enrollment, Consultations & Assessments",
      content: (
        <>
          <p className="text-[#4A4335] leading-relaxed mb-4">
            88 Keys Music Studio provides certified instruction across Piano, Guitar, Bass, Drums, Dance, and Vocals for both beginner and advanced students.
          </p>
          <ul className="space-y-2.5 text-sm text-[#4A4335] mb-4">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#B8863B] shrink-0 mt-0.5" />
              <span><strong>Trial Consultations:</strong> Initial consultations or placement evaluations are scheduled subject to instructor availability and must be confirmed in advance.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#B8863B] shrink-0 mt-0.5" />
              <span><strong>Curriculum Alignment:</strong> Teaching methodologies adhere to benchmark international standards including Trinity College London, Rockschool (RSL Awards), and Cambridge Music programmes.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#B8863B] shrink-0 mt-0.5" />
              <span><strong>Batch Sizes:</strong> Group classes are capped at intimate batch sizes (typically 4–6 students) to guarantee 1-on-1 pedagogical attention.</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "fees",
      icon: CreditCard,
      title: "3. Fees, Payments & Invoicing",
      content: (
        <>
          <p className="text-[#4A4335] leading-relaxed mb-4">
            Tuition fees are structured on a monthly or term package basis depending on the chosen program and lesson frequency:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-md bg-[#EEE5D3]/60 border border-[#17140F]/10">
              <h4 className="font-bold text-[#17140F] text-sm mb-1">Payment Schedule</h4>
              <p className="text-xs text-[#4A4335] leading-relaxed">
                Tuition fees are payable in advance prior to the 5th of each calendar month or term start. Invoices and official digital receipts are issued for all transactions.
              </p>
            </div>
            <div className="p-4 rounded-md bg-[#EEE5D3]/60 border border-[#17140F]/10">
              <h4 className="font-bold text-[#17140F] text-sm mb-1">Examination &amp; Book Fees</h4>
              <p className="text-xs text-[#4A4335] leading-relaxed">
                Examination fees levied by Trinity / Rockschool, specialized sheet music, and custom lesson books are billed separately from monthly studio tuition.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-md bg-[#F1E4C8]/50 border border-[#B8863B]/30">
            <p className="text-xs text-[#17140F] font-medium leading-relaxed">
              <strong>Refund Policy:</strong> Tuition fees paid are non-refundable once classes commence. In extraordinary medical or relocation circumstances, remaining credit may be deferred to future studio terms upon written review by studio management.
            </p>
          </div>
        </>
      ),
    },
    {
      id: "attendance",
      icon: Clock,
      title: "4. Attendance, Rescheduling & Make-Up Lessons",
      content: (
        <>
          <p className="text-[#4A4335] leading-relaxed mb-4">
            To preserve instructional continuity and instructor availability, we enforce a transparent scheduling policy:
          </p>
          <ul className="space-y-2.5 text-sm text-[#4A4335]">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#B8863B] shrink-0 mt-0.5" />
              <span><strong>24-Hour Notice Required:</strong> If a student cannot attend a scheduled individual lesson, minimum 24 hours prior notice must be provided to the studio front desk to qualify for a makeup slot.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#B8863B] shrink-0 mt-0.5" />
              <span><strong>Same-Day Cancellations:</strong> Missed classes with less than 24 hours notice or unnotified absences (&quot;no-shows&quot;) are forfeited and cannot be credited.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#B8863B] shrink-0 mt-0.5" />
              <span><strong>Teacher Absences:</strong> In the rare event a faculty member is unavailable, a qualified substitute instructor will conduct the session or a dedicated reschedule will be arranged.</span>
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "conduct",
      icon: Sparkles,
      title: "5. Studio Etiquette & Instrument Care",
      content: (
        <>
          <p className="text-[#4A4335] leading-relaxed mb-4">
            88 Keys Music Studio houses premium acoustic upright and grand pianos, Fender &amp; Taylor guitars, Yamaha acoustic drum kits, and sprung dance floors.
          </p>
          <div className="p-4 rounded-md bg-[#EEE5D3]/60 border border-[#17140F]/10 space-y-2 text-xs text-[#4A4335] leading-relaxed">
            <p>• Students must wash/sanitize hands prior to playing keyboards or guitars.</p>
            <p>• No food or uncovered beverages are permitted near instruments or inside dance studios.</p>
            <p>• Clean indoor dance shoes or bare feet are mandatory on sprung dance floors to maintain hygiene and floor longevity.</p>
            <p>• Willful negligence or intentional damage to studio equipment will be assessed for repair or replacement cost.</p>
          </div>
        </>
      ),
    },
    {
      id: "media",
      icon: FileCheck,
      title: "6. Recital Media Release & Performance",
      content: (
        <>
          <p className="text-[#4A4335] leading-relaxed mb-4">
            Our academy frequently hosts student recitals, symphony jam concerts, and masterclass sessions.
          </p>
          <p className="text-sm text-[#4A4335] leading-relaxed mb-2">
            Photographs and high-definition video recordings captured during public performances and annual recitals may be used for educational showcases, social media celebrations, and studio publications.
          </p>
          <p className="text-xs text-[#8C826D]">
            Students or parents who wish to opt out of promotional photography may submit a written request to our administrative desk at the time of enrollment.
          </p>
        </>
      ),
    },
    {
      id: "liability",
      icon: ShieldAlert,
      title: "7. Health, Safety & Limitation of Liability",
      content: (
        <>
          <p className="text-[#4A4335] leading-relaxed mb-4">
            While 88 Keys Music Studio maintains strict safety and hygiene standards on premises:
          </p>
          <ul className="space-y-2 text-xs text-[#4A4335] leading-relaxed">
            <li>• Dance and physical instrument movements require natural physical exertion. Students should notify instructors of any pre-existing physical or medical constraints.</li>
            <li>• The Studio is not responsible for the loss or damage of personal belongings brought onto academy premises.</li>
            <li>• Parents are requested to promptly pick up junior students immediately following class completion.</li>
          </ul>
        </>
      ),
    },
    {
      id: "jurisdiction",
      icon: MapPin,
      title: "8. Governing Law & Jurisdiction",
      content: (
        <>
          <p className="text-[#4A4335] leading-relaxed mb-4">
            These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with studio services shall be subject to the exclusive jurisdiction of the competent courts in Dehradun, Uttarakhand.
          </p>
          <div className="p-5 rounded-md bg-[#17140F] text-[#F7F2E7] space-y-2 text-sm">
            <p className="font-display font-semibold text-[#B8863B] text-base">88 Keys Music Studio</p>
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
            <Scale className="w-3.5 h-3.5" />
            <span>Studio Guidelines</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#17140F] tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-[#4A4335] leading-relaxed max-w-2xl mx-auto">
            Clear guidelines designed to support a dedicated, inspiring, and harmonious musical learning environment for every student.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#8C826D] mt-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Last Updated: February 2025</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="p-5 rounded-md bg-[#EEE5D3]/70 border border-[#17140F]/10 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded bg-[#B8863B]/15 text-[#B8863B] flex items-center justify-center font-bold mb-3">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="font-display font-semibold text-base text-[#17140F] mb-1">24-Hour Notice</h3>
              <p className="text-xs text-[#4A4335] leading-relaxed">
                Prior notice required for lesson rescheduling and makeup eligibility.
              </p>
            </div>
          </div>
          <div className="p-5 rounded-md bg-[#EEE5D3]/70 border border-[#17140F]/10 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded bg-[#B8863B]/15 text-[#B8863B] flex items-center justify-center font-bold mb-3">
                <Music className="w-4 h-4" />
              </div>
              <h3 className="font-display font-semibold text-base text-[#17140F] mb-1">Instrument Care</h3>
              <p className="text-xs text-[#4A4335] leading-relaxed">
                Clean hands and respect for shared acoustic and digital studio gear.
              </p>
            </div>
          </div>
          <div className="p-5 rounded-md bg-[#EEE5D3]/70 border border-[#17140F]/10 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded bg-[#B8863B]/15 text-[#B8863B] flex items-center justify-center font-bold mb-3">
                <CreditCard className="w-4 h-4" />
              </div>
              <h3 className="font-display font-semibold text-base text-[#17140F] mb-1">Monthly Billing</h3>
              <p className="text-xs text-[#4A4335] leading-relaxed">
                Transparent advance tuition with digital invoice receipts provided.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
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

        {/* Help CTA */}
        <div className="mt-12 p-6 rounded-md bg-[#EEE5D3] border border-[#B8863B]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-[#B8863B] shrink-0" />
            <div>
              <p className="font-display font-semibold text-base text-[#17140F]">Need clarification on terms?</p>
              <p className="text-xs text-[#4A4335]">Feel free to speak with our front desk or course coordinators.</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-sm bg-[#17140F] text-[#F7F2E7] text-xs font-semibold hover:bg-[#B8863B] hover:text-[#17140F] transition-colors whitespace-nowrap"
          >
            Contact Desk
          </Link>
        </div>
      </main>

      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
