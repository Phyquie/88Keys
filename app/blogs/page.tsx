import React from "react";
import BlogsClient from "./BlogsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "88 Keys Music Journal | Music Education & Art Articles",
  description:
    "Explore educational guides, expert parent tips, exam prep worksheets, and musical insights from our studio mentors at 88 Keys Music Journal.",
  keywords: ["Music Blog", "Music Education Articles", "Parent Guide Music", "88 Keys Journal"],
};

export default function BlogsPage() {
  return <BlogsClient />;
}
