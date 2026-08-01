import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogById } from "@/lib/db";
import { extractIdFromSlug } from "@/lib/blog-utils";
import BlogDetailClient from "./BlogDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
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

  return {
    title: `${blog.title} | 88 Keys Music Journal`,
    description: blog.excerpt || blog.content.substring(0, 150),
    openGraph: {
      title: `${blog.title} | 88 Keys Music Journal`,
      description: blog.excerpt || blog.content.substring(0, 150),
      images: [
        {
          url: blog.heroImage || blog.coverImage || "/default-blog.jpg",
          width: 800,
          height: 600,
        },
      ],
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

  // Next.js App Router: we must plain-serialize database output if passing to Client Components.
  // getBlogById already returns a serialized BlogPost plain object.
  return <BlogDetailClient blog={blog} />;
}
