import React from "react";
import DanceClient from "./DanceClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contemporary & Hip-Hop Dance Studio | 88 Keys Music Studio",
  description:
    "Join our contemporary fusion, hip-hop, street dance, and kids choreographic classes. State-of-the-art dance floor and annual recitals. Register today!",
  keywords: ["Dance Classes", "Contemporary Dance", "Hip Hop Dance", "Dance Studio", "Choreography Lessons"],
  alternates: {
    canonical: "/dance",
  },
};

export default function DancePage() {
  return <DanceClient />;
}
