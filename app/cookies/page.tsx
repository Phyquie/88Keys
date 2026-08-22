import type { Metadata } from "next";
import CookiesClient from "./CookiesClient";

export const metadata: Metadata = {
  title: "Cookie Policy | 88 Keys Music Studio",
  description:
    "Learn about how 88 Keys Music Studio uses cookies and browser data to maintain a secure and functional music academy website.",
  alternates: {
    canonical: "/cookies",
  },
};

export default function CookiesPage() {
  return <CookiesClient />;
}
