import React from "react";
import { getBlogById } from "@/lib/db";
import { extractIdFromSlug } from "@/lib/blog-utils";
import BlogDetailClient from "./BlogDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.88keys.in";

interface Props {
  params: Promise<{ slug: string }>;
}

function cleanDescription(text: string, maxLen = 155): string {
  if (!text) {
    return "Explore tutorials, performance insights, and stories from certified instructors at 88 Keys Music Studio in Dehradun.";
  }
  const clean = text.replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " ").trim();
  if (clean.length <= maxLen) return clean;
  const truncated = clean.substring(0, maxLen);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 100 ? truncated.substring(0, lastSpace) : truncated).trim() + "...";
}

function formatTitle(rawTitle: string): string {
  const suffix = " | 88 Keys";
  if (rawTitle.length + suffix.length <= 60) {
    return `${rawTitle}${suffix}`;
  }
  // If raw title is already near 60 characters, keep it concise
  if (rawTitle.length <= 60) {
    return rawTitle;
  }
  return `${rawTitle.substring(0, 57)}...`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);
  const blog = await getBlogById(id);

  if (!blog) {
    return {
      title: "Journal Not Found | 88 Keys Music Studio",
      description: "This blog post or journal entry could not be found.",
    };
  }

  const pageTitle = formatTitle(blog.title);
  const pageDescription = cleanDescription(blog.excerpt || blog.content);
  const pageUrl = `${siteUrl}/blog/${slug}`;
  const blogImage = blog.heroImage || blog.coverImage || `${siteUrl}/default-blog.jpg`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      blog.title,
      blog.author || "88 Keys Faculty",
      "88 Keys Music Studio",
      "Music Journal Dehradun",
      "Dance Classes Dehradun",
      "Music Lessons Purkul Road",
      "88 Keys Academy",
      "Piano Guitar Drums Dance",
    ],
    authors: [{ name: blog.author || "88 Keys Faculty", url: siteUrl }],
    creator: blog.author || "88 Keys Music Studio",
    publisher: "88 Keys Music Studio",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "article",
      locale: "en_IN",
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: "88 Keys Music Studio",
      publishedTime: blog.date,
      authors: [blog.author || "88 Keys Music Studio"],
      images: [
        {
          url: blogImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [blogImage],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  const pageUrl = `${siteUrl}/blog/${slug}`;
  const blogImage = blog.heroImage || blog.coverImage || `${siteUrl}/default-blog.jpg`;
  const pageDescription = cleanDescription(blog.excerpt || blog.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: pageDescription,
    image: [blogImage],
    datePublished: blog.date,
    dateModified: blog.date,
    author: {
      "@type": "Person",
      name: blog.author || "88 Keys Faculty",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "88 Keys Music Studio",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailClient blog={blog} />
    </>
  );
}
