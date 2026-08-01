"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { getBlogSlug } from "@/lib/blog-utils";

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

export default function BlogsClient() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const resBlogs = await fetch("/api/blogs");
        if (resBlogs.ok) {
          const data = await resBlogs.json();
          setBlogs(data);
        }
      } catch (err) {
        console.error("Failed to load blogs:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F2E7]">
      <Navbar onOpenTrialModal={() => setIsBookingOpen(true)} />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F1E4C8] border border-[#B8863B]/20 text-[#B8863B] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Studio Journal</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#17140F] tracking-tight mb-4">
            Insights, Guides &amp; Studio Stories
          </h1>
          <p className="text-base text-[#4A4335] leading-relaxed">
            Discover tips from our instructors, health benefits of music and movement, and the latest happenings at 88 Keys Studio.
          </p>
        </div>

        {/* Blog Post Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="h-80 bg-[#F1E4C8]/50 animate-pulse border border-[#17140F]/10 rounded-sm" />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12 border border-[#17140F]/10 bg-[#F1E4C8]/30 rounded-sm">
            <p className="text-[#4A4335] text-sm">No blog posts found. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {blogs.map((post) => {
              const coverBg = post.heroImage || post.coverImage;
              return (
                <article
                  key={post.id}
                  className="group relative flex flex-col bg-[#F7F2E7] border border-[#17140F]/10 hover:border-[#B8863B]/40 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl rounded-sm"
                >
                  {/* Visual Cover */}
                  <div
                    className="w-full h-48 sm:h-64 rounded-sm mb-6 flex items-center justify-center text-white"
                    style={{
                      background: coverBg 
                        ? (coverBg.startsWith("linear-gradient") ? coverBg : `url(${coverBg}) center/cover no-repeat`)
                        : "linear-gradient(135deg, #17140F 0%, #B8863B 100%)",
                    }}
                  >
                    <span className="font-display text-2xl font-semibold tracking-wider opacity-20">88 KEYS</span>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs font-mono font-medium text-[#B8863B] mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </span>
                  </div>

                  {/* Content */}
                  <h2 className="font-display text-2xl font-semibold text-[#17140F] group-hover:text-[#B8863B] transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-[#4A4335] text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${getBlogSlug(post.title, post.id)}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#17140F] hover:text-[#B8863B] transition-colors group-hover:translate-x-1 duration-300"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
