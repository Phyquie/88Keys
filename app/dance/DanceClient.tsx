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
  ChevronRight,
  PhoneCall,
  X,
  Check,
  Quote,
  Activity,
  Flame,
  Heart,
  Smile,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import PianoKeys from "@/components/PianoKeys";
import { PianoIcon, GuitarIcon, DrumIcon, DanceIcon } from "@/components/Icons";
import Link from "next/link";

// --- DATA ---
const WHY_LEARN_DANCE = [
  {
    icon: Activity,
    title: "Full-Body Fitness & Agility",
    description: "Build core strength, muscular stamina, cardiovascular endurance, and body alignment through dance movement.",
  },
  {
    icon: Flame,
    title: "Expressive Stage Choreography",
    description: "Translate musical rhythm into physical emotion across Hip-Hop, Contemporary, Jazz, and Modern Fusion styles.",
  },
  {
    icon: Sparkles,
    title: "Rhythm & Body Isolation",
    description: "Master sharp body isolations, wave dynamics, fluid extensions, and musicality synchronization.",
  },
  {
    icon: Award,
    title: "Stage Presence & Poise",
    description: "Develop audience connection, facial expression, and stage confidence during group performance showcases.",
  },
  {
    icon: Heart,
    title: "Flexibility & Posture",
    description: "Enhance joint mobility, spinal posture, and muscular flexibility under professional conditioning guidance.",
  },
  {
    icon: Smile,
    title: "Joyful Creative Expression",
    description: "Dance is the ultimate joyful outlet for self-expression, stress relief, and group camaraderie.",
  },
];

const WHO_CAN_JOIN = [
  { title: "Kids (4+ Years)", desc: "Creative movement, rhythm coordination, fun Hip-Hop routines, and posture fundamentals." },
  { title: "Teenagers", desc: "Urban Hip-Hop isolations, Contemporary floorwork, stage presence, and crew choreography." },
  { title: "Adults & Working Pros", desc: "High-energy fitness & dance sessions for stress relief, stamina, and confidence." },
  { title: "Beginners", desc: "No dance background needed! Learn basic steps, rhythm counting, and body coordination." },
  { title: "Intermediate Dancers", desc: "Refine technique, speed up choreography pick-up, and master dynamic musicality." },
  { title: "Advanced Performers", desc: "Solo choreography, stage audition preparation, and annual showcase spotlight routines." },
];

const COURSE_LEVELS = [
  {
    level: "Foundation",
    duration: "3–6 Months",
    desc: "Build body posture, rhythm counting, and basic dance step combinations.",
    features: [
      "Body alignment, flexibility & warm-up drills",
      "Rhythm counting (1-2-3-4-5-6-7-8)",
      "Basic Hip-Hop grooves & Contemporary extensions",
      "Short 32-count routine practice",
      "Confidence building in front of mirrors",
    ],
    recommendedFor: "Ages 4+ with zero dance experience",
  },
  {
    level: "Intermediate",
    duration: "6–12 Months",
    desc: "Dynamic isolations, floorwork, and fluid choreography execution.",
    features: [
      "Chest, shoulder & hip body isolations",
      "Contemporary floorwork & balance transitions",
      "Rapid choreography pick-up techniques",
      "Musicality mapping to beats & lyrics",
      "Small group ensemble staging",
    ],
    recommendedFor: "Dancers with 6+ months experience",
    popular: true,
  },
  {
    level: "Advanced Performance",
    duration: "12+ Months",
    desc: "Concert choreography, solo improvisation, and stage showcase mastery.",
    features: [
      "Advanced Hip-Hop popping, locking & urban fusion",
      "Expressive Contemporary storytelling & leaps",
      "Stage lighting & formation changes",
      "Audition preparation & video reel shoots",
      "Annual 88 Keys Grand Showcase spotlight",
    ],
    recommendedFor: "Performers & crew dancers",
  },
];

const WHAT_YOU_WILL_LEARN = [
  { step: "01", title: "Warm-Up & Alignment", desc: "Core conditioning, joint mobility, and spine alignment." },
  { step: "02", title: "Rhythm & Counting", desc: "Internalizing tempos and 8-count musicality." },
  { step: "03", title: "Body Isolations", desc: "Head, shoulder, ribcage, and hip control." },
  { step: "04", title: "Basic Step Combinations", desc: "Footwork, turns, slides, and direction changes." },
  { step: "05", title: "Contemporary Extensions", desc: "Fluid arm lines, balance, and floorwork." },
  { step: "06", title: "Urban Hip-Hop Grooves", desc: "Bounce, wave dynamics, and energetic popping." },
  { step: "07", title: "Choreography Execution", desc: "Learning full song routines with facial expression." },
  { step: "08", title: "Stage Showcase Performance", desc: "Group formations and auditorium concert lighting." },
];

const CURRICULUM_MODULES = [
  {
    module: "Module 1",
    title: "Body Warm-Up, Alignment & Flexibility",
    topics: [
      "Dynamic stretching & joint mobility routines",
      "Core stabilization & posture alignment",
      "Spinal articulation and roll-downs",
      "Safe foot turnout and landing mechanics",
    ],
  },
  {
    module: "Module 2",
    title: "Rhythm & Musicality Foundations",
    topics: [
      "Understanding 8-count structure in music",
      "Syncopation & dancing on off-beats",
      "Mapping movement to vocal melodies vs drum beats",
      "Tempo changes and speed control",
    ],
  },
  {
    module: "Module 3",
    title: "Body Isolations & Precision Control",
    topics: [
      "Independent chest, shoulder, and hip rolls",
      "Arm tutting & wave dynamics",
      "Sharp contrast between explosive & fluid movement",
      "Gaze, head placement, and focus control",
    ],
  },
  {
    module: "Module 4",
    title: "Contemporary & Modern Technique",
    topics: [
      "Fluid arm extensions and breath-driven movement",
      "Low floorwork transitions and roll-outs",
      "Center balance, pirouettes, and spot technique",
      "Weight-shifting and suspension leaps",
    ],
  },
  {
    module: "Module 5",
    title: "Urban Hip-Hop & Street Grooves",
    topics: [
      "Fundamental Hip-Hop bounce & rock grooves",
      "Footwork patterns (C-walk, running man, slides)",
      "Popping, locking, and texture variation",
      "Freestyle cypher jamming & confidence",
    ],
  },
  {
    module: "Module 6",
    title: "Choreography Pick-Up & Memorization",
    topics: [
      "Strategies for learning 64-count routines rapidly",
      "Cleaning movement details & hand precision",
      "Partnering & duet syncopation",
      "Maintaining high energy throughout routines",
    ],
  },
  {
    module: "Module 7",
    title: "Stage Formations & Staging Mechanics",
    topics: [
      "V-shape, diagonal, and block formation shifts",
      "Stage entry, exit, and transition timing",
      "Facing corners, camera angles, and center stage dominance",
      "Costume movement & prop handling",
    ],
  },
  {
    module: "Module 8",
    title: "Concert Showcase & Certification",
    topics: [
      "Overcoming stage fright under auditorium lighting",
      "Projection, facial expressions & audience connection",
      "Audition reel video recording session",
      "88 Keys Studio Performance Certificate presentation",
    ],
  },
];

const METHOD_STEPS = [
  { step: "Step 1", title: "Consult / Enquiry", desc: "Schedule a 30-min consultation or enquire online or in studio." },
  { step: "02", title: "Movement Assessment", desc: "Evaluate your rhythm, flexibility, and current level." },
  { step: "03", title: "Choose Your Style", desc: "Select Hip-Hop, Contemporary, or Fusion track & batch size." },
  { step: "04", title: "Weekly Rehearsal", desc: "Structured group choreography and technique sessions." },
  { step: "05", title: "Progress Review", desc: "Monthly feedback report and video recording review." },
  { step: "06", title: "Stage Showcase", desc: "Perform at our bi-annual auditorium dance concert." },
  { step: "07", title: "Certification", desc: "Receive official performance certificate and report card." },
];

const TEACHERS = [
  {
    name: "Sophia Lin",
    role: "Head of Dance & Choreography",
    exp: "10+ Years Experience",
    qualifications: "BFA Dance Performance (Tisch School of the Arts)",
    specialization: "Contemporary Fusion, Hip-Hop Isolation, Stage Staging & Reel Direction",
    bio: "Sophia has choreographed for music videos, stage theater, and national dance competitions. She brings energy, positivity, and technical discipline.",
    languages: "English, Mandarin",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
  },
];

const CLASS_DETAILS = [
  { title: "Class Duration", value: "60 Minutes", desc: "15 min warm-up + 35 min choreography + 10 min cool-down" },
  { title: "Available Days", value: "Monday to Saturday", desc: "5 days a week flexible batch availability" },
  { title: "Flexible Timings", value: "9 AM – 8:30 PM", desc: "Morning, afternoon, and evening slots" },
  { title: "Studio Facility", value: "Mirrored & Sprung Floor", desc: "Acoustically treated studio with shock-absorbing dance floors" },
  { title: "Batch Size", value: "Max 10 Students", desc: "Generous space per dancer for fluid movement" },
];

const GALLERY = [
  { id: 1, title: "Contemporary Dance Rehearsal", tag: "Studio", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "Urban Hip-Hop Crew Choreography", tag: "Hip-Hop", image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "Youth Dance Recital Showcase", tag: "Kids Showcase", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop" },
  { id: 4, title: "Stage Lighting Performance", tag: "Auditorium", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop" },
];

const TESTIMONIALS = [
  {
    name: "Tanya Malhotra",
    duration: "Dance Student • 1 Year",
    stars: 5,
    review: "Sophia's dance class is pure joy! I went from feeling self-conscious about my coordination to performing live on stage at the annual concert.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Rohan Varma",
    duration: "Hip-Hop Student • 6 Months",
    stars: 5,
    review: "The mirrored studio facility with sprung floors is world class. The energy in every class is electric and super welcoming for beginners!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
];

const FAQS = [
  {
    q: "What clothes or shoes should I wear to dance class?",
    a: "Wear comfortable, breathable athletic clothing (sweatpants, leggings, t-shirts) and clean indoor sneakers for Hip-Hop, or bare feet/socks for Contemporary.",
  },
  {
    q: "Can complete beginners with zero flexibility join?",
    a: "Yes! Flexibility and stamina develop naturally through our weekly warm-up and conditioning routines. Over 60% of our dancers started from scratch.",
  },
  {
    q: "What dance styles are taught in the program?",
    a: "We offer dedicated tracks in Hip-Hop / Urban Street Dance, Contemporary Fluid Movement, and Fusion Dance combinations.",
  },
  {
    q: "Are there opportunities to perform live on stage?",
    a: "Yes! All enrolled dance students participate in our bi-annual 88 Keys Stage Showcase under auditorium lighting with professional video recording.",
  },
];

const RELATED_COURSES = [
  { name: "Piano Mastery", icon: "piano", desc: "Classical, Jazz & Contemporary piano technique.", href: "/piano" },
  { name: "Acoustic & Electric Guitar", icon: "guitar", desc: "Fingerstyle, chords, solos, and rhythm riffs.", href: "/guitar" },
  { name: "Bass Guitar Architecture", icon: "bass", desc: "Groove locking, slap bass, and fundamental basslines.", href: "/bass" },
  { name: "Drums & Percussion", icon: "drums", desc: "Acoustic drumkits, tempo control, and fills.", href: "/drums" },
];

export default function DanceClient() {
  const [teachers, setTeachers] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/teachers?department=Dance")
      .then((res) => res.ok ? res.json() : TEACHERS)
      .then((data) => setTeachers(data.length > 0 ? data : TEACHERS))
      .catch((err) => {
        console.error("Failed to load dance teachers:", err);
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
    if (id === "guitar" || id === "bass") return <GuitarIcon className={className} />;
    if (id === "drums") return <DrumIcon className={className} />;
    if (id === "dance") return <DanceIcon className={className} />;
    return <PianoIcon className={className} />;
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
                <span>Dance & Expressive Movement Academy • Batches Open</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold text-[#17140F] tracking-tight leading-[1.1] mb-6">
                Express Through <span className="italic gradient-text-brass">Movement.</span>
                <br />
                Master the Dance.
              </h1>

              <p className="text-lg text-[#4A4335] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-9">
                Blend rhythm, physical fitness, fluid choreography, and stage presence across Contemporary, Hip-Hop, Classical, and Modern Fusion dance styles.
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
                  <span>Download Dance Brochure</span>
                </button>
              </div>

              {brochureDownloaded && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-[#F1E4C8] border border-[#B8863B]/30 text-[#17140F] text-xs rounded-sm inline-flex items-center gap-2 font-medium mb-6"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#B8863B]" />
                  <span>Dance Brochure PDF requested! Check your download folder.</span>
                </motion.div>
              )}

              {/* Key Trust Signals */}
              <div className="flex items-center justify-center lg:justify-start gap-5 sm:gap-6 text-[#4A4335] text-xs font-mono uppercase tracking-wide border-t border-[#17140F]/10 pt-6">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#B8863B]" />
                  <span>All Ages & Skill Levels</span>
                </div>
                <div className="w-px h-3 bg-[#17140F]/15 hidden sm:block" />
                <div className="hidden sm:flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#B8863B]" />
                  <span>Live Stage Showcases</span>
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
                    src="https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1200&auto=format&fit=crop"
                    alt="Dance class at 88 Keys Studio"
                    className="w-full h-110 sm:h-125 object-cover grayscale-25 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#17140F]/90 via-[#17140F]/20 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-4 right-4 bg-[#17140F]/60 backdrop-blur-md border border-[#F7F2E7]/20 text-[#F7F2E7] text-[10px] font-mono uppercase tracking-wider px-3 py-1.5">
                    Mirrored Dance Studio
                  </div>

                  {/* Bottom Text */}
                  <div className="absolute bottom-6 left-6 right-6 text-[#F7F2E7]">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#B8863B]">
                      Expressive Choreography
                    </span>
                    <h3 className="font-display text-2xl font-semibold tracking-tight mt-1">
                      Dance & Movement Program
                    </h3>
                    <p className="text-xs text-[#B3A98F] mt-1">
                      Contemporary, Hip-Hop, and expressive stage movement.
                    </p>
                  </div>
                </div>

                {/* Floating Glass Stats */}
                <div className="absolute -bottom-6 -left-6 glass-card p-4 shadow-xl hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F1E4C8] text-[#B8863B] flex items-center justify-center">
                    <DanceIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#17140F]">Mirrored & Sprung Floors</p>
                    <p className="text-[10px] text-[#4A4335] font-mono uppercase tracking-wide">Studio Grade Facility</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <PianoKeys variant="light" keyCount={36} className="h-9" />
      </section>

      {/* -------------------------------------------------- */}
      {/* WHY LEARN DANCE                                    */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#EEE5D3] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
              <span className="w-6 h-px bg-[#B8863B]" />
              Movement Benefits
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-4">
              Why Learn Dance at 88 Keys?
            </h2>
            <p className="text-[#4A4335] text-base sm:text-lg">
              Dance is a full-body art form. It unlocks physical fitness, emotional expression, and lifetime stage confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#17140F]/12">
            {WHY_LEARN_DANCE.map((card, idx) => {
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
                Inclusive Learning
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-6">
                Who Can Join Our Dance Program?
              </h2>
              <p className="text-[#4A4335] text-base leading-relaxed mb-6">
                We welcome dancers of all ages and backgrounds. Whether your goal is performing on our annual stage showcase, building fitness, or dancing for personal joy, our faculty tailors the path for you.
              </p>

              {/* No Knowledge Required Badge */}
              <div className="p-4 border border-[#17140F]/12 bg-[#EEE5D3] flex items-center gap-3">
                <div className="w-9 h-9 bg-[#17140F] text-[#F7F2E7] flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 stroke-3" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#17140F]">No Previous Dance Experience Required</p>
                  <p className="text-xs text-[#4A4335]">We teach posture, rhythm counting, and basic steps from scratch.</p>
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
              Structured Progression
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-4">
              Dance Course Levels
            </h2>
            <p className="text-[#4A4335] text-base sm:text-lg">
              Progressive modules designed to take you from foundational steps to stage showcase mastery.
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
                className={`relative flex flex-col justify-between p-8 ${level.popular ? "bg-[#17140F] text-[#F7F2E7]" : "bg-[#F7F2E7] text-[#17140F]"
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
                    className={`w-full py-3.5 rounded-sm font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${level.popular
                        ? "bg-[#B8863B] text-[#17140F] hover:bg-[#F7F2E7]"
                        : "bg-[#17140F] text-[#F7F2E7] hover:bg-[#B8863B] hover:text-[#17140F]"
                      }`}
                  >
                    <span>Learn More & Enroll</span>
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
              A comprehensive step-by-step movement journey designed to build mastery from day one.
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
              Dance Course Curriculum
            </h2>
            <p className="text-[#4A4335] text-base sm:text-lg">
              Explore the 8 core modules taught by our certified dance faculty.
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
                      className={`w-5 h-5 text-[#B8863B] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
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
              A 7-stage systematic framework built to guarantee confidence and choreographic progress.
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
                  className={`relative p-5 min-h-44 flex flex-col justify-between border-r border-b lg:border-b-0 border-[#17140F]/15 last:border-r-0 transition-colors duration-300 ${isKey ? "bg-[#17140F] text-[#F7F2E7]" : "bg-[#F7F2E7] text-[#17140F]"
                    } hover:bg-[#B8863B] hover:text-[#17140F]`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
                    Step {step.step}
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
      {/* MEET YOUR DANCE TEACHERS                           */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#EEE5D3] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
              <span className="w-6 h-px bg-[#B8863B]" />
              World-Class Faculty
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-4">
              Meet Your Dance Mentors
            </h2>
            <p className="text-[#4A4335] text-base sm:text-lg">
              Learn directly from experienced choreographers and stage performance directors.
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
              Dance Class Details & Timings
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
                Earn Global Dance Certification
              </h2>
              <p className="text-[#4A4335] text-base leading-relaxed mb-8">
                Upon completing each course milestone, students receive official performance certificates validated by 88 Keys Dance Studio and benchmarked against professional choreography standards.
              </p>

              <div className="space-y-4">
                {[
                  { title: "Course Completion Certificate", desc: "Awarded upon completing Foundation, Intermediate, or Advanced Performance modules." },
                  { title: "Performance Certificate", desc: "Awarded after stage showcases and auditorium concerts." },
                  { title: "Annual Assessment Report", desc: "Detailed breakdown of technique, rhythm, and stage presence." },
                  { title: "Choreography Reel Certificate", desc: "Official audition-ready video credential for advanced dancers." },
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
                    <DanceIcon className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-mono text-[#B8863B] uppercase tracking-widest mt-3">
                    88 Keys Dance Studio • Certificate of Mastery
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-[#F7F2E7] mt-4">
                    Contemporary & Hip-Hop Performance Grade 5
                  </h3>
                  <p className="text-xs text-[#B3A98F] italic mt-2">
                    This is to certify that the student has successfully demonstrated technique, musicality, and stage performance with Distinction.
                  </p>
                  <div className="mt-8 pt-4 border-t border-[#F7F2E7]/10 flex items-center justify-between text-[11px] text-[#B3A98F] font-mono">
                    <span>Director of Choreography</span>
                    <span>88 Keys Affiliated Studio</span>
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
              Dance Student Gallery
            </h2>
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
            Dance Student Reviews
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
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeTestimonialIdx === idx ? "w-8 bg-[#17140F]" : "w-1.5 bg-[#17140F]/20 hover:bg-[#17140F]/40"
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
                      className={`w-5 h-5 text-[#B8863B] transition-transform duration-300 ${isOpen ? "rotate-180" : ""
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
                Zero Commitment • Consultation or Enquiry
                <span className="w-6 h-px bg-[#B8863B]" />
              </span>

              <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight mb-6 leading-tight">
                Ready to Take Your First Steps?
              </h2>

              <p className="text-[#B3A98F] text-base sm:text-lg mb-9 leading-relaxed">
                Connect with our expert faculty for a 1-on-1 consultation or submit your enquiry to get started.
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
      <section className="py-24 md:py-32 bg-[#EEE5D3] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
              <span className="w-6 h-px bg-[#B8863B]" />
              Explore More
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-4">
              Explore Other Programs
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
        defaultCourse="Dance & Movement"
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
