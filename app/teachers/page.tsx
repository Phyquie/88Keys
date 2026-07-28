"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Award,
  Brain,
  Heart,
  Sparkles,
  Star,
  GraduationCap,
  Globe,
  Quote,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import PianoKeys from "@/components/PianoKeys";
import { PianoIcon, GuitarIcon, DrumIcon, DanceIcon, VocalIcon } from "@/components/Icons";

// --- FOUNDER DATA ---
const FOUNDER = {
  name: "Maestro Alexander Vance",
  role: "Founder & Executive Artistic Director",
  exp: "22+ Years International Exp",
  qualifications: "M.Mus Piano & Conducting (Royal Academy of Music, London), FTCL Fellow",
  specialization: "Concert Piano, Music Pedagogy & Academy Visionary",
  quote:
    "At 88 Keys, we don't simply teach instruments; we awaken the artistic spirit within every student. Music is a lifelong gift that builds confidence, intellect, and profound emotional joy.",
  bio:
    "Maestro Alexander Vance founded 88 Keys Music Studio in 2012 with a vision to revolutionize music education. Combining European conservatoire rigor with modern digital production and warm, encouraging mentorship, Alexander has guided over 500+ pianists and grade distinction holders worldwide.",
  achievements: [
    "Founded 88 Keys Music Studio in 2012",
    "Fellow of Trinity College London (FTCL)",
    "Conducted over 100+ International Symphony Recitals",
    "Awarded International Music Educator of the Year 2024",
  ],
  image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1000&auto=format&fit=crop",
};

// --- FACULTY DATA ---
const FACULTY = [
  {
    id: "elena",
    name: "Elena Rostova",
    department: "Piano",
    role: "Head of Piano Department",
    exp: "15+ Years Exp",
    qualifications: "Master of Music (Moscow Conservatory), Trinity Grade 8 FTCL",
    specialization: "Classical Piano, Concert Repertoire, ABRSM/Trinity Prep",
    bio: "Elena has performed with symphony orchestras across Europe and Asia. 100% of her exam candidates pass Trinity College examinations with Distinction.",
    languages: "English, Russian",
    quote: "Technique is the vehicle, but emotion is the true destination of music.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "marcus",
    name: "Marcus Vance",
    role: "Head of Guitar & Production",
    department: "Guitar",
    exp: "12+ Years Exp",
    qualifications: "B.Mus Guitar Performance (Berklee College of Music)",
    specialization: "Acoustic, Electric Rock, Blues Solos & Tone Design",
    bio: "Marcus has toured internationally with rock and jazz fusion groups. He works with students from initial chords to complex lead improvisation.",
    languages: "English, Spanish",
    quote: "Every chord you learn is a new color on your artistic canvas.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "sophia",
    name: "Sophia Lin",
    role: "Head of Dance & Choreography",
    department: "Dance",
    exp: "10+ Years Exp",
    qualifications: "BFA Dance Performance (Tisch School of the Arts)",
    specialization: "Contemporary Fusion, Hip-Hop Isolation, Stage Staging",
    bio: "Sophia brings unmatched energy and technical precision, guiding dancers across Contemporary, Street Dance, and stage showcase routines.",
    languages: "English, Mandarin",
    quote: "Dance is silent poetry in physical motion.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "david",
    name: "David Sterling",
    role: "Head of Drums & Percussion",
    department: "Drums",
    exp: "14+ Years Exp",
    qualifications: "B.Mus Percussion (Royal Academy of Music), Trinity Grade 8",
    specialization: "Acoustic Drumkit, Limb Independence, Jazz & Rock Rudiments",
    bio: "David is an official drum clinician who specializes in 4-limb independence, metronome timing, and dynamic soloing for acoustic and electronic kits.",
    languages: "English",
    quote: "Rhythm is the heartbeat that holds all music together.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "liam",
    name: "Liam O'Connor",
    role: "Acoustic & Fingerstyle Specialist",
    department: "Guitar",
    exp: "9+ Years Exp",
    qualifications: "Dip.Mus London College of Music",
    specialization: "Fingerstyle Acoustic, Folk, Pop & Songwriting",
    bio: "Liam makes fingerpicking and chord transitions effortless for beginner adults and teens through warm, patient 1-on-1 mentorship.",
    languages: "English",
    quote: "A single acoustic guitar can tell a story richer than words.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "clara",
    name: "Clara Mendoza",
    role: "Head of Vocal Coaching",
    department: "Vocals",
    exp: "11+ Years Exp",
    qualifications: "M.Mus Vocal Pedagogy (The Juilliard School)",
    specialization: "Vocal Dynamics, Breath Support, Opera & Pop Vocal Control",
    bio: "Clara helps singers unlock their natural vocal range without strain, building projection, pitch accuracy, and emotional stage connection.",
    languages: "English, Italian, Spanish",
    quote: "Your voice is the most personal instrument in the universe.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "nathaniel",
    name: "Nathaniel Cole",
    role: "Bass Guitar Specialist",
    department: "Bass",
    exp: "10+ Years Exp",
    qualifications: "B.Mus Bass Performance (Musicians Institute, LA)",
    specialization: "Slap Bass, Funk Grooves, Walking Basslines & Band Ensemble",
    bio: "Nathaniel is a groove architect who teaches bassists how to lock timing with drums and create infectious low-end rhythms.",
    languages: "English",
    quote: "Feel the low-end, lock the groove, and make the audience move.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  },
];

const PEDAGOGY_PILLARS = [
  {
    icon: Heart,
    title: "Encouragement & Patience",
    desc: "We create a warm, judgment-free environment where mistakes are celebrated as stepping stones to breakthrough moments.",
  },
  {
    icon: Brain,
    title: "Personalized Curriculum",
    desc: "No cookie-cutter lessons. Syllabi are tailored around each student's unique musical goals, pace, and favorite genres.",
  },
  {
    icon: Award,
    title: "Global Grade Standards",
    desc: "Our teaching methodologies align with Trinity College London, ABRSM, and Rockschool UK examination benchmarks.",
  },
  {
    icon: Sparkles,
    title: "Performance & Poise",
    desc: "We build audience confidence early through annual stage recitals, band jamming sessions, and auditorium concerts.",
  },
];

const DEPARTMENTS = ["All", "Piano", "Guitar", "Bass", "Drums", "Dance", "Vocals"];

export default function TeachersPage() {
  const [selectedDept, setSelectedDept] = useState("All");
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [selectedTeacherName, setSelectedTeacherName] = useState("Piano Mastery");

  const filteredFaculty =
    selectedDept === "All"
      ? FACULTY
      : FACULTY.filter((f) => f.department === selectedDept);

  const renderDeptIcon = (dept: string, className = "w-4 h-4") => {
    if (dept === "Guitar" || dept === "Bass") return <GuitarIcon className={className} />;
    if (dept === "Drums") return <DrumIcon className={className} />;
    if (dept === "Dance") return <DanceIcon className={className} />;
    if (dept === "Vocals") return <VocalIcon className={className} />;
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
        className="relative pt-32 pb-20 md:pt-40 md:pb-0 overflow-hidden bg-[#F7F2E7]"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-130 h-130 bg-[#B8863B]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-14 text-6xl text-[#17140F]/4 font-display select-none pointer-events-none animate-note-1">♪</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-7">
              <span className="w-6 h-px bg-[#B8863B]" />
              World-Class Mentors &amp; Educators
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold text-[#17140F] tracking-tight leading-[1.1] mb-6">
              Guided by Masters.
              <br />
              <span className="italic gradient-text-brass">Inspired by Passion.</span>
            </h1>

            <p className="text-lg text-[#4A4335] font-normal leading-relaxed mb-10 max-w-2xl mx-auto">
              Meet the visionary founder and master educators dedicated to empowering students of all ages through personalized music and dance instruction.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-xs font-mono uppercase tracking-wide text-[#4A4335] bg-[#EEE5D3] border border-[#17140F]/12 px-6 py-4 max-w-2xl mx-auto">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#B8863B]" />
                <span>20+ Certified Mentors</span>
              </div>
              <div className="w-px h-3 bg-[#17140F]/15 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#B8863B]" />
                <span>15+ Yrs Avg Experience</span>
              </div>
              <div className="w-px h-3 bg-[#17140F]/15 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-[#B8863B] text-[#B8863B]" />
                <span>100% Exam Pass Distinction</span>
              </div>
            </div>
          </motion.div>
        </div>

        <PianoKeys variant="light" keyCount={36} className="h-9" />
      </section>

      {/* -------------------------------------------------- */}
      {/* FOUNDER & VISIONARY SPOTLIGHT SECTION              */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#EEE5D3] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
              <span className="w-6 h-px bg-[#B8863B]" />
              Leadership Spotlight
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-4">
              Meet Our Founder &amp; Director
            </h2>
            <p className="text-[#4A4335] text-base sm:text-lg">
              Building a sanctuary where artistic passion meets educational excellence.
            </p>
          </div>

          {/* Founder Large Card */}
          <div className="relative bg-[#17140F] text-[#F7F2E7] overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#B8863B]/10 blur-[120px] pointer-events-none rounded-full" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 p-8 sm:p-12 relative z-10">
              {/* Founder Image */}
              <div className="lg:col-span-5 relative">
                <div className="relative overflow-hidden border-4 border-[#F7F2E7]/10 group">
                  <img
                    src={FOUNDER.image}
                    alt={FOUNDER.name}
                    className="w-full h-95 sm:h-110 object-cover grayscale-30 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#17140F]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#B8863B]">
                      Founder&apos;s Legacy
                    </span>
                    <h3 className="font-display text-xl font-semibold text-[#F7F2E7] mt-0.5">{FOUNDER.name}</h3>
                  </div>
                </div>
              </div>

              {/* Founder Details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#B8863B] border border-[#B8863B]/30 px-3 py-1">
                    {FOUNDER.exp}
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#F7F2E7] mt-4 mb-1">
                    {FOUNDER.name}
                  </h2>
                  <p className="text-sm font-bold text-[#B8863B]">{FOUNDER.role}</p>
                  <p className="text-xs text-[#B3A98F] mt-1 italic">{FOUNDER.qualifications}</p>
                </div>

                {/* Quote Box */}
                <div className="p-6 bg-[#F7F2E7]/5 border border-[#B8863B]/25 relative">
                  <Quote className="w-8 h-8 text-[#B8863B]/60 mb-2" />
                  <p className="text-sm sm:text-base italic text-[#F1E4C8] font-medium leading-relaxed">
                    “{FOUNDER.quote}”
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#B3A98F] leading-relaxed">
                  {FOUNDER.bio}
                </p>

                {/* Key Achievements */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {FOUNDER.achievements.map((ach, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-[#F7F2E7] font-medium">
                      <Check className="w-4 h-4 text-[#B8863B] shrink-0" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Founder CTA */}
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSelectedTeacherName("Piano Mastery");
                      setIsTrialModalOpen(true);
                    }}
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#B8863B] text-[#17140F] font-semibold text-sm rounded-sm hover:bg-[#F7F2E7] transition-colors duration-300 cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <span>Book Mentorship Session</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* THE MASTER FACULTY SECTION                         */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#F7F2E7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
                <span className="w-6 h-px bg-[#B8863B]" />
                Faculty Roster
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight">
                Our Master Instructors
              </h2>
            </div>

            {/* Department Filters */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar font-mono text-xs uppercase tracking-wider">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 border transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    selectedDept === dept
                      ? "bg-[#17140F] text-[#F7F2E7] border-[#17140F]"
                      : "bg-transparent text-[#4A4335] border-[#17140F]/15 hover:border-[#17140F]/40"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Master Faculty Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#17140F]/12 border border-[#17140F]/12">
            <AnimatePresence mode="popLayout">
              {filteredFaculty.map((teacher, idx) => (
                <motion.div
                  key={teacher.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="bg-[#F7F2E7] flex flex-col justify-between group"
                >
                  <div>
                    {/* Photo Frame */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-full h-full object-cover grayscale-30 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#17140F]/90 via-[#17140F]/15 to-transparent" />
                      <span className="absolute top-4 left-4 bg-[#17140F]/60 backdrop-blur-md border border-[#F7F2E7]/20 text-[#F7F2E7] text-[10px] font-mono uppercase tracking-wider px-3 py-1.5">
                        {teacher.exp}
                      </span>
                      <span className="absolute top-4 right-4 bg-[#F7F2E7] text-[#17140F] text-[10px] font-mono font-bold uppercase tracking-wide px-2.5 py-1.5 flex items-center gap-1.5">
                        {renderDeptIcon(teacher.department, "w-3 h-3")}
                        {teacher.department}
                      </span>
                      <div className="absolute bottom-4 left-4 right-4 text-[#F7F2E7]">
                        <h3 className="font-display text-xl font-semibold tracking-tight">{teacher.name}</h3>
                        <p className="text-xs text-[#B8863B] font-medium">{teacher.role}</p>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6">
                      <p className="text-xs text-[#4A4335] leading-relaxed mb-4">
                        {teacher.bio}
                      </p>

                      <div className="p-3 bg-[#EEE5D3] border border-[#17140F]/10 text-xs space-y-1.5 mb-4 text-[#4A4335]">
                        <p><strong className="text-[#17140F]">Qualifications:</strong> {teacher.qualifications}</p>
                        <p><strong className="text-[#17140F]">Specialty:</strong> {teacher.specialization}</p>
                        <p><strong className="text-[#17140F]">Languages:</strong> {teacher.languages}</p>
                      </div>

                      <p className="text-xs italic text-[#17140F] font-medium bg-[#F1E4C8] border-l-2 border-[#B8863B] p-3">
                        “{teacher.quote}”
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="px-6 pb-6 pt-2">
                    <button
                      onClick={() => {
                        setSelectedTeacherName(`${teacher.name} (${teacher.department})`);
                        setIsTrialModalOpen(true);
                      }}
                      className="w-full py-3 bg-[#17140F] text-[#F7F2E7] font-semibold text-xs rounded-sm hover:bg-[#B8863B] hover:text-[#17140F] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Book Trial With {teacher.name.split(" ")[0]}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* TEACHING PHILOSOPHIES                              */}
      {/* -------------------------------------------------- */}
      <section className="py-24 md:py-32 bg-[#EEE5D3] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-5">
              <span className="w-6 h-px bg-[#B8863B]" />
              The 88 Keys Philosophy
              <span className="w-6 h-px bg-[#B8863B]" />
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#17140F] tracking-tight mb-4">
              Our 4 Pillars of Music Pedagogy
            </h2>
            <p className="text-[#4A4335] text-base sm:text-lg">
              Every lesson at 88 Keys Studio is guided by core principles built to nurture long-term artistic success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#17140F]/12">
            {PEDAGOGY_PILLARS.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group relative p-8 border-r border-b border-[#17140F]/12 hover:bg-[#17140F] transition-colors duration-300"
                >
                  <div className="flex items-start justify-between mb-10">
                    <span className="font-mono text-xs text-[#B8863B]">{String(idx + 1).padStart(2, "0")}</span>
                    <IconComp className="w-5 h-5 text-[#17140F]/35 group-hover:text-[#B8863B] transition-colors duration-300" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#17140F] group-hover:text-[#F7F2E7] mb-3 transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#4A4335] group-hover:text-[#B3A98F] leading-relaxed transition-colors duration-300">
                    {pillar.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* BOOK FREE TRIAL CTA                                */}
      {/* -------------------------------------------------- */}
      <section className="pt-24 md:pt-32 bg-[#F7F2E7] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#17140F] text-[#F7F2E7] overflow-hidden">
            <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#B8863B] mb-7">
                <span className="w-6 h-px bg-[#B8863B]" />
                Zero Commitment • Free 30-Min Evaluation
                <span className="w-6 h-px bg-[#B8863B]" />
              </span>

              <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight mb-6 leading-tight">
                Learn From World-Class Educators
              </h2>

              <p className="text-[#B3A98F] text-base sm:text-lg mb-9 leading-relaxed">
                Book your free trial class today and get paired with a certified master instructor matching your musical goals.
              </p>

              <button
                onClick={() => setIsTrialModalOpen(true)}
                className="w-full sm:w-auto px-10 py-4.5 bg-[#B8863B] text-[#17140F] font-bold text-sm uppercase tracking-wide hover:bg-[#F7F2E7] transition-all duration-300 inline-flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Book Free Trial Class</span>
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
      {/* TRIAL BOOKING MODAL                                */}
      {/* -------------------------------------------------- */}
      <BookingModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        defaultCourse={selectedTeacherName}
      />
    </div>
  );
}
