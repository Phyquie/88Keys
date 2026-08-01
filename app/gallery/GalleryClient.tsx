"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import PianoKeys from "@/components/PianoKeys";
import { PianoIcon, GuitarIcon, DrumIcon, DanceIcon } from "@/components/Icons";

// --- DATA ---
interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  department: string;
  image: string;
}

const GALLERY: GalleryItem[] = [
  { id: "piano-1", title: "Student Playing Yamaha Grand Piano", tag: "Concert", department: "Piano", image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800&auto=format&fit=crop" },
  { id: "piano-2", title: "1-on-1 Instructor Mentorship Session", tag: "Studio", department: "Piano", image: "https://images.unsplash.com/photo-1525994886773-080587e161c2?q=80&w=800&auto=format&fit=crop" },
  { id: "piano-3", title: "Young Piano Prodigy Practice", tag: "Kids Class", department: "Piano", image: "https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=800&auto=format&fit=crop" },
  { id: "piano-4", title: "Annual Piano Recital Auditorium", tag: "Stage Performance", department: "Piano", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop" },
  { id: "piano-5", title: "Trinity Grade Exam Preparation", tag: "Examination", department: "Piano", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop" },
  { id: "piano-6", title: "Adult Piano Masterclass Session", tag: "Workshop", department: "Piano", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop" },
  { id: "guitar-1", title: "Acoustic Fingerstyle Masterclass", tag: "Studio Jam", department: "Guitar", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800&auto=format&fit=crop" },
  { id: "guitar-2", title: "Electric Guitar Amp & Pedal FX Setup", tag: "Tone Lab", department: "Guitar", image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?q=80&w=800&auto=format&fit=crop" },
  { id: "guitar-3", title: "Youth Band Stage Rehearsal", tag: "Live Concert", department: "Guitar", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop" },
  { id: "guitar-4", title: "Rockschool Grade Exam Prep", tag: "Certification", department: "Guitar", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop" },
  { id: "bass-1", title: "Slap Bass Studio Recording Session", tag: "Studio Jam", department: "Bass", image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?q=80&w=800&auto=format&fit=crop" },
  { id: "bass-2", title: "Band Rehearsal Drum & Bass Locking", tag: "Ensemble", department: "Bass", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop" },
  { id: "bass-3", title: "Fender Bass Tone & Amp Setup", tag: "Gear", department: "Bass", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop" },
  { id: "bass-4", title: "Rockschool Bass Grade Examination", tag: "Certification", department: "Bass", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop" },
  { id: "drums-1", title: "Yamaha Acoustic Drumkit Session", tag: "Drum Room", department: "Drums", image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=800&auto=format&fit=crop" },
  { id: "drums-2", title: "Young Drum Prodigy Rudiments", tag: "Kids Class", department: "Drums", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop" },
  { id: "drums-3", title: "Live Concert Stage Drum Performance", tag: "Stage Spotlight", department: "Drums", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop" },
  { id: "drums-4", title: "Rockschool Drum Grade Exam Prep", tag: "Certification", department: "Drums", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop" },
  { id: "dance-1", title: "Contemporary Dance Rehearsal", tag: "Studio", department: "Dance", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop" },
  { id: "dance-2", title: "Urban Hip-Hop Crew Choreography", tag: "Hip-Hop", department: "Dance", image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop" },
  { id: "dance-3", title: "Youth Dance Recital Showcase", tag: "Kids Showcase", department: "Dance", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop" },
  { id: "dance-4", title: "Stage Lighting Performance", tag: "Auditorium", department: "Dance", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop" },
];

const DEPARTMENTS = ["All", "Piano", "Guitar", "Bass", "Drums", "Dance"];

export default function GalleryClient() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [activeDept, setActiveDept] = useState("All");
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const data = await res.json();
          setGallery(data);
        } else {
          setGallery(GALLERY);
        }
      } catch (err) {
        console.error("Failed to load gallery items:", err);
        setGallery(GALLERY);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  const filteredGallery =
    activeDept === "All" ? gallery : gallery.filter((item) => item.department === activeDept);

  const renderDeptIcon = (dept: string, className = "w-5 h-5") => {
    switch (dept) {
      case "Piano":
        return <PianoIcon className={className} />;
      case "Guitar":
      case "Bass":
        return <GuitarIcon className={className} />;
      case "Drums":
        return <DrumIcon className={className} />;
      case "Dance":
        return <DanceIcon className={className} />;
      default:
        return <Camera className={className} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F7F2E7] text-[#17140F] font-sans selection:bg-[#17140F] selection:text-[#F7F2E7]">
      {/* -------------------------------------------------- */}
      {/* COMMON HEADER / NAVBAR                              */}
      {/* -------------------------------------------------- */}
      <Navbar onOpenTrialModal={() => setIsTrialModalOpen(true)} />

      {/* -------------------------------------------------- */}
      {/* HERO SECTION                                       */}
      {/* -------------------------------------------------- */}
      <section className="relative pt-32 pb-0 md:pt-40 overflow-hidden bg-[#F7F2E7]">
        <div className="absolute top-24 right-0 w-130 h-130 bg-[#B8863B]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-10 text-6xl text-[#17140F]/4 font-display select-none pointer-events-none animate-note-1">♪</div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20 md:pb-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-7">
              <span className="w-6 h-px bg-[#B8863B]" />
              Life at 88 Keys
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold text-[#17140F] tracking-tight leading-[1.1] mb-6">
              Our <span className="italic gradient-text-brass">Gallery</span> &amp; Concert Moments
            </h1>

            <p className="text-lg text-[#4A4335] font-normal leading-relaxed max-w-2xl mx-auto">
              A look inside our studios, recitals, and student showcases across Piano, Guitar, Bass, Drums, and Dance.
            </p>
          </motion.div>
        </div>

        <PianoKeys variant="light" keyCount={36} className="h-9" />
      </section>

      {/* -------------------------------------------------- */}
      {/* FILTERABLE GALLERY GRID                            */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#EEE5D3] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-1 mb-14 font-mono text-xs uppercase tracking-wider overflow-x-auto no-scrollbar">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-4 py-2 border transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2 justify-center ${
                  activeDept === dept
                    ? "bg-[#17140F] text-[#F7F2E7] border-[#17140F]"
                    : "bg-transparent text-[#4A4335] border-[#17140F]/15 hover:border-[#17140F]/40"
                }`}
              >
                {dept !== "All" && renderDeptIcon(dept, "w-3.5 h-3.5")}
                <span>{dept}</span>
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#17140F]/12 border border-[#17140F]/12"
          >
            <AnimatePresence>
              {loading ? (
                Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="h-72 bg-[#F1E4C8]/50 animate-pulse" />
                ))
              ) : filteredGallery.length === 0 ? (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-16">
                  <p className="text-[#4A4335] text-sm">No media found matching this category.</p>
                </div>
              ) : (
                filteredGallery.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.04 }}
                    onClick={() => setSelectedImg(item)}
                    className="relative h-72 overflow-hidden group cursor-pointer bg-[#17140F]"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale-45 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#17140F]/85 via-[#17140F]/10 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8863B] border border-[#B8863B]/40 px-2.5 py-1">
                        {item.tag}
                      </span>
                      <span className="w-7 h-7 bg-[#F7F2E7]/10 backdrop-blur-md flex items-center justify-center text-[#F7F2E7]">
                        {renderDeptIcon(item.department, "w-3.5 h-3.5")}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-[#F7F2E7]">
                      <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* BOOK A FREE TRIAL CTA SECTION                      */}
      {/* -------------------------------------------------- */}
      <section className="pt-24 md:pt-32 bg-[#F7F2E7] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#17140F] text-[#F7F2E7] overflow-hidden">
            <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-7">
                <span className="w-6 h-px bg-[#B8863B]" />
                Zero Commitment Required
                <span className="w-6 h-px bg-[#B8863B]" />
              </span>

              <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight mb-6 leading-tight">
                Ready to Create Your Own Moments?
              </h2>

              <p className="text-[#B3A98F] text-base sm:text-lg mb-9 leading-relaxed">
                Book your consultation or submit an enquiry and become part of the next 88 Keys showcase.
              </p>

              <button
                onClick={() => setIsTrialModalOpen(true)}
                className="px-10 py-4.5 bg-[#B8863B] text-[#17140F] font-bold text-sm uppercase tracking-wide hover:bg-[#F7F2E7] transition-all duration-300 inline-flex items-center gap-3 cursor-pointer"
              >
                <span>Book Consult / Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <PianoKeys variant="dark" keyCount={48} className="h-8 relative z-10" />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* COMMON FOOTER                                      */}
      {/* -------------------------------------------------- */}
      <Footer />

      {/* -------------------------------------------------- */}
      {/* FREE TRIAL BOOKING MODAL                           */}
      {/* -------------------------------------------------- */}
      <BookingModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        defaultCourse="Piano Mastery"
      />

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="absolute inset-0 bg-[#17140F]/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-3xl w-full bg-[#17140F] overflow-hidden shadow-2xl z-10 border border-[#F7F2E7]/10"
            >
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 p-2 text-[#F7F2E7]/80 hover:text-[#F7F2E7] bg-[#17140F]/60 z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedImg.image}
                alt={selectedImg.title}
                className="w-full h-96 sm:h-120 object-cover"
              />
              <div className="p-6 text-[#F7F2E7]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8863B] border border-[#B8863B]/40 px-2.5 py-1">
                  {selectedImg.tag}
                </span>
                <h3 className="font-display text-xl font-semibold mt-3">{selectedImg.title}</h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
