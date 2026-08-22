"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Award,
  Brain,
  Heart,
  Sparkles,
  Star,
  GraduationCap,
  Globe,
  Quote,
  ChevronRight,
  Loader2,
  RefreshCw,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import PianoKeys from "@/components/PianoKeys";

// --- DATA ---
const CONTACT_DETAILS = [
  {
    icon: MapPin,
    title: "Studio Address",
    lines: ["Guniyal gaon, Purkul road, Dheradun"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 9639721993"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["88keysacademy88@gmail.com"],
  },
  {
    icon: Clock,
    title: "Studio Hours",
    lines: ["Monday – Saturday", "11:00 AM – 6:00 PM"],
  },
];

const PROGRAMS = [
  "Piano Mastery",
  "Acoustic & Electric Guitar",
  "Bass Guitar Architecture",
  "Drums & Percussion",
  "Dance & Movement",
  "Not sure yet",
];

const FAQS = [
  {
    q: "How quickly will I hear back after submitting the form?",
    a: "Our admissions team responds to all enquiries within one business day, usually the same afternoon during studio hours.",
  },
  {
    q: "Can I visit the studio before enrolling?",
    a: "Absolutely. Book a consultation / enquiry or simply call ahead to schedule a studio tour with a faculty member.",
  },
  {
    q: "Do you offer online consultations?",
    a: "Yes, we offer live video consultations for students who are not local to the Music District studio.",
  },
];

export default function ContactClient() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    program: PROGRAMS[0],
    message: "",
  });

  const [captchaSvg, setCaptchaSvg] = useState("");
  const [captchaId, setCaptchaId] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fetchCaptcha = async () => {
    setCaptchaLoading(true);
    try {
      const res = await fetch("/api/captcha");
      if (res.ok) {
        const data = await res.json();
        setCaptchaId(data.captchaId);
        setCaptchaSvg(data.svg);
      } else {
        console.error("Failed to load captcha");
      }
    } catch (err) {
      console.error("Error fetching captcha:", err);
    } finally {
      setCaptchaLoading(false);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (!captchaInput.trim()) {
      setSubmitError("Please complete the security check.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          course: form.program,
          preferredDay: "Any Day",
          mode: "Contact Form Enquiry",
          message: form.message,
          captchaAnswer: captchaInput,
          captchaId,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
        fetchCaptcha();
        setCaptchaInput("");
        return;
      }

      setFormSubmitted(true);
    } catch {
      setSubmitError("We couldn't reach the studio. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F7F2E7] text-[#17140F] font-sans selection:bg-[#17140F] selection:text-[#F7F2E7]">
      {/* -------------------------------------------------- */}
      {/* COMMON HEADER / NAVBAR                              */}
      {/* -------------------------------------------------- */}
      <Navbar onOpenTrialModal={() => setIsTrialModalOpen(true)} />

      {/* -------------------------------------------------- */}
      {/* HERO SECTION                                       */}
      {/* -------------------------------------------------- */}
      <section className="relative pt-32 pb-0 md:pt-40 overflow-hidden bg-[#F7F2E7]">
        <div className="absolute top-24 right-0 w-130 h-130 bg-[#B8863B]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-10 text-6xl text-[#17140F]/4 font-display select-none pointer-events-none animate-note-1">♪</div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20 md:pb-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-7">
              <span className="w-6 h-px bg-[#B8863B]" />
              Get In Touch
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold text-[#17140F] tracking-tight leading-[1.1] mb-6">
              Let&apos;s Start Your <span className="italic gradient-text-brass">Musical</span> Journey
            </h1>

            <p className="text-lg text-[#4A4335] font-normal leading-relaxed max-w-2xl mx-auto">
              Questions about a program, schedules, or studio visits? Reach out and our admissions team will get back to you within one business day.
            </p>
          </motion.div>
        </div>

        <PianoKeys variant="light" keyCount={36} className="h-9" />
      </section>

      {/* -------------------------------------------------- */}
      {/* CONTACT DETAILS STRIP                              */}
      {/* -------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-[#EEE5D3] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#17140F]/12 border border-[#17140F]/12">
            {CONTACT_DETAILS.map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.title} className="bg-[#F7F2E7] p-6 flex flex-col gap-4">
                  <span className="w-10 h-10 flex items-center justify-center bg-[#17140F] text-[#B8863B] shrink-0">
                    <IconComp className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-[#17140F] text-sm mb-1">{item.title}</h3>
                    {item.lines.map((line) => (
                      <p key={line} className="text-xs text-[#4A4335] leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* CONTACT FORM + MAP                                 */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#F7F2E7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 border border-[#17140F]/15 bg-[#EEE5D3] p-8 sm:p-10"
            >
              <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
                <span className="w-6 h-px bg-[#B8863B]" />
                Send An Enquiry
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#17140F] tracking-tight mb-8">
                Tell Us About Your Goals
              </h2>

              {formSubmitted ? (
                <div className="p-8 text-center bg-[#F7F2E7] border border-[#B8863B]/30">
                  <div className="w-14 h-14 bg-[#F1E4C8] text-[#B8863B] flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#17140F] mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-[#4A4335]">
                    Thank you, {form.name || "there"}. Our admissions team will reach out within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#17140F] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] focus:ring-2 focus:ring-[#B8863B]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#17140F] mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] focus:ring-2 focus:ring-[#B8863B]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17140F] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] focus:ring-2 focus:ring-[#B8863B]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17140F] mb-1.5">
                      Program of Interest
                    </label>
                    <select
                      value={form.program}
                      onChange={(e) => setForm({ ...form, program: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] focus:ring-2 focus:ring-[#B8863B]/20"
                    >
                      {PROGRAMS.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#17140F] mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your goals, preferred schedule, or any questions..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] focus:ring-2 focus:ring-[#B8863B]/20 resize-none"
                    />
                  </div>

                  {/* Captcha Security Check */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#17140F]">
                      Security Verification *
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                      <div className="flex items-center gap-2 bg-[#EEE5D3]/40 border border-[#17140F]/15 px-3 py-1.5 rounded-sm select-none h-[46px] w-full sm:w-auto shrink-0 justify-center">
                        {captchaSvg ? (
                          <div
                            dangerouslySetInnerHTML={{ __html: captchaSvg }}
                            className="h-full w-32 flex items-center justify-center [&>svg]:h-full [&>svg]:w-full"
                          />
                        ) : (
                          <div className="h-full w-32 animate-pulse bg-stone-200 rounded-sm" />
                        )}
                        <button
                          type="button"
                          onClick={fetchCaptcha}
                          disabled={captchaLoading}
                          className="p-1 hover:bg-[#EEE5D3] rounded-sm text-[#4A4335] hover:text-[#17140F] transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
                          title="Refresh security code"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${captchaLoading ? "animate-spin" : ""}`} />
                        </button>
                      </div>

                      <input
                        type="text"
                        required
                        placeholder="Enter the code shown"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        className="flex-grow px-4 py-3 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] focus:ring-2 focus:ring-[#B8863B]/20 h-[46px]"
                      />
                    </div>
                  </div>

                  {submitError && (
                    <div className="p-3 bg-[#F1E4C8] border border-[#B8863B]/40 text-[#17140F] text-xs flex items-center gap-2 rounded-sm">
                      <span className="font-semibold text-[#B8863B]">Error:</span>
                      <span>{submitError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-10 py-4 bg-[#17140F] text-[#F7F2E7] font-semibold rounded-sm hover:bg-[#B8863B] hover:text-[#17140F] transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>{submitting ? "Sending..." : "Send Message"}</span>
                    {!submitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right: Studio Visual + Quick CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="overflow-hidden border-4 border-[#17140F] mb-6">
                <img
                  src="https://images.unsplash.com/photo-1525994886773-080587e161c2?q=80&w=1000&auto=format&fit=crop"
                  alt="88 Keys Music Studio"
                  className="w-full h-64 object-cover grayscale-25"
                />
              </div>

              <div className="p-6 bg-[#17140F] text-[#F7F2E7] border border-[#B8863B]/30">
                <h3 className="font-display text-xl font-semibold mb-3">
                  Prefer to Talk First?
                </h3>
                <p className="text-sm text-[#B3A98F] leading-relaxed mb-6">
                  Skip the form and book a complimentary 1-on-1 consultation or submit an enquiry directly — no commitment required.
                </p>
                <button
                  onClick={() => setIsTrialModalOpen(true)}
                  className="w-full py-3.5 bg-[#B8863B] text-[#17140F] font-semibold text-sm rounded-sm hover:bg-[#F7F2E7] transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book Consult / Enquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* FREQUENTLY ASKED QUESTIONS                         */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#EEE5D3] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
              <span className="w-6 h-px bg-[#B8863B]" />
              Got Questions?
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="border border-[#17140F]/15 divide-y divide-[#17140F]/15">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="bg-[#F7F2E7]">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-[#17140F] hover:text-[#B8863B] transition-colors cursor-pointer"
                  >
                    <span className="text-base">{faq.q}</span>
                    <span className={`text-[#B8863B] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6 pt-1 text-xs text-[#4A4335] leading-relaxed"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* COMMON FOOTER                                      */}
      {/* -------------------------------------------------- */}
      <Footer />

      {/* -------------------------------------------------- */}
      {/* FREE TRIAL BOOKING MODAL                           */}
      {/* -------------------------------------------------- */}
      <BookingModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        defaultCourse="Piano Mastery"
      />
    </div>
  );
}
