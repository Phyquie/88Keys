import React from "react";
import BassClient from "./BassClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electric Bass Guitar Groove Classes | 88 Keys Music Studio",
  description:
    "Master slap bass, funk grooves, walking basslines, and lock timing with drums alongside professional session bassists. Book your consultation today!",
  keywords: ["Bass Guitar Lessons", "Slap Bass", "Funk Bass", "Groove Bass", "Session Bass Classes"],
};

export default function BassPage() {
  return <BassClient />;
}
