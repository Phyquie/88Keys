import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service | 88 Keys Music Studio",
  description:
    "Official Terms of Service, enrollment policies, attendance guidelines, and code of conduct for 88 Keys Music Studio in Dehradun.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
