import React from "react";
import GuitarClient from "./GuitarClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acoustic & Electric Guitar Classes | 88 Keys Music Studio",
  description:
    "Learn acoustic fingerstyle, electric rock solos, blues chords, and songwriting with professional certified educators. Book a consultation or enquiry today!",
  keywords: ["Guitar Lessons", "Acoustic Guitar", "Electric Guitar", "Fingerstyle Guitar", "Rockschool Prep"],
  alternates: {
    canonical: "/guitar",
  },
};

export default function GuitarPage() {
  return <GuitarClient />;
}
