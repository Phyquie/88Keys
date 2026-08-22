import React from "react";
import PianoClient from "./PianoClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Piano Lessons & Masterclasses | 88 Keys Music Studio",
  description:
    "Learn classical concert piano, jazz improvisation, keyboard, and ABRSM/Trinity exam prep from elite certified pianists. Schedule a consultation today!",
  keywords: ["Piano Lessons", "Classical Piano", "Jazz Piano", "Keyboard Classes", "ABRSM Prep"],
  alternates: {
    canonical: "/piano",
  },
};

export default function PianoPage() {
  return <PianoClient />;
}
