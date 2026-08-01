import React from "react";
import GalleryClient from "./GalleryClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rehearsal & Live Performance Media Gallery | 88 Keys Studio",
  description:
    "Explore photos and videos of our student concerts, studio practice rooms, acoustic grand pianos, and annual music showcases at 88 Keys.",
  keywords: ["Music Gallery", "Performance Photos", "Student Concerts", "Music Studio Rehearsal"],
};

export default function GalleryPage() {
  return <GalleryClient />;
}
