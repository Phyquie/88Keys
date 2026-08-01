"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, ArrowLeft, BookOpen, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  coverImage?: string;
  heroImage?: string;
  otherImage?: string;
  otherImages?: string[];
}

export default function BlogDetailClient({ blog }: { blog: BlogPost }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  function parseInlineMarkdown(text: string) {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    if (parts.length === 1) return text;
    
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="font-bold text-[#17140F]">{part}</strong>;
      }
      return part;
    });
  }

  function parseMarkdown(text: string) {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      if (!line.trim()) {
        return <div key={i} className="h-4" />;
      }
      
      if (line.startsWith("### ")) {
        return (
          <h3 key={i} className="font-display text-xl sm:text-2xl font-semibold text-[#17140F] mt-8 mb-4">
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={i} className="font-display text-2xl sm:text-3xl font-semibold text-[#17140F] mt-10 mb-4">
            {line.replace("## ", "")}
          </h2>
        );
      }
      
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li key={i} className="text-base text-[#4A4335] ml-6 list-disc mb-2 leading-relaxed">
            {parseInlineMarkdown(line.substring(2))}
          </li>
        );
      }

      return (
        <p key={i} className="text-base text-[#4A4335] leading-relaxed mb-6">
          {parseInlineMarkdown(line)}
        </p>
      );
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F2E7]">
      <Navbar onOpenTrialModal={() => setIsBookingOpen(true)} />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A4335] hover:text-[#17140F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all journals</span>
          </Link>
        </div>

        <article className="bg-[#F7F2E7]">
          {/* Header */}
          <header className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F1E4C8] border border-[#B8863B]/20 text-[#B8863B] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Journal Entry</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#17140F] tracking-tight leading-tight mb-6">
              {blog.title}
            </h1>

            {/* Metadata */}
            <div className="flex items-center gap-6 text-sm font-mono font-medium text-[#B8863B]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {blog.date}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {blog.author}
              </span>
            </div>
          </header>

          {/* Cover Image */}
          {(() => {
            const coverBg = blog.heroImage || blog.coverImage;
            return (
              <div
                className="w-full h-64 sm:h-96 rounded-sm mb-12 flex items-center justify-center text-white select-none border border-[#17140F]/10"
                style={{
                  background: coverBg 
                    ? (coverBg.startsWith("linear-gradient") ? coverBg : `url(${coverBg}) center/cover no-repeat`)
                    : "linear-gradient(135deg, #17140F 0%, #B8863B 100%)",
                }}
              >
                <span className="font-display text-4xl sm:text-6xl font-semibold tracking-widest opacity-25">88 KEYS</span>
              </div>
            );
          })()}

          {/* Content */}
          <div className="prose prose-stone max-w-none text-[#4A4335] leading-relaxed">
            {parseMarkdown(blog.content)}
          </div>

          {/* Gallery of Other Images */}
          {(() => {
            const allSecondaryImages: string[] = [];
            if (blog.otherImage && (!blog.otherImages || !blog.otherImages.includes(blog.otherImage))) {
              allSecondaryImages.push(blog.otherImage);
            }
            if (blog.otherImages) {
              blog.otherImages.forEach(img => {
                if (img && !allSecondaryImages.includes(img)) {
                  allSecondaryImages.push(img);
                }
              });
            }

            if (allSecondaryImages.length === 0) return null;

            return (
              <div className="mt-12 border-t border-[#17140F]/10 pt-10">
                <h3 className="font-display text-lg font-semibold text-[#17140F] mb-4">
                  Media Gallery
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {allSecondaryImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxImg(imgUrl)}
                      className="relative h-24 sm:h-32 rounded-sm overflow-hidden border border-[#17140F]/10 shadow-sm cursor-zoom-in bg-[#17140F] group"
                    >
                      <img 
                        src={imgUrl} 
                        alt={`Gallery image ${idx + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-85 transition-all duration-300" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </article>
      </main>

      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImg(null)}
              className="absolute inset-0 bg-[#17140F]/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] z-10 overflow-hidden rounded-sm border border-white/10"
            >
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute top-4 right-4 p-2 bg-[#17140F]/80 text-[#F7F2E7] hover:text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={lightboxImg}
                alt="Enlarged gallery visual"
                className="max-w-full max-h-[85vh] object-contain"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
