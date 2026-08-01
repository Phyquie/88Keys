"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { X, CheckCircle2, Sparkles, Loader2, AlertCircle, RotateCw } from "lucide-react";
import { PianoIcon } from "./Icons";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  defaultCourse = "Piano Mastery",
}: BookingModalProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [captchaId, setCaptchaId] = useState<string | null>(null);
  const [captchaSvg, setCaptchaSvg] = useState<string | null>(null);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [trialForm, setTrialForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: defaultCourse,
    preferredDay: "Weekend",
    mode: "In-Studio",
  });

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
    if (isOpen) {
      fetchCaptcha();
      setCaptchaInput("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        body: JSON.stringify({ ...trialForm, captchaAnswer: captchaInput, captchaId }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
        fetchCaptcha();
        setCaptchaInput("");
        return;
      }

      setFormSubmitted(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#17140F", "#B8863B", "#F1E4C8", "#F7F2E7"],
      });
    } catch {
      setSubmitError(
        "We couldn't reach the studio. Check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setFormSubmitted(false);
      setSubmitError(null);
      setCaptchaInput("");
      setCaptchaId(null);
      setCaptchaSvg(null);
      setTrialForm({
        name: "",
        email: "",
        phone: "",
        course: defaultCourse,
        preferredDay: "Weekend",
        mode: "In-Studio",
      });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#17140F]/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#F7F2E7] shadow-2xl p-6 sm:p-8 z-10 border border-[#17140F]/10 overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar text-[#17140F]"
          >
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 text-[#4A4335] hover:text-[#17140F] rounded-full hover:bg-[#EEE5D3] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#F1E4C8] text-[#B8863B] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#17140F] mb-2 flex items-center justify-center gap-2">
                  <span>Request Confirmed!</span>
                  <Sparkles className="w-6 h-6 text-[#B8863B]" />
                </h3>
                <p className="text-[#4A4335] text-sm mb-6 leading-relaxed">
                  Thank you, <span className="font-bold text-[#17140F]">{trialForm.name}</span>! We have received your consultation / enquiry request for{" "}
                  <span className="font-bold text-[#B8863B]">{trialForm.course}</span> ({trialForm.mode}). Our team will reach out to connect with you shortly.
                </p>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 bg-[#17140F] text-[#F7F2E7] font-semibold rounded-sm hover:bg-[#B8863B] hover:text-[#17140F] transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-9 h-9 rounded-sm bg-[#F1E4C8] text-[#B8863B] flex items-center justify-center">
                    <PianoIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-medium uppercase tracking-widest text-[#B8863B]">
                    1-on-1 Consultation
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#17140F] mb-1">
                  Book Your Consult / Enquiry
                </h3>
                <p className="text-xs text-[#4A4335] mb-6">
                  No commitment required. Experience 1-on-1 personalized mentorship.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-bold text-[#17140F] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={trialForm.name}
                      onChange={(e) => setTrialForm({ ...trialForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] focus:ring-2 focus:ring-[#B8863B]/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#17140F] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@example.com"
                        value={trialForm.email}
                        onChange={(e) => setTrialForm({ ...trialForm, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] focus:ring-2 focus:ring-[#B8863B]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#17140F] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={trialForm.phone}
                        onChange={(e) => setTrialForm({ ...trialForm, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] focus:ring-2 focus:ring-[#B8863B]/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#17140F] mb-1">
                        Select Program *
                      </label>
                      <select
                        value={trialForm.course}
                        onChange={(e) => setTrialForm({ ...trialForm, course: e.target.value })}
                        className="w-full px-4 py-3 rounded-sm border border-[#17140F]/15 text-sm focus:outline-none focus:border-[#B8863B] focus:ring-2 focus:ring-[#B8863B]/20 bg-[#F7F2E7]"
                      >
                        <option>Piano Mastery</option>
                        <option>Acoustic Guitar</option>
                        <option>Electric & Bass Guitar</option>
                        <option>Drums & Percussion</option>
                        <option>Modern Keyboard & Synth</option>
                        <option>Dance & Movement</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17140F] mb-1">
                        Learning Mode *
                      </label>
                      <select
                        value={trialForm.mode}
                        onChange={(e) => setTrialForm({ ...trialForm, mode: e.target.value })}
                        className="w-full px-4 py-3 rounded-sm border border-[#17140F]/15 text-sm focus:outline-none focus:border-[#B8863B] focus:ring-2 focus:ring-[#B8863B]/20 bg-[#F7F2E7]"
                      >
                        <option>In-Studio (Physical)</option>
                        <option>Online Live 1-on-1</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#17140F]">
                      Security Check *
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex items-center gap-2">
                        {captchaSvg ? (
                          <div 
                            className="h-12 w-[150px] border border-[#17140F]/15 rounded-sm overflow-hidden flex items-center bg-[#F1E4C8] select-none"
                            dangerouslySetInnerHTML={{ __html: captchaSvg }}
                          />
                        ) : (
                          <div className="h-12 w-[150px] bg-[#F1E4C8]/50 animate-pulse rounded-sm border border-[#17140F]/10" />
                        )}
                        <button
                          type="button"
                          onClick={fetchCaptcha}
                          disabled={captchaLoading}
                          className="p-3 text-[#4A4335] hover:text-[#17140F] rounded-sm hover:bg-[#EEE5D3] transition-colors cursor-pointer flex items-center justify-center shrink-0 border border-[#17140F]/10"
                          title="Refresh security code"
                        >
                          <RotateCw className={`w-4 h-4 ${captchaLoading ? "animate-spin" : ""}`} />
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Type the code above"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] focus:ring-2 focus:ring-[#B8863B]/20 placeholder-[#4A4335]/50 text-[#17140F]"
                      />
                    </div>
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      className="flex items-start gap-2 rounded-sm border border-[#B8863B]/40 bg-[#F1E4C8] px-3 py-2.5 text-xs text-[#17140F]"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-px text-[#B8863B]" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-[#17140F] text-[#F7F2E7] font-semibold text-sm rounded-sm hover:bg-[#B8863B] hover:text-[#17140F] transition-all mt-2 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#17140F] disabled:hover:text-[#F7F2E7]"
                  >
                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {submitting ? "Sending..." : "Confirm Consult / Enquiry"}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
