"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Users,
  Clock,
  TrendingUp,
  Check,
  ChevronRight,
  Star,
  ArrowRight,
  GraduationCap,
  Globe,
  Quote,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import PianoKeys from "@/components/PianoKeys";
import { PianoIcon, GuitarIcon, DrumIcon, DanceIcon, SynthIcon, ElectricIcon } from "@/components/Icons";
import Link from "next/link";

// --- DATA TYPES ---
interface Program {
  id: string;
  name: string;
  category: string;
  icon: string;
  image: string;
  shortDesc: string;
  description: string;
  duration: string;
  skillLevel: string;
  highlights: string[];
  syllabus: string[];
  link?: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  course: string;
  image: string;
  stars: number;
  review: string;
}

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  tag: string;
}

// --- DATA ---
const PROGRAMS: Program[] = [
  {
    id: "piano",
    name: "Piano Mastery",
    category: "Keys",
    icon: "🎹",
    image: "https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Classical, Jazz & Contemporary techniques, sight-reading, and expressive mastery.",
    description:
      "Our Piano Mastery course takes you from fundamental finger posture and music reading to advanced improvisation, stage performance, and classical compositions. Taught on acoustic grand and digital upright pianos.",
    duration: "6 - 12 Months",
    skillLevel: "Beginner to Advanced",
    highlights: ["Acoustic Grand Piano practice", "Trinity & ABRSM Certification prep", "Sight-reading & Choral accompaniment"],
    syllabus: ["Posture & Scale Mechanics", "Sight-Reading & Music Theory", "Classical & Modern Repertoire", "Stage Dynamics & Concert prep"],
    link: "/piano",
  },
  {
    id: "guitar",
    name: "Acoustic & Electric Guitar",
    category: "Strings",
    icon: "🎸",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Fingerstyle, rhythm riffs, solos, chord progressions, and stage technique.",
    description:
      "Unleash your acoustic melody or rock electric solos! Master chords, strumming rhythms, lead improvisation, fingerpicking, and genre styles spanning Rock, Blues, Pop, and Jazz.",
    duration: "3 - 9 Months",
    skillLevel: "All Levels",
    highlights: ["Amp & Pedal FX mastery", "Band ensemble jamming", "Custom song arrangement"],
    syllabus: ["Open & Barre Chords", "Pentatonic & Blues Scales", "Strumming & Fingerstyle Patterns", "Soloing & Stage Improvisation"],
    link: "/guitar",
  },
  {
    id: "bass",
    name: "Bass Guitar Architecture",
    category: "Strings",
    icon: "🎸",
    image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Groove dynamics, rhythm locking, slap bass, and fundamental basslines.",
    description:
      "Become the heartbeat of any band. Learn groove locking, slap technique, walking basslines, and harmonic syncopation across Funk, Rock, R&B, and Modern Fusion.",
    duration: "3 - 6 Months",
    skillLevel: "Beginner to Pro",
    highlights: ["Slap & Pop techniques", "Rhythm section pairing with drums", "Recording studio bass tones"],
    syllabus: ["Finger & Plectrum Technique", "Groove & Metronome Timing", "Slap Bass Fundamentals", "Ensemble Harmony Integration"],
    link: "/bass",
  },
  {
    id: "drums",
    name: "Drums & Percussion",
    category: "Percussion",
    icon: "🥁",
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Rhythm rudiments, tempo precision, limb independence, and stage beats.",
    description:
      "Step behind full acoustic Roland and Yamaha drum kits. Develop rock-solid timing, four-limb independence, drum fills, dynamic control, and polyrhythms.",
    duration: "4 - 8 Months",
    skillLevel: "All Skill Levels",
    highlights: ["Full acoustic studio kits", "Live backing track jamming", "Rudiment speed drills"],
    syllabus: ["Stick Control & Grip Fundamentals", "4-Limb Independence", "Grooves Across Genres (Rock, Funk, Pop)", "Drum Fills & Stage Soloing"],
    link: "/drums",
  },
  {
    id: "keyboard",
    name: "Modern Keyboard & Synth",
    category: "Keys",
    icon: "🎼",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Synthesizer sound design, layering, midi production, and keyboard performance.",
    description:
      "Explore modern synthesizers, MIDI controllers, layer textures, ambient soundscapes, and digital audio workstation integration alongside classic keyboard technique.",
    duration: "3 - 6 Months",
    skillLevel: "Beginner to Advanced",
    highlights: ["Synth sound design", "DAW & MIDI integration", "Live band arrangement"],
    syllabus: ["Keyboard Layout & Chords", "Synthesis & Modulation Basics", "MIDI Sequencing & DAW Control", "Live Performance Rig Setup"],
    link: "/piano",
  },
  {
    id: "dance",
    name: "Dance & Movement",
    category: "Dance",
    icon: "💃",
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop",
    shortDesc: "Contemporary, Hip-Hop, Classical foundations, stamina, and stage choreography.",
    description:
      "Express music through dynamic physical movement. Our dance program covers Hip-Hop isolation, Contemporary fluid extensions, Jazz alignment, and stage presence.",
    duration: "3 - 12 Months",
    skillLevel: "All Ages & Levels",
    highlights: ["Mirrored dance studio with sprung floors", "Annual showcase stage performance", "Fitness & flexibility conditioning"],
    syllabus: ["Rhythm & Body Isolation", "Core Flexibility & Alignment", "Choreography Sequences", "Group Stage Performance"],
    link: "/dance",
  },
];

const WHY_CHOOSE_US = [
  {
    icon: GraduationCap,
    title: "Certified Teachers",
    description: "Learn from experienced and certified instructors passionate about music and personalized growth.",
  },
  {
    icon: Users,
    title: "Small Batch Learning",
    description: "Individual attention for every student in micro-groups of 3-5 to guarantee rapid skill progression.",
  },
  {
    icon: Star,
    title: "Performance Opportunities",
    description: "Participate in bi-annual live stage concerts, jams, and auditoriums to build audience confidence.",
  },
  {
    icon: Globe,
    title: "International Curriculum",
    description: "Industry-standard music education mapped to Trinity College London & Rockschool guidelines.",
  },
  {
    icon: Clock,
    title: "Flexible Timings",
    description: "Convenient weekend and weekday batches designed for students, working professionals, and kids.",
  },
  {
    icon: TrendingUp,
    title: "Beginner to Advanced",
    description: "Structured progressive learning paths carefully tailored for every age group and experience level.",
  },
];

const LEARNING_JOURNEY = [
  { step: "01", title: "Book a Trial", desc: "Reserve your complimentary 30-minute 1-on-1 evaluation session online or in studio." },
  { step: "02", title: "Meet Your Teacher", desc: "Get matched with a certified mentor whose teaching style aligns with your goals." },
  { step: "03", title: "Choose Your Course", desc: "Select a custom tailored schedule, curriculum intensity, and learning format." },
  { step: "04", title: "Practice Weekly", desc: "Enjoy weekly interactive studio sessions backed by guided video & sheet music materials." },
  { step: "05", title: "Perform Live", desc: "Showcase your musical talent live on stage at our seasonal concerts and jamming fests." },
  { step: "06", title: "Receive Certification", desc: "Earn official grade certification to validate your musical expertise globally." },
];

const GALLERY: GalleryItem[] = [
  { id: 1, title: "Grand Piano Concert Spotlight", category: "Performances", image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800&auto=format&fit=crop", tag: "Concert" },
  { id: 2, title: "Acoustic Guitar Masterclass", category: "Practice", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800&auto=format&fit=crop", tag: "Studio Jam" },
  { id: 3, title: "Contemporary Dance Rehearsal", category: "Dance", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop", tag: "Dance Studio" },
  { id: 4, title: "High-Energy Drum Session", category: "Practice", image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=800&auto=format&fit=crop", tag: "Drum Room" },
  { id: 5, title: "Annual Symphony Jam Band", category: "Performances", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop", tag: "Live Concert" },
  { id: 6, title: "Youth Music Competition Winners", category: "Competitions", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop", tag: "Awards" },
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Ananya Sharma",
    role: "Piano Student",
    course: "Piano Mastery (Grade 5)",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    stars: 5,
    review:
      "88 Keys completely transformed how I approach music. The teachers don't just teach notes; they teach emotion and expression. Performing on stage at the annual concert was a dream come true!",
  },
  {
    id: 2,
    name: "Rohan Kapoor",
    role: "Guitar Enthusiast",
    course: "Electric Guitar & Solos",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    stars: 5,
    review:
      "The small batch size meant my instructor gave me personalized feedback every single week. I went from struggling with basic chords to playing complex solos in 6 months!",
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Parent of Drum Student",
    course: "Kids Drum & Percussion",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    stars: 5,
    review:
      "My 10-year-old son looks forward to his drum classes every Saturday! The faculty is patient, inspiring, and the studio facilities are world-class.",
  },
  {
    id: 4,
    name: "David Chen",
    role: "Adult Learner",
    course: "Synth & Modern Keyboard",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    stars: 5,
    review:
      "As a software engineer learning music late in life, 88 Keys offered the perfect mix of structured theory and practical jamming. Highest quality academy in town!",
  },
];

const HERO_INSTRUMENTS = [
  { id: "piano", name: "Grand Piano", tag: "Acoustic Excellence", icon: "🎹", image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1200&auto=format&fit=crop" },
  { id: "guitar", name: "Acoustic Guitar", tag: "Fingerstyle Melodies", icon: "🎸", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=1200&auto=format&fit=crop" },
  { id: "electric", name: "Electric Guitar", tag: "Rock & Solo Riffs", icon: "⚡", image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?q=80&w=1200&auto=format&fit=crop" },
  { id: "drums", name: "Drum Set", tag: "Rhythm & Beats", icon: "🥁", image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=1200&auto=format&fit=crop" },
  { id: "keyboard", name: "Synthesizer Keyboard", tag: "Sound Design", icon: "🎼", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop" },
  { id: "dance", name: "Dance Movement", tag: "Expressive Choreography", icon: "💃", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop" },
];

export default function Home() {
  const [selectedHeroInstrument, setSelectedHeroInstrument] = useState(0);
  const [activeCourseTab, setActiveCourseTab] = useState("All");
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<GalleryItem | null>(null);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Auto rotate hero showcase
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedHeroInstrument((prev) => (prev + 1) % HERO_INSTRUMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Auto scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  // Filtered Programs
  const filteredPrograms =
    activeCourseTab === "All"
      ? PROGRAMS
      : PROGRAMS.filter((p) => p.category === activeCourseTab);

  const renderInstrumentIcon = (id: string, className = "w-6 h-6") => {
    switch (id) {
      case "piano":
        return <PianoIcon className={className} />;
      case "guitar":
      case "bass":
        return <GuitarIcon className={className} />;
      case "electric":
        return <ElectricIcon className={className} />;
      case "drums":
        return <DrumIcon className={className} />;
      case "keyboard":
      case "synth":
        return <SynthIcon className={className} />;
      case "dance":
        return <DanceIcon className={className} />;
      default:
        return <PianoIcon className={className} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F7F2E7] text-[#17140F] font-sans selection:bg-[#17140F] selection:text-[#F7F2E7]">
      {/* COMMON NAVIGATION BAR */}
      <Navbar onOpenTrialModal={() => setIsTrialModalOpen(true)} />

      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative pt-32 pb-0 md:pt-40 overflow-hidden bg-[#F7F2E7]"
      >
        <div className="absolute top-24 right-0 w-130 h-130 bg-[#B8863B]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-10 text-6xl text-[#17140F]/4 font-display select-none pointer-events-none animate-note-1">♪</div>
        <div className="absolute top-1/2 left-1/3 text-8xl text-[#B8863B]/6 font-display select-none pointer-events-none animate-note-2">♫</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Copy & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-7">
                <span className="w-6 h-px bg-[#B8863B]" />
                <span>Premier Music &amp; Dance Studio</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold text-[#17140F] tracking-tight leading-[1.1] mb-6">
                Where <span className="italic gradient-text-brass">passion</span> meets{" "}
                <span className="relative inline-block">
                  music.
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-3 text-[#B8863B]"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 15 Q 50 22 100 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-lg text-[#4A4335] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-9">
                Learn <span className="font-semibold text-[#17140F]">Piano, Guitar, Bass, Drums, Keyboard, Vocals &amp; Dance</span> from experienced professionals in a fun, inspiring environment.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <button
                  onClick={() => setIsTrialModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-[#17140F] text-[#F7F2E7] font-semibold rounded-sm hover:bg-[#B8863B] hover:text-[#17140F] transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Book Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#courses"
                  className="w-full sm:w-auto px-8 py-4 bg-transparent text-[#17140F] font-semibold rounded-sm border border-[#17140F]/25 hover:border-[#17140F] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Explore Courses</span>
                  <ChevronRight className="w-4 h-4 text-[#4A4335]" />
                </a>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-5 sm:gap-6 text-[#4A4335] text-xs font-mono uppercase tracking-wide border-t border-[#17140F]/10 pt-6">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#B8863B]" />
                  <span>No Experience Required</span>
                </div>
                <div className="w-px h-3 bg-[#17140F]/15 hidden sm:block" />
                <div className="hidden sm:flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#B8863B]" />
                  <span>Instrument Provided</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Visual Composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative overflow-hidden border-4 border-[#17140F] bg-[#17140F] group">
                  <img
                    src={HERO_INSTRUMENTS[selectedHeroInstrument].image}
                    alt={HERO_INSTRUMENTS[selectedHeroInstrument].name}
                    className="w-full h-105 sm:h-120 object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#17140F]/90 via-[#17140F]/20 to-transparent" />

                  <div className="absolute top-4 right-4 bg-[#17140F]/60 backdrop-blur-md border border-[#F7F2E7]/20 text-[#F7F2E7] text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8863B] animate-pulse" />
                    <span>{HERO_INSTRUMENTS[selectedHeroInstrument].tag}</span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-[#F7F2E7]">
                    <div className="flex items-center gap-2.5 mb-1">
                      <div className="w-9 h-9 bg-[#F7F2E7]/15 backdrop-blur-md flex items-center justify-center text-[#F7F2E7]">
                        {renderInstrumentIcon(HERO_INSTRUMENTS[selectedHeroInstrument].id, "w-5 h-5")}
                      </div>
                      <h3 className="font-display text-2xl font-semibold tracking-tight">
                        {HERO_INSTRUMENTS[selectedHeroInstrument].name}
                      </h3>
                    </div>
                    <p className="text-xs text-[#B3A98F] font-mono">
                      1-ON-1 &amp; GROUP MENTORSHIP AT 88 KEYS STUDIO
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-1 flex-wrap font-mono text-[10px] uppercase tracking-wide">
                  {HERO_INSTRUMENTS.map((inst, idx) => (
                    <button
                      key={inst.id}
                      onClick={() => setSelectedHeroInstrument(idx)}
                      className={`px-3 py-2 border-b-2 transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                        selectedHeroInstrument === idx
                          ? "border-[#B8863B] text-[#17140F]"
                          : "border-transparent text-[#4A4335]/50 hover:text-[#4A4335]"
                      }`}
                    >
                      {renderInstrumentIcon(inst.id, "w-3.5 h-3.5")}
                      <span className="hidden sm:inline">{inst.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <PianoKeys variant="light" keyCount={36} className="h-9" />
      </section>

      {/* WHY CHOOSE US */}
      <section id="why-us" className="py-24 md:py-32 bg-[#EEE5D3] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
              <span className="w-6 h-px bg-[#B8863B]" />
              The 88 Keys Advantage
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-4">
              Why Students &amp; Parents Choose Us
            </h2>
            <p className="text-[#4A4335] text-base sm:text-lg">
              We combine world-class pedagogy, modern acoustic infrastructure, and a passion for artistic expression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#17140F]/12">
            {WHY_CHOOSE_US.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className="group relative p-8 border-r border-b border-[#17140F]/12 hover:bg-[#17140F] transition-colors duration-300"
                >
                  <div className="flex items-start justify-between mb-10">
                    <span className="font-mono text-xs text-[#B8863B]">{String(idx + 1).padStart(2, "0")}</span>
                    <IconComp className="w-5 h-5 text-[#17140F]/35 group-hover:text-[#B8863B] transition-colors duration-300" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#17140F] group-hover:text-[#F7F2E7] mb-3 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#4A4335] group-hover:text-[#B3A98F] leading-relaxed transition-colors duration-300">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* OUR MUSIC PROGRAMS */}
      <section id="courses" className="py-24 md:py-32 bg-[#F7F2E7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
                <span className="w-6 h-px bg-[#B8863B]" />
                Curriculum Excellence
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight">
                Our Music &amp; Dance Programs
              </h2>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar font-mono text-xs uppercase tracking-wider">
              {["All", "Keys", "Strings", "Percussion", "Dance"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCourseTab(cat)}
                  className={`px-4 py-2 border transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeCourseTab === cat
                      ? "bg-[#17140F] text-[#F7F2E7] border-[#17140F]"
                      : "bg-transparent text-[#4A4335] border-[#17140F]/15 hover:border-[#17140F]/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#17140F]/12 border border-[#17140F]/12">
            {filteredPrograms.map((program, idx) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#F7F2E7] flex flex-col group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.name}
                    className="w-full h-full object-cover grayscale-35 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#17140F]/85 via-[#17140F]/10 to-transparent" />
                  <div className="absolute top-4 left-4 w-9 h-9 bg-[#F7F2E7] flex items-center justify-center text-[#17140F]">
                    {renderInstrumentIcon(program.id, "w-5 h-5")}
                  </div>
                  <span className="absolute top-4 right-4 bg-[#17140F]/50 backdrop-blur-sm border border-[#F7F2E7]/20 text-[#F7F2E7] text-[10px] font-mono uppercase tracking-wide px-2.5 py-1">
                    {program.skillLevel}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 text-[#F7F2E7]">
                    <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#B8863B]">
                      {program.category}
                    </span>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-[#F7F2E7]">{program.name}</h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between border-t border-[#17140F]/10">
                  <div>
                    <p className="text-sm text-[#4A4335] leading-relaxed mb-6">
                      {program.shortDesc}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] font-mono text-[#4A4335] uppercase tracking-wide mb-6">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#B8863B]" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="h-3 w-px bg-[#17140F]/15" />
                      <div className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#B8863B]" />
                        <span>Certified Grade</span>
                      </div>
                    </div>
                  </div>

                  {program.link ? (
                    <Link
                      href={program.link}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#17140F] group/btn w-fit cursor-pointer"
                    >
                      <span className="border-b-2 border-[#B8863B] pb-0.5">Explore Program</span>
                      <ChevronRight className="w-4 h-4 text-[#B8863B] group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => setIsTrialModalOpen(true)}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#17140F] group/btn w-fit cursor-pointer"
                    >
                      <span className="border-b-2 border-[#B8863B] pb-0.5">Book Trial</span>
                      <ChevronRight className="w-4 h-4 text-[#B8863B] group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* WHY STUDENTS LOVE 88 KEYS                          */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#EEE5D3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="overflow-hidden border-4 border-[#17140F]">
                  <img
                    src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop"
                    alt="88 Keys Studio Jam"
                    className="w-full h-95 sm:h-110 object-cover grayscale-15"
                  />
                </div>

                <div className="absolute top-8 -left-6 glass-card p-4 shadow-xl border border-[#17140F]/10 max-w-xs hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F1E4C8] flex items-center justify-center text-[#B8863B] shrink-0">
                    <Star className="w-5 h-5 fill-[#B8863B] text-[#B8863B]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#17140F]">Rated 4.9/5 by 500+ Students</p>
                    <p className="text-[10px] text-[#4A4335] font-mono uppercase tracking-wide">Google &amp; Trustpilot</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6"
            >
              <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
                <span className="w-6 h-px bg-[#B8863B]" />
                The Student Experience
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-6">
                Why Students Love 88 Keys Studio
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  "Personalized Learning",
                  "Modern Music Studios",
                  "Friendly Environment",
                  "Practical Sessions",
                  "Stage Performances",
                  "Expert Mentorship",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-3.5 border border-[#17140F]/12 bg-[#F7F2E7] hover:border-[#B8863B]/50 transition-colors"
                  >
                    <div className="w-7 h-7 bg-[#17140F] text-[#F7F2E7] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-3" />
                    </div>
                    <span className="font-bold text-[#17140F] text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsTrialModalOpen(true)}
                className="px-8 py-3.5 bg-[#17140F] text-[#F7F2E7] font-semibold text-sm rounded-sm hover:bg-[#B8863B] hover:text-[#17140F] transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Experience It Yourself — Book Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* OUR LEARNING JOURNEY — styled as alternating keys  */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#F7F2E7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
              <span className="w-6 h-px bg-[#B8863B]" />
              Step-by-Step Pathway
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight">
              Our Learning Journey
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-[#17140F]">
            {LEARNING_JOURNEY.map((step, idx) => {
              const isKey = idx % 2 === 1;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`relative p-6 min-h-52.5 flex flex-col justify-between border-r border-b lg:border-b-0 border-[#17140F]/15 last:border-r-0 transition-colors duration-300 group ${
                    isKey ? "bg-[#17140F] text-[#F7F2E7]" : "bg-[#F7F2E7] text-[#17140F]"
                  } hover:bg-[#B8863B] hover:text-[#17140F]`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
                    Key {step.step}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs leading-relaxed opacity-70">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* WHAT OUR STUDENTS SAY                              */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#EEE5D3] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-10">
            <span className="w-6 h-px bg-[#B8863B]" />
            What Our Students Say
            <span className="w-6 h-px bg-[#B8863B]" />
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonialIdx}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45 }}
            >
              <Quote className="w-9 h-9 text-[#B8863B]/40 mx-auto mb-6" />
              <p className="font-display text-2xl sm:text-3xl md:text-[2.25rem] text-[#17140F] leading-snug italic mb-8 max-w-3xl mx-auto">
                “{TESTIMONIALS[activeTestimonialIdx].review}”
              </p>
              <div className="flex items-center justify-center gap-1 mb-5">
                {Array.from({ length: TESTIMONIALS[activeTestimonialIdx].stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#B8863B] text-[#B8863B]" />
                ))}
              </div>
              <div className="flex items-center justify-center gap-3">
                <img
                  src={TESTIMONIALS[activeTestimonialIdx].image}
                  alt={TESTIMONIALS[activeTestimonialIdx].name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#17140F]/10 grayscale"
                />
                <div className="text-left">
                  <p className="font-bold text-sm text-[#17140F]">{TESTIMONIALS[activeTestimonialIdx].name}</p>
                  <p className="text-[10px] font-mono text-[#4A4335] uppercase tracking-wide">
                    {TESTIMONIALS[activeTestimonialIdx].course}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-2 mt-12">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setActiveTestimonialIdx(idx)}
                aria-label={`Show testimonial from ${t.name}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeTestimonialIdx ? "w-8 bg-[#17140F]" : "w-1.5 bg-[#17140F]/20 hover:bg-[#17140F]/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* GALLERY PREVIEW                                    */}
      {/* -------------------------------------------------- */}
      <section id="gallery" className="py-24 md:py-32 bg-[#F7F2E7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
                <span className="w-6 h-px bg-[#B8863B]" />
                Life at 88 Keys
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight">
                Gallery &amp; Concert Moments
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#17140F]/12 border border-[#17140F]/12">
            {GALLERY.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setSelectedGalleryImg(item)}
                className="relative h-72 overflow-hidden group cursor-pointer bg-[#17140F]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale-45 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#17140F]/85 via-[#17140F]/10 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                <span className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest text-[#B8863B] border border-[#B8863B]/40 px-2.5 py-1">
                  {item.tag}
                </span>
                <div className="absolute bottom-4 left-4 right-4 text-[#F7F2E7]">
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
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
                Start Your Musical Journey Today
              </h2>

              <p className="text-[#B3A98F] text-base sm:text-lg mb-9 leading-relaxed">
                Book your FREE trial class and experience professional music education.
              </p>

              <button
                onClick={() => setIsTrialModalOpen(true)}
                className="px-10 py-4.5 bg-[#B8863B] text-[#17140F] font-bold text-sm uppercase tracking-wide hover:bg-[#F7F2E7] transition-all duration-300 inline-flex items-center gap-3 cursor-pointer"
              >
                <span>Book Free Trial</span>
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
        {selectedGalleryImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGalleryImg(null)}
              className="absolute inset-0 bg-[#17140F]/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-3xl w-full bg-[#17140F] overflow-hidden shadow-2xl z-10 border border-[#F7F2E7]/10"
            >
              <button
                onClick={() => setSelectedGalleryImg(null)}
                className="absolute top-4 right-4 p-2 text-[#F7F2E7]/80 hover:text-[#F7F2E7] bg-[#17140F]/60 z-20 cursor-pointer"
              >
                ✕
              </button>
              <img
                src={selectedGalleryImg.image}
                alt={selectedGalleryImg.title}
                className="w-full h-96 sm:h-120 object-cover"
              />
              <div className="p-6 text-[#F7F2E7]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8863B] border border-[#B8863B]/40 px-2.5 py-1">
                  {selectedGalleryImg.tag}
                </span>
                <h3 className="font-display text-xl font-semibold mt-3">{selectedGalleryImg.title}</h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
