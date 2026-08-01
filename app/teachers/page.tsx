import React from "react";
import TeachersClient from "./TeachersClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet our World-Class Music Faculty | 88 Keys Music Academy",
  description:
    "Learn from certified music mentors and conservatory graduates specializing in Piano, Guitar, Drums, Bass, Vocals, and Dance. Meet the experts at 88 Keys!",
  keywords: ["Music Teachers", "Piano Instructor", "Guitar Teacher", "Drum Tutor", "Certified Music Faculty"],
};

export default function TeachersPage() {
  return <TeachersClient />;
}
