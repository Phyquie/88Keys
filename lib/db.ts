import mongoose from "mongoose";
import crypto from "crypto";
import { dbConnect } from "./mongodb";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  coverImage?: string;
  heroImage?: string;
  otherImage?: string;
  otherImages?: string[];
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  preferredDay: string;
  mode: string;
  message?: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  department: string;
  image: string;
  createdAt?: string;
}

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  salt: string;
  role: string;
}

export interface Teacher {
  id: string;
  name: string;
  department: string;
  role: string;
  exp: string;
  qualifications: string;
  specialization: string;
  languages: string;
  bio: string;
  image: string;
  achievements?: string;
  quote?: string;
  createdAt?: string;
}

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  coverImage: { type: String },
  heroImage: { type: String },
  otherImage: { type: String },
  otherImages: { type: [String], default: [] },
}, { timestamps: true });

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true },
  preferredDay: { type: String, required: true },
  mode: { type: String, required: true },
  message: { type: String },
}, { timestamps: true });

const GallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  tag: { type: String, required: true },
  department: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  salt: { type: String, required: true },
  role: { type: String, required: true, default: "admin" }
}, { timestamps: true });

const BlogPostModel = mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
const BookingModel = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
const GalleryModel = mongoose.models.Gallery || mongoose.model("Gallery", GallerySchema);
export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  role: { type: String, required: true },
  exp: { type: String, required: true },
  qualifications: { type: String, required: true },
  specialization: { type: String, required: true },
  languages: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String, required: true },
  achievements: { type: String },
  quote: { type: String },
}, { timestamps: true });

const TeacherModel = mongoose.models.Teacher || mongoose.model("Teacher", TeacherSchema);


export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

async function ensureInitialized() {
  await dbConnect();
}

function serializeBlogPost(doc: any): BlogPost {
  return {
    id: doc._id.toString(),
    title: doc.title,
    excerpt: doc.excerpt,
    content: doc.content,
    date: doc.date || new Date(doc.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    author: doc.author,
    coverImage: doc.coverImage || "",
    heroImage: doc.heroImage || "",
    otherImage: doc.otherImage || "",
    otherImages: doc.otherImages || [],
  };
}

function serializeBooking(doc: any): Booking {
  return {
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    phone: doc.phone,
    course: doc.course,
    preferredDay: doc.preferredDay,
    mode: doc.mode,
    message: doc.message || "",
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : doc.createdAt,
  };
}

export async function getBlogs(): Promise<BlogPost[]> {
  await ensureInitialized();
  const blogs = await BlogPostModel.find({}).sort({ createdAt: -1 });
  return blogs.map(serializeBlogPost);
}

export async function getBlogById(id: string): Promise<BlogPost | undefined> {
  await ensureInitialized();
  try {
    const blog = await BlogPostModel.findById(id);
    return blog ? serializeBlogPost(blog) : undefined;
  } catch (error) {
    console.error(`Error fetching blog by ID ${id}:`, error);
    return undefined;
  }
}

export async function saveBlog(blog: Omit<BlogPost, "id" | "date"> & { id?: string; date?: string }): Promise<BlogPost> {
  await ensureInitialized();
  let savedDoc;
  const formattedDate = blog.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  try {
    if (blog.id) {
      savedDoc = await BlogPostModel.findByIdAndUpdate(
        blog.id,
        {
          title: blog.title,
          excerpt: blog.excerpt,
          content: blog.content,
          author: blog.author,
          coverImage: blog.coverImage || "",
          heroImage: blog.heroImage || "",
          otherImage: blog.otherImage || "",
          otherImages: blog.otherImages || [],
          date: formattedDate
        },
        { new: true }
      );
      if (!savedDoc) {
        throw new Error(`Blog post with ID ${blog.id} not found`);
      }
    } else {
      savedDoc = await BlogPostModel.create({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        author: blog.author,
        coverImage: blog.coverImage || "linear-gradient(135deg, #17140F 0%, #B8863B 100%)",
        heroImage: blog.heroImage || "",
        otherImage: blog.otherImage || "",
        otherImages: blog.otherImages || [],
        date: formattedDate
      });
    }
    return serializeBlogPost(savedDoc);
  } catch (error) {
    console.error("Error saving blog post:", error);
    throw error;
  }
}

export async function deleteBlog(id: string): Promise<boolean> {
  await ensureInitialized();
  try {
    const result = await BlogPostModel.findByIdAndDelete(id);
    return !!result;
  } catch (error) {
    console.error(`Error deleting blog by ID ${id}:`, error);
    return false;
  }
}

export async function getBookings(): Promise<Booking[]> {
  await ensureInitialized();
  try {
    const bookings = await BookingModel.find({}).sort({ createdAt: -1 });
    return bookings.map(serializeBooking);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
}

export async function saveBooking(bookingData: Omit<Booking, "id" | "createdAt">): Promise<Booking> {
  await ensureInitialized();
  try {
    const newBooking = await BookingModel.create(bookingData);
    return serializeBooking(newBooking);
  } catch (error) {
    console.error("Error saving booking:", error);
    throw error;
  }
}

function serializeGalleryItem(doc: any): GalleryItem {
  return {
    id: doc._id.toString(),
    title: doc.title,
    tag: doc.tag,
    department: doc.department,
    image: doc.image,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : doc.createdAt,
  };
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  await ensureInitialized();
  try {
    const items = await GalleryModel.find({}).sort({ createdAt: -1 });
    return items.map(serializeGalleryItem);
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return [];
  }
}

export async function saveGalleryItem(itemData: Omit<GalleryItem, "id" | "createdAt">): Promise<GalleryItem> {
  await ensureInitialized();
  try {
    const newItem = await GalleryModel.create(itemData);
    return serializeGalleryItem(newItem);
  } catch (error) {
    console.error("Error saving gallery item:", error);
    throw error;
  }
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  await ensureInitialized();
  try {
    const result = await GalleryModel.findByIdAndDelete(id);
    return !!result;
  } catch (error) {
    console.error(`Error deleting gallery item by ID ${id}:`, error);
    return false;
  }
}

// Default items to seed if DB is empty
export const DEFAULT_GALLERY_ITEMS = [
  { title: "Student Playing Yamaha Grand Piano", tag: "Concert", department: "Piano", image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800&auto=format&fit=crop" },
  { title: "1-on-1 Instructor Mentorship Session", tag: "Studio", department: "Piano", image: "https://images.unsplash.com/photo-1525994886773-080587e161c2?q=80&w=800&auto=format&fit=crop" },
  { title: "Young Piano Prodigy Practice", tag: "Kids Class", department: "Piano", image: "https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=800&auto=format&fit=crop" },
  { title: "Annual Piano Recital Auditorium", tag: "Stage Performance", department: "Piano", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop" },
  { title: "Trinity Grade Exam Preparation", tag: "Examination", department: "Piano", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop" },
  { title: "Adult Piano Masterclass Session", tag: "Workshop", department: "Piano", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop" },
  { title: "Acoustic Fingerstyle Masterclass", tag: "Studio Jam", department: "Guitar", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800&auto=format&fit=crop" },
  { title: "Electric Guitar Amp & Pedal FX Setup", tag: "Tone Lab", department: "Guitar", image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?q=80&w=800&auto=format&fit=crop" },
  { title: "Youth Band Stage Rehearsal", tag: "Live Concert", department: "Guitar", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop" },
  { title: "Rockschool Grade Exam Prep", tag: "Certification", department: "Guitar", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop" },
  { title: "Slap Bass Studio Recording Session", tag: "Studio Jam", department: "Bass", image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?q=80&w=800&auto=format&fit=crop" },
  { title: "Band Rehearsal Drum & Bass Locking", tag: "Ensemble", department: "Bass", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop" },
  { title: "Fender Bass Tone & Amp Setup", tag: "Gear", department: "Bass", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop" },
  { title: "Rockschool Bass Grade Examination", tag: "Certification", department: "Bass", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop" },
  { title: "Yamaha Acoustic Drumkit Session", tag: "Drum Room", department: "Drums", image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=800&auto=format&fit=crop" },
  { title: "Young Drum Prodigy Rudiments", tag: "Kids Class", department: "Drums", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop" },
  { title: "Live Concert Stage Drum Performance", tag: "Stage Spotlight", department: "Drums", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop" },
  { title: "Rockschool Drum Grade Exam Prep", tag: "Certification", department: "Drums", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop" },
  { title: "Contemporary Dance Rehearsal", tag: "Studio", department: "Dance", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop" },
  { title: "Urban Hip-Hop Crew Choreography", tag: "Hip-Hop", department: "Dance", image: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=800&auto=format&fit=crop" },
  { title: "Youth Dance Recital Showcase", tag: "Kids Showcase", department: "Dance", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop" },
  { title: "Stage Lighting Performance", tag: "Auditorium", department: "Dance", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=800&auto=format&fit=crop" }
];

export async function seedGalleryItemsIfEmpty() {
  await ensureInitialized();
  try {
    const count = await GalleryModel.countDocuments();
    if (count === 0) {
      console.log("Seeding default gallery items...");
      await GalleryModel.insertMany(DEFAULT_GALLERY_ITEMS);
    }
  } catch (error) {
    console.error("Failed to seed gallery items:", error);
  }
}

function serializeTeacher(doc: any): Teacher {
  return {
    id: doc._id.toString(),
    name: doc.name,
    department: doc.department,
    role: doc.role,
    exp: doc.exp,
    qualifications: doc.qualifications,
    specialization: doc.specialization,
    languages: doc.languages,
    bio: doc.bio,
    image: doc.image,
    achievements: doc.achievements || "",
    quote: doc.quote || "",
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : doc.createdAt,
  };
}

export async function getTeachers(filter: { department?: string } = {}): Promise<Teacher[]> {
  await ensureInitialized();
  try {
    const query = filter.department ? { department: filter.department } : {};
    const teachers = await TeacherModel.find(query).sort({ createdAt: 1 });
    return teachers.map(serializeTeacher);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return [];
  }
}

export async function saveTeacher(teacherData: Omit<Teacher, "id" | "createdAt"> & { id?: string }): Promise<Teacher> {
  await ensureInitialized();
  try {
    let savedDoc;
    if (teacherData.id) {
      savedDoc = await TeacherModel.findByIdAndUpdate(
        teacherData.id,
        {
          name: teacherData.name,
          department: teacherData.department,
          role: teacherData.role,
          exp: teacherData.exp,
          qualifications: teacherData.qualifications,
          specialization: teacherData.specialization,
          languages: teacherData.languages,
          bio: teacherData.bio,
          image: teacherData.image,
          achievements: teacherData.achievements || "",
          quote: teacherData.quote || "",
        },
        { new: true }
      );
      if (!savedDoc) throw new Error(`Teacher with ID ${teacherData.id} not found`);
    } else {
      savedDoc = await TeacherModel.create(teacherData);
    }
    return serializeTeacher(savedDoc);
  } catch (error) {
    console.error("Error saving teacher:", error);
    throw error;
  }
}

export async function deleteTeacher(id: string): Promise<boolean> {
  await ensureInitialized();
  try {
    const result = await TeacherModel.findByIdAndDelete(id);
    return !!result;
  } catch (error) {
    console.error(`Error deleting teacher by ID ${id}:`, error);
    return false;
  }
}

export const DEFAULT_TEACHERS = [
  {
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
    achievements: "100% Distinction rate • Moscow Recital Soloist",
  },
  {
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
    achievements: "Toured 15+ countries • Berklee Performance Scholar",
  },
  {
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
    achievements: "Choreographed for TV • Tisch Honor Graduate",
  },
  {
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
    achievements: "Official Drum Clinician • Over 200+ students trained",
  },
  {
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
    achievements: "Acoustic Stage Winner 2021 • Over 120+ students trained",
  },
  {
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
    achievements: "Juilliard Masters Graduate • Trained award-winning pop vocalists",
  },
  {
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
    achievements: "Session bassist for national touring bands",
  }
];

export async function seedTeachersIfEmpty() {
  await ensureInitialized();
  try {
    const count = await TeacherModel.countDocuments();
    if (count === 0) {
      console.log("Seeding default teachers...");
      await TeacherModel.insertMany(DEFAULT_TEACHERS);
    }
  } catch (error) {
    console.error("Failed to seed teachers:", error);
  }
}
