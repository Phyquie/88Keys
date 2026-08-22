import React from "react";
import DrumsClient from "./DrumsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acoustic & Electronic Drums Lessons | 88 Keys Music Studio",
  description:
    "Master rhythm, fills, tempo control, and 4-limb independence. Studio acoustic kit lessons and Rockschool certification prep. Book a consultation today!",
  keywords: ["Drum Lessons", "Acoustic Drum Kit", "Electronic Drums", "Rhythm Classes", "Rockschool Drums"],
  alternates: {
    canonical: "/drums",
  },
};

export default function DrumsPage() {
  return <DrumsClient />;
}
