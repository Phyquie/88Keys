import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | 88 Keys Music Studio",
  description:
    "Review the official Privacy Policy of 88 Keys Music Studio in Dehradun. Learn how we safeguard student, parent, and visitor data.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
