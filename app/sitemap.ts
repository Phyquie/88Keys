import { MetadataRoute } from "next";
import { getBlogs } from "@/lib/db";
import { getBlogSlug } from "@/lib/blog-utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.88keys.in";

  // List of all static routes
  const staticPaths = [
    "",
    "/piano",
    "/guitar",
    "/bass",
    "/drums",
    "/dance",
    "/teachers",
    "/gallery",
    "/blogs",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  const staticUrls = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  // Fetch dynamic blog routes
  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getBlogs();
    blogUrls = blogs.map((post) => ({
      url: `${baseUrl}/blog/${getBlogSlug(post.title, post.id)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Sitemap generation error while fetching blogs:", error);
  }

  return [...staticUrls, ...blogUrls];
}
