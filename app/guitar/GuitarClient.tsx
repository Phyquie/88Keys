"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Download,
  CheckCircle2,
  ChevronDown,
  Star,
  Clock,
  Award,
  BookOpen,
  Smile,
  PhoneCall,
  ChevronRight,
  X,
  Check,
  Quote,
  Flame,
  Volume2,
  GraduationCap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import PianoKeys from "@/components/PianoKeys";
import { PianoIcon, GuitarIcon, DrumIcon, DanceIcon } from "@/components/Icons";
import Link from "next/link";

// --- DATA ---
const WHY_LEARN_GUITAR = [
  {
    icon: Flame,
    title: "Develop Finger Dexterity",
    description: "Master fretting hand strength, finger independence, barre chord mechanics, and lightning-fast solos.",
  },
  {
    icon: Volume2,
    title: "Rhythm & Strumming Groove",
    description: "Learn syncopated strumming patterns, palm muting, metronome timing, and acoustic groove locking.",
  },
  {
    icon: Sparkles,
    title: "Songwriting & Chords",
    description: "Understand chord progressions, CAGED system, pentatonic scales, and key harmonization for songwriting.",
  },
  {
    icon: BookOpen,
    title: "Learn Music Notation & Tabs",
    description: "Master guitar TABs, sheet music reading, chord charts, and lead sheet navigation effortlessly.",
  },
  {
    icon: Award,
    title: "Band & Ensemble Jamming",
    description: "Gain confidence playing alongside drummers, bassists, key players, and vocalists in studio sessions.",
  },
  {
    icon: Smile,
    title: "Portable & Life-Long Hobby",
    description: "Take your music anywhere—from campfire acoustic jams to electric stage concerts.",
  },
];

const WHO_CAN_JOIN = [
  { title: "Kids (6+ Years)", desc: "1/2 and 3/4 scale guitars, easy chord fingerings, and fun melody songs." },
  { title: "Teenagers", desc: "Electric guitar rock solos, acoustic fingerstyle, pop hits, and band formation." },
  { title: "Adults & Working Pros", desc: "Flexible morning and evening slots. Relaxing acoustic playing or rock riffs." },
  { title: "Beginners", desc: "No experience needed! Learn how to tune, hold a pick, and play your first song in Week 1." },
  { title: "Intermediate Players", desc: "Unlock barre chords, soloing over backing tracks, blues bends, and music theory." },
  { title: "Advanced Lead Guitarists", desc: "Speed picking, sweep picking, modal soloing, amp tone design, and Trinity exam prep." },
];

const COURSE_LEVELS = [
  {
    level: "Beginner",
    duration: "3–6 Months",
    desc: "Build rock-solid guitar fundamentals from tuning to basic strumming.",
    features: [
      "Guitar anatomy, tuning & holding picks",
      "Open major & minor chords (A, E, D, C, G)",
      "Basic strumming patterns & timing",
      "Reading Guitar TABs & chord charts",
      "Playing 10+ popular songs",
    ],
    recommendedFor: "Ages 6+ with zero guitar experience",
  },
  {
    level: "Intermediate",
    duration: "6–9 Months",
    desc: "Unlock the fretboard, barre chords, and expressive lead soloing.",
    features: [
      "Full F & B barre chord mastery",
      "Minor & Major Pentatonic scales",
      "Fingerpicking & arpeggios",
      "Blues string bending, slides & vibrato",
      "Rhythm guitar in Rock, Pop & Blues",
    ],
    recommendedFor: "Players with 6+ months experience",
    popular: true,
  },
  {
    level: "Advanced Lead",
    duration: "9–12+ Months",
    desc: "Master improvisational soloing, speed technique, and stage performance.",
    features: [
      "Modes of the Major Scale (Ionian, Dorian, etc.)",
      "Sweep picking, legato & alternate picking",
      "Amp pedalboard sound FX engineering",
      "Improvising over complex chord changes",
      "Rockschool & Trinity Grade 8 prep",
    ],
    recommendedFor: "Lead guitarists & exam candidates",
  },
];

const WHAT_YOU_WILL_LEARN = [
  { step: "01", title: "Guitar Tuning & Setup", desc: "Tuning mechanics, pick selection, and posture." },
  { step: "02", title: "Open Chord Vocabulary", desc: "Mastering A, E, D, C, G, Am, Em, Dm chords." },
  { step: "03", title: "Strumming & Rhythm", desc: "Metronome timing, 4/4 and 3/4 rhythm patterns." },
  { step: "04", title: "Reading TABs & Notation", desc: "Navigating frets, strings, and lead TAB sheets." },
  { step: "05", title: "Fingerstyle Technique", desc: "Acoustic fingerpicking patterns and arpeggios." },
  { step: "06", title: "Barre Chords & Fretboard", desc: "Moving shape chords up and down the neck." },
  { step: "07", title: "Lead Soloing Techniques", desc: "Pentatonic scales, string bends, slides, and vibrato." },
  { step: "08", title: "Stage Performance", desc: "Tone dial-in, amp pedalboards, and band jamming." },
];

const CURRICULUM_MODULES = [
  {
    module: "Module 1",
    title: "Guitar Orientation & Tuning Mechanics",
    topics: [
      "Acoustic vs. Electric guitar ergonomics",
      "Standard E-A-D-G-B-E tuning with digital tuners",
      "Plectrum grip styles and right-hand resting technique",
      "Clean finger placement on frets without buzzing",
    ],
  },
  {
    module: "Module 2",
    title: "Open Chords & Smooth Transitions",
    topics: [
      "Essential open major chords (C, G, D, E, A)",
      "Essential minor chords (Am, Em, Dm)",
      "Anchor finger technique for fast chord changes",
      "Simple 4-beat strumming patterns",
    ],
  },
  {
    module: "Module 3",
    title: "Rhythm Guitar & Metronome Timing",
    topics: [
      "Quarter, 8th, and 16th note strumming drills",
      "Palm muting and percussive slap strumming",
      "Syncopated rhythms and accenting beats",
      "Playing alongside backing tracks at various TEMPOs",
    ],
  },
  {
    module: "Module 4",
    title: "Fingerstyle Acoustic Guitar",
    topics: [
      "P-I-M-A fingerpicking mechanics (Thumb, Index, Middle, Ring)",
      "Travis picking and folk pattern grooves",
      "Arpeggiating chords across 6 strings",
      "Acoustic balladeering and vocal accompaniment",
    ],
  },
  {
    module: "Module 5",
    title: "Barre Chords & CAGED Fretboard System",
    topics: [
      "E-shape and A-shape barre chords across the neck",
      "Minor barre chords and 7th dominant shapes",
      "Understanding the CAGED fretboard map",
      "Eliminating hand strain during long barre holds",
    ],
  },
  {
    module: "Module 6",
    title: "Lead Guitar & Pentatonic Soloing",
    topics: [
      "Minor Pentatonic Box 1 through 5",
      "Expressive techniques: Bends, Slides, Hammer-ons & Pull-offs",
      "Vibrato control and tone sustain",
      "12-Bar Blues soloing over backing tracks",
    ],
  },
  {
    module: "Module 7",
    title: "Electric Guitar Tone & Pedal FX",
    topics: [
      "Amp equalizer dialing (Bass, Middle, Treble, Gain)",
      "Overdrive, Distortion, Delay & Reverb pedal chains",
      "Pickup selector switches (Bridge, Neck, Middle)",
      "Whammy bar techniques and feedback control",
    ],
  },
  {
    module: "Module 8",
    title: "Stage Repertoire & Exam Certification",
    topics: [
      "Playing full songs from memory without stopping",
      "Stage presence, standing posture, and strap setup",
      "Rockschool & Trinity Guitar Grade 1 to 8 prep",
      "Live band ensemble performance",
    ],
  },
];

const METHOD_STEPS = [
  { step: "Step 1", title: "Consult / Enquiry", desc: "30-min consultation or enquiry online or in studio." },
  { step: "Step 2", title: "Skill Assessment", desc: "Evaluate hand ergonomics, goals, and style." },
  { step: "Step 3", title: "Choose Level", desc: "Select Acoustic or Electric track and batch schedule." },
  { step: "Step 4", title: "Weekly Practice", desc: "Structured 1-on-1 and small group jam sessions." },
  { step: "Step 5", title: "Progress Review", desc: "Monthly video recording analysis and teacher feedback." },
  { step: "Step 6", title: "Live Concert", desc: "Perform live on stage at our seasonal studio concerts." },
  { step: "Step 7", title: "Certification", desc: "Receive official Rockschool / 88 Keys Grade Certificate." },
];

const TEACHERS = [
  {
    name: "Marcus Vance",
    role: "Head of Guitar & Production",
    exp: "12+ Years Experience",
    qualifications: "B.Mus Guitar Performance (Berklee College of Music)",
    specialization: "Acoustic Fingerstyle, Electric Rock Solos & Amp Tone Design",
    bio: "Marcus has toured internationally and recorded guitar for film scores. He simplifies complex solos into intuitive step-by-step techniques.",
    languages: "English, Spanish",
    achievements: "Berklee College Alum • 200+ Students Mentored",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Liam O'Connor",
    role: "Acoustic Fingerstyle Specialist",
    exp: "9+ Years Experience",
    qualifications: "Dip.Mus London College of Music",
    specialization: "Fingerstyle Acoustic, Folk, Pop & Songwriting",
    bio: "Liam helps acoustic players master smooth chord transitions, fingerpicking dynamics, and live backing rhythm.",
    languages: "English",
    achievements: "London College Distinction • Songwriter Specialist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
];

const CLASS_DETAILS = [
  { title: "Class Duration", value: "60 Minutes", desc: "45 min core instruction + 15 min jam session" },
  { title: "Available Days", value: "Monday to Friday", desc: "5 days a week flexible batch availability" },
  { title: "Flexible Timings", value: "9 AM – 8:30 PM", desc: "Morning, afternoon, and evening slots" },
  { title: "Learning Mode", value: "Offline / Online / Hybrid", desc: "Studio acoustic & electric guitars provided free" },
  { title: "Batch Size", value: "Max 4 Students", desc: "Micro-batches for individual feedback" },
];

const GALLERY = [
  { id: 1, title: "Acoustic Fingerstyle Masterclass", tag: "Studio Jam", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "Electric Guitar Amp & Pedal FX Setup", tag: "Tone Lab", image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "Youth Band Stage Rehearsal", tag: "Live Concert", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop" },
  { id: 4, title: "Rockschool Grade Exam Prep", tag: "Certification", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop" },
];

const TESTIMONIALS = [
  {
    name: "Rohan Kapoor",
    duration: "Guitar Student • 8 Months",
    stars: 5,
    review: "I went from struggling with open chords to playing lead guitar solos in front of 200 people at the annual concert! Marcus is a phenomenal teacher.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Samantha Wu",
    duration: "Fingerstyle Student • 1 Year",
    stars: 5,
    review: "The studio environment at 88 Keys is incredible. High quality Fender & Taylor guitars are provided, and the 1-on-1 attention is unmatched.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
];

const FAQS = [
  {
    q: "Do I need to own a guitar to take classes at 88 Keys?",
    a: "No! We provide high-quality Fender electric and Fender/Taylor acoustic guitars inside our studio for all students. However, having a guitar at home is recommended for practice.",
  },
  {
    q: "Should I start with Acoustic or Electric Guitar?",
    a: "Both are great for beginners! Acoustic builds finger strength, while Electric has thinner strings that are slightly easier to press. You can choose based on the music style you love.",
  },
  {
    q: "How long until I can play my first song?",
    a: "Most beginners play their first complete 3-chord song within their first 2 to 3 weeks of lessons!",
  },
  {
    q: "Do you prepare students for Rockschool & Trinity Guitar Exams?",
    a: "Yes! We prepare candidates for graded guitar examinations from ABRSM, Trinity College London, RSL (Rockschool Ltd), and LCM (London College of Music) — from Grade 1 through Grade 8.",
  },
];

const EXAM_BOARDS = [
  { name: "ABRSM", full: "Associated Board of the Royal Schools of Music" },
  { name: "Trinity", full: "Trinity College London" },
  { name: "RSL", full: "Rockschool Ltd" },
  { name: "LCM", full: "London College of Music" },
];

const RELATED_COURSES = [
  { name: "Piano Mastery", icon: "piano", desc: "Classical, Jazz & Contemporary piano technique.", href: "/piano" },
  { name: "Bass Guitar Architecture", icon: "bass", desc: "Groove locking, slap bass, and fundamental basslines.", href: "/bass" },
  { name: "Drums & Percussion", icon: "drums", desc: "Acoustic drumkits, tempo control, and fills.", href: "/drums" },
  { name: "Dance & Choreography", icon: "dance", desc: "Contemporary, Hip-Hop, and stage movement.", href: "/dance" },
];

export default function GuitarClient() {
  const [teachers, setTeachers] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/teachers?department=Guitar")
      .then((res) => res.ok ? res.json() : TEACHERS)
      .then((data) => setTeachers(data.length > 0 ? data : TEACHERS))
      .catch((err) => {
        console.error("Failed to load guitar teachers:", err);
        setTeachers(TEACHERS);
      });
  }, []);

  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [openCurriculumModule, setOpenCurriculumModule] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<(typeof GALLERY)[0] | null>(null);
  const [brochureDownloaded, setBrochureDownloaded] = useState(false);

  const handleBrochureDownload = () => {
    setBrochureDownloaded(true);
    setTimeout(() => setBrochureDownloaded(false), 4000);
  };

  const renderCourseIcon = (id: string, className = "w-6 h-6") => {
    if (id === "piano") return <PianoIcon className={className} />;
    if (id === "drums") return <DrumIcon className={className} />;
    if (id === "dance") return <DanceIcon className={className} />;
    return <GuitarIcon className={className} />;
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
      <section
        id="hero"
        className="relative pt-32 pb-0 md:pt-40 overflow-hidden bg-[#F7F2E7]"
      >
        <div className="absolute top-24 right-0 w-130 h-130 bg-[#B8863B]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-10 text-6xl text-[#17140F]/4 font-display select-none pointer-events-none animate-note-1">♪</div>
        <div className="absolute top-1/2 left-1/3 text-8xl text-[#B8863B]/6 font-display select-none pointer-events-none animate-note-2">♫</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-7">
                <span className="w-6 h-px bg-[#B8863B]" />
                <span>Acoustic & Electric Guitar Academy • Admissions Open</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold text-[#17140F] tracking-tight leading-[1.1] mb-6">
                Unleash Your Rhythm.
                <br />
                <span className="italic gradient-text-brass">Master the Guitar.</span>
              </h1>

              <p className="text-lg text-[#4A4335] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-9">
                From acoustic fingerpicking to electrifying rock solos, our structured guitar program empowers students to play their favorite songs, master music theory, and perform with confidence.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                <button
                  onClick={() => setIsTrialModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-[#17140F] text-[#F7F2E7] font-semibold rounded-sm hover:bg-[#B8863B] hover:text-[#17140F] transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>Book Consult / Enquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleBrochureDownload}
                  className="w-full sm:w-auto px-8 py-4 bg-transparent text-[#17140F] font-semibold rounded-sm border border-[#17140F]/25 hover:border-[#17140F] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#B8863B]" />
                  <span>Download Course Brochure</span>
                </button>
              </div>

              {brochureDownloaded && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-[#F1E4C8] border border-[#B8863B]/30 text-[#17140F] text-xs rounded-sm inline-flex items-center gap-2 font-medium mb-6"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#B8863B]" />
                  <span>Guitar Brochure PDF requested! Check your download folder.</span>
                </motion.div>
              )}

              {/* Key Trust Signals */}
              <div className="flex items-center justify-center lg:justify-start gap-5 sm:gap-6 text-[#4A4335] text-xs font-mono uppercase tracking-wide border-t border-[#17140F]/10 pt-6">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#B8863B]" />
                  <span>ABRSM / Trinity / RSL / LCM Prep</span>
                </div>
                <div className="w-px h-3 bg-[#17140F]/15 hidden sm:block" />
                <div className="hidden sm:flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#B8863B]" />
                  <span>Guitars Provided In Class</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Visual Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative overflow-hidden border-4 border-[#17140F] bg-[#17140F] group">
                  <img
                    src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop"
                    alt="Student playing guitar at 88 Keys Music Studio"
                    className="w-full h-110 sm:h-125 object-cover grayscale-25 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#17140F]/90 via-[#17140F]/20 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-4 right-4 bg-[#17140F]/60 backdrop-blur-md border border-[#F7F2E7]/20 text-[#F7F2E7] text-[10px] font-mono uppercase tracking-wider px-3 py-1.5">
                    Acoustic & Electric Amp Rig
                  </div>

                  {/* Bottom Text */}
                  <div className="absolute bottom-6 left-6 right-6 text-[#F7F2E7]">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#B8863B]">
                      Fretboard Mastery
                    </span>
                    <h3 className="font-display text-2xl font-semibold tracking-tight mt-1">
                      Acoustic & Electric Guitar Program
                    </h3>
                    <p className="text-xs text-[#B3A98F] mt-1">
                      Fingerstyle, chords, solos, and rhythm riffs.
                    </p>
                  </div>
                </div>

                {/* Floating Glass Stats */}
                <div className="absolute -bottom-6 -left-6 glass-card p-4 shadow-xl hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F1E4C8] text-[#B8863B] flex items-center justify-center">
                    <GuitarIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#17140F]">Fender & Taylor Guitars</p>
                    <p className="text-[10px] text-[#4A4335] font-mono uppercase tracking-wide">Acoustic & Electric Rig</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <PianoKeys variant="light" keyCount={36} className="h-9" />
      </section>

      {/* -------------------------------------------------- */}
      {/* WHY LEARN GUITAR                                   */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#EEE5D3] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
              <span className="w-6 h-px bg-[#B8863B]" />
              Instrument Benefits
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-4">
              Why Learn Guitar at 88 Keys?
            </h2>
            <p className="text-[#4A4335] text-base sm:text-lg">
              The guitar is one of the most versatile and portable instruments in the world. It unlocks rhythm, songwriting craft, and a lifetime of stage-ready confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#17140F]/12">
            {WHY_LEARN_GUITAR.map((card, idx) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className="group relative p-8 border-r border-b border-[#17140F]/12 hover:bg-[#17140F] transition-colors duration-300"
                >
                  <div className="flex items-start justify-between mb-10">
                    <span className="font-mono text-xs text-[#B8863B]">{String(idx + 1).padStart(2, "0")}</span>
                    <IconComponent className="w-5 h-5 text-[#17140F]/35 group-hover:text-[#B8863B] transition-colors duration-300" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#17140F] group-hover:text-[#F7F2E7] mb-3 transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#4A4335] group-hover:text-[#B3A98F] leading-relaxed transition-colors duration-300">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* WHO CAN JOIN                                       */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#F7F2E7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Info */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
                <span className="w-6 h-px bg-[#B8863B]" />
                For All Skill Levels
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-6">
                Who Can Join Our Guitar Program?
              </h2>
              <p className="text-[#4A4335] text-base leading-relaxed mb-6">
                We welcome students of all ages and backgrounds. Whether your goal is clearing Rockschool/Trinity exams, performing on stage, or picking up your first campfire chord, our faculty tailors the path for you.
              </p>

              {/* No Knowledge Required Badge */}
              <div className="p-4 border border-[#17140F]/12 bg-[#EEE5D3] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#17140F] text-[#F7F2E7] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-3" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#17140F]">No Prior Musical Experience Required</p>
                  <p className="text-xs text-[#4A4335]">We teach posture, tuning, chords, and tabs from day one.</p>
                </div>
              </div>
            </div>

            {/* Right Audience Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#17140F]/12 border border-[#17140F]/12">
              {WHO_CAN_JOIN.map((aud, i) => (
                <motion.div
                  key={aud.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="bg-[#F7F2E7] p-6 hover:bg-[#EEE5D3] transition-colors"
                >
                  <h3 className="font-bold text-[#17140F] text-base mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#B8863B]" />
                    {aud.title}
                  </h3>
                  <p className="text-xs text-[#4A4335] leading-relaxed">{aud.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* COURSE LEVELS                                      */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#EEE5D3] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
              <span className="w-6 h-px bg-[#B8863B]" />
              Structured Milestones
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-4">
              Guitar Course Modules
            </h2>
            <p className="text-[#4A4335] text-base sm:text-lg">
              Progressive modules designed to take you from your first open chord to stage-ready lead soloing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#17140F]/15 border border-[#17140F]/15">
            {COURSE_LEVELS.map((level, idx) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex flex-col justify-between p-8 ${
                  level.popular ? "bg-[#17140F] text-[#F7F2E7]" : "bg-[#F7F2E7] text-[#17140F]"
                }`}
              >
                {level.popular && (
                  <div className="absolute top-0 right-0 bg-[#B8863B] text-[#17140F] text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-mono uppercase tracking-wide ${level.popular ? "text-[#B8863B]" : "text-[#B8863B]"}`}>
                      {level.level} Level
                    </span>
                    <span className={`text-xs font-mono flex items-center gap-1 ${level.popular ? "text-[#B3A98F]" : "text-[#4A4335]"}`}>
                      <Clock className="w-3.5 h-3.5 text-[#B8863B]" /> {level.duration}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-semibold mb-2">{level.level}</h3>
                  <p className={`text-xs leading-relaxed mb-6 ${level.popular ? "text-[#B3A98F]" : "text-[#4A4335]"}`}>{level.desc}</p>

                  <div className="space-y-3 mb-8">
                    {level.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs">
                        <Check className="w-4 h-4 text-[#B8863B] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className={`text-[11px] mb-4 italic text-center ${level.popular ? "text-[#B3A98F]" : "text-[#4A4335]"}`}>
                    Recommended: {level.recommendedFor}
                  </p>
                  <button
                    onClick={() => setIsTrialModalOpen(true)}
                    className={`w-full py-3.5 rounded-sm font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      level.popular
                        ? "bg-[#B8863B] text-[#17140F] hover:bg-[#F7F2E7]"
                        : "bg-[#17140F] text-[#F7F2E7] hover:bg-[#B8863B] hover:text-[#17140F]"
                    }`}
                  >
                    <span>Enroll in {level.level}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* WHAT YOU WILL LEARN TIMELINE                       */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#F7F2E7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
              <span className="w-6 h-px bg-[#B8863B]" />
              Skill Progression Roadmap
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-4">
              What You Will Learn
            </h2>
            <p className="text-[#4A4335] text-base sm:text-lg">
              A comprehensive step-by-step musical journey designed to build fretboard mastery from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#17140F]/12 border border-[#17140F]/12">
            {WHAT_YOU_WILL_LEARN.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="bg-[#F7F2E7] p-6 hover:bg-[#EEE5D3] transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#B8863B]">
                    STEP {item.step}
                  </span>
                  <div className="w-1.5 h-1.5 bg-[#B8863B] group-hover:scale-150 transition-transform" />
                </div>
                <h3 className="font-bold text-[#17140F] text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#4A4335] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* COURSE CURRICULUM ACCORDION                        */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#EEE5D3] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
              <span className="w-6 h-px bg-[#B8863B]" />
              Detailed Syllabus
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-4">
              Guitar Course Curriculum
            </h2>
            <p className="text-[#4A4335] text-base sm:text-lg">
              Explore the 8 core modules taught by our certified guitar master faculty.
            </p>
          </div>

          <div className="border border-[#17140F]/15 divide-y divide-[#17140F]/15">
            {CURRICULUM_MODULES.map((mod, i) => {
              const isOpen = openCurriculumModule === i;
              return (
                <div key={mod.module} className="bg-[#F7F2E7]">
                  <button
                    onClick={() => setOpenCurriculumModule(isOpen ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-[#17140F] hover:text-[#B8863B] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#B8863B] uppercase tracking-wide">
                        {mod.module}
                      </span>
                      <span className="text-base font-display font-semibold">{mod.title}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#B8863B] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6 pt-2 border-t border-[#17140F]/10 bg-[#EEE5D3]"
                      >
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                          {mod.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-center gap-2 text-xs text-[#4A4335]">
                              <Check className="w-4 h-4 text-[#B8863B] shrink-0" />
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* OUR LEARNING METHOD                                */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#F7F2E7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
              <span className="w-6 h-px bg-[#B8863B]" />
              Proven Methodology
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-4">
              Our Learning Method
            </h2>
            <p className="text-[#4A4335] text-base sm:text-lg">
              A 7-stage systematic framework built to guarantee confidence and musical progress.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 border border-[#17140F]">
            {METHOD_STEPS.map((step, idx) => {
              const isKey = idx % 2 === 1;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  className={`relative p-5 min-h-44 flex flex-col justify-between border-r border-b lg:border-b-0 border-[#17140F]/15 last:border-r-0 transition-colors duration-300 ${
                    isKey ? "bg-[#17140F] text-[#F7F2E7]" : "bg-[#F7F2E7] text-[#17140F]"
                  } hover:bg-[#B8863B] hover:text-[#17140F]`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-sm mt-3 mb-2">{step.title}</h3>
                    <p className="text-[11px] leading-relaxed opacity-70">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* MEET YOUR GUITAR TEACHERS                          */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#EEE5D3] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
              <span className="w-6 h-px bg-[#B8863B]" />
              Faculty
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-4">
              Meet Your Guitar Mentors
            </h2>
            <p className="text-[#4A4335] text-base sm:text-lg">
              Learn directly from touring performers and conservatoire-trained guitar educators.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#17140F]/12 border border-[#17140F]/12">
            {teachers.map((teacher, idx) => (
              <motion.div
                key={teacher.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-[#F7F2E7] p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start"
              >
                <div className="w-full sm:w-48 h-64 sm:h-full shrink-0 overflow-hidden">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover grayscale-30 hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                <div className="flex-1">
                  <span className="text-xs font-mono uppercase tracking-wide text-[#B8863B]">
                    {teacher.exp}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-[#17140F] mt-2">{teacher.name}</h3>
                  <p className="text-xs font-bold text-[#B8863B] mb-2">{teacher.role}</p>

                  <p className="text-xs text-[#4A4335] leading-relaxed mb-4">{teacher.bio}</p>

                  <div className="space-y-2 text-xs text-[#4A4335] mb-6 bg-[#EEE5D3] p-3">
                    <p><strong className="text-[#17140F]">Qualifications:</strong> {teacher.qualifications}</p>
                    <p><strong className="text-[#17140F]">Specialization:</strong> {teacher.specialization}</p>
                    <p><strong className="text-[#17140F]">Achievements:</strong> {teacher.achievements}</p>
                    <p><strong className="text-[#17140F]">Languages:</strong> {teacher.languages}</p>
                  </div>

                  <button
                    onClick={() => setIsTrialModalOpen(true)}
                    className="w-full py-3 bg-[#17140F] text-[#F7F2E7] font-semibold text-xs rounded-sm hover:bg-[#B8863B] hover:text-[#17140F] transition-colors cursor-pointer"
                  >
                    Consult/Enquire With {teacher.name.split(" ")[0]}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* CLASS DETAILS                                      */}
      {/* -------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-[#F7F2E7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
              <span className="w-6 h-px bg-[#B8863B]" />
              Program Logistics
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-3">
              Guitar Class Details & Timings
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[#17140F]/12 border border-[#17140F]/12">
            {CLASS_DETAILS.map((det) => (
              <div key={det.title} className="bg-[#F7F2E7] p-6 text-center flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#4A4335]">
                    {det.title}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-[#B8863B] mt-2 mb-2">{det.value}</h3>
                  <p className="text-xs text-[#4A4335] leading-relaxed">{det.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* CERTIFICATION                                      */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#EEE5D3] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
                <span className="w-6 h-px bg-[#B8863B]" />
                Official Credentials
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-6">
                Grades &amp; Exams: Global Guitar Certification
              </h2>
              <p className="text-[#4A4335] text-base leading-relaxed mb-8">
                Beyond our in-house grade certificates, 88 Keys Music Studio prepares students for graded guitar exams with four of the world&apos;s most recognized examination boards — ABRSM, Trinity College London, RSL (Rockschool Ltd), and LCM (London College of Music). Each pathway is tailored to that board&apos;s specific syllabus, so whichever route you choose, our faculty guides you from first lesson to exam day.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#17140F]/12 border border-[#17140F]/12 mb-8">
                {EXAM_BOARDS.map((board) => (
                  <div key={board.name} className="bg-[#F7F2E7] p-4 text-center">
                    <GraduationCap className="w-4 h-4 text-[#B8863B] mx-auto mb-2" />
                    <p className="font-display text-base font-semibold text-[#17140F]">{board.name}</p>
                    <p className="text-[9px] text-[#4A4335] font-mono uppercase tracking-wide mt-1 leading-tight">{board.full}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {[
                  { title: "Course Completion Certificate", desc: "Awarded upon completing Beginner, Intermediate, or Advanced modules." },
                  { title: "Performance Certificate", desc: "Awarded after stage recitals and band showcase concerts." },
                  { title: "Annual Assessment Report", desc: "Detailed breakdown of technique, tone, and repertoire progress." },
                  { title: "ABRSM / Trinity / RSL / LCM Exam Certificate", desc: "Official internationally recognized credential for Graded candidates." },
                ].map((cert) => (
                  <div key={cert.title} className="flex items-start gap-3 p-3.5 bg-[#F7F2E7] border border-[#17140F]/10">
                    <Award className="w-5 h-5 text-[#B8863B] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-[#17140F] text-sm">{cert.title}</h4>
                      <p className="text-xs text-[#4A4335]">{cert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate Mockup Frame */}
            <div className="lg:col-span-6">
              <div className="relative p-8 bg-[#17140F] text-[#F7F2E7] border border-[#B8863B]/30">
                <div className="border-2 border-[#B8863B]/40 p-6 text-center">
                  <div className="w-12 h-12 bg-[#B8863B]/10 border border-[#B8863B]/30 text-[#B8863B] flex items-center justify-center mx-auto">
                    <GuitarIcon className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-mono text-[#B8863B] uppercase tracking-widest mt-3">
                    88 Keys Music Studio • Certificate of Mastery
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-[#F7F2E7] mt-4">
                    Guitar Performance Grade 5
                  </h3>
                  <p className="text-xs text-[#B3A98F] italic mt-2">
                    This is to certify that the student has successfully demonstrated technique, tone, and stage performance with Distinction.
                  </p>
                  <div className="mt-8 pt-4 border-t border-[#F7F2E7]/10 flex items-center justify-between text-[11px] text-[#B3A98F] font-mono">
                    <span>Director of Pedagogy</span>
                    <span>ABRSM • Trinity • RSL • LCM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* STUDENT GALLERY                                    */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#F7F2E7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
              <span className="w-6 h-px bg-[#B8863B]" />
              In-Studio Moments
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-4">
              Guitar Student Gallery
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#17140F]/12 border border-[#17140F]/12">
            {GALLERY.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setSelectedGalleryImg(item)}
                className="relative h-64 overflow-hidden group cursor-pointer bg-[#17140F]"
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
                  <h3 className="font-display text-base font-semibold">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* STUDENT TESTIMONIALS                               */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#EEE5D3] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-10">
            <span className="w-6 h-px bg-[#B8863B]" />
            Guitar Student Reviews
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
                {[...Array(TESTIMONIALS[activeTestimonialIdx].stars)].map((_, i) => (
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
                    {TESTIMONIALS[activeTestimonialIdx].duration}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-12">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonialIdx(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeTestimonialIdx === idx ? "w-8 bg-[#17140F]" : "w-1.5 bg-[#17140F]/20 hover:bg-[#17140F]/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* FREQUENTLY ASKED QUESTIONS                         */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#F7F2E7] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
              <span className="w-6 h-px bg-[#B8863B]" />
              Got Questions?
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="border border-[#17140F]/15 divide-y divide-[#17140F]/15">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="bg-[#F7F2E7]">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-[#17140F] hover:text-[#B8863B] transition-colors cursor-pointer"
                  >
                    <span className="text-base">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#B8863B] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6 pt-1 text-xs text-[#4A4335] leading-relaxed"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* BOOK FREE TRIAL CTA                                */}
      {/* -------------------------------------------------- */}
      <section className="pt-24 md:pt-32 bg-[#EEE5D3] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#17140F] text-[#F7F2E7] overflow-hidden">
            <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-7">
                <span className="w-6 h-px bg-[#B8863B]" />
                Zero Commitment • 1-on-1 Consultation
                <span className="w-6 h-px bg-[#B8863B]" />
              </span>

              <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight mb-6 leading-tight">
                Ready to Play Your First Guitar Song?
              </h2>

              <p className="text-[#B3A98F] text-base sm:text-lg mb-9 leading-relaxed">
                Book your 30-minute consultation or submit an enquiry and experience guitar mentorship with our master faculty.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setIsTrialModalOpen(true)}
                  className="w-full sm:w-auto px-10 py-4.5 bg-[#B8863B] text-[#17140F] font-bold text-sm uppercase tracking-wide hover:bg-[#F7F2E7] transition-all duration-300 inline-flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span>Book Consult / Enquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsTrialModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4.5 bg-transparent text-[#F7F2E7] font-semibold text-sm uppercase tracking-wide border border-[#F7F2E7]/30 hover:border-[#F7F2E7] transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Talk to an Instructor</span>
                </button>
              </div>
            </div>

            <PianoKeys variant="dark" keyCount={48} className="h-8 relative z-10" />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* RELATED COURSES                                    */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#F7F2E7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
              <span className="w-6 h-px bg-[#B8863B]" />
              Explore More
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-4">
              Related Courses at 88 Keys
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#17140F]/12 border border-[#17140F]/12">
            {RELATED_COURSES.map((course) => (
              <Link
                key={course.name}
                href={course.href}
                className="bg-[#F7F2E7] p-6 hover:bg-[#F1E4C8] transition-all group flex flex-col gap-4"
              >
                <span className="w-12 h-12 flex items-center justify-center bg-[#EEE5D3] text-[#17140F] group-hover:bg-[#17140F] group-hover:text-[#F7F2E7] transition-colors">
                  {renderCourseIcon(course.icon, "w-5 h-5")}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-[#17140F] text-lg">
                    {course.name}
                  </h3>
                  <p className="text-xs text-[#4A4335] mt-1 leading-relaxed">{course.desc}</p>
                </div>
              </Link>
            ))}
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
        defaultCourse="Acoustic Guitar"
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
                <X className="w-5 h-5" />
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
