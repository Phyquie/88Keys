import React from "react";
import ContactClient from "./ContactClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Consultation or Make an Enquiry | 88 Keys Music Studio",
  description:
    "Have questions about lessons, schedules, fees, or certifications? Get in touch with our team or schedule a studio visit. We reply within one business day.",
  keywords: ["Contact Music Studio", "Book Consultation", "Enquire Music Lessons", "Studio Location"],
};

export default function ContactPage() {
  return <ContactClient />;
}
