"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  Plus, 
  Edit2, 
  Trash2, 
  LogOut, 
  Search, 
  Check, 
  AlertCircle, 
  Music, 
  FileText,
  Loader2,
  Clock,
  Upload,
  Image as ImageIcon,
  Bold,
  Italic,
  Heading3,
  List,
  Link2,
  Eye,
  Code,
  Camera,
  GraduationCap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getBlogSlug } from "@/lib/blog-utils";

interface BlogPost {
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

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  preferredDay: string;
  mode: string;
  createdAt: string;
}

interface AdminDashboardProps {
  initialBookings: Booking[];
  initialBlogs: BlogPost[];
}

export default function AdminDashboard({ initialBookings, initialBlogs }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"bookings" | "blogs" | "gallery" | "teachers">("bookings");
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);

  // Gallery items states
  interface GalleryItem {
    id: string;
    title: string;
    tag: string;
    department: string;
    image: string;
  }
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: "",
    tag: "",
    department: "Piano",
    image: "",
  });
  const [gallerySubmitting, setGallerySubmitting] = useState(false);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingGalleryImage, setUploadingGalleryImage] = useState(false);

  useEffect(() => {
    if (activeTab === "gallery") {
      loadGallery();
    }
  }, [activeTab]);

  async function loadGallery() {
    setGalleryLoading(true);
    setGalleryError(null);
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) {
        const data = await res.json();
        setGalleryItems(data);
      } else {
        setGalleryError("Failed to fetch gallery items.");
      }
    } catch (err) {
      console.error(err);
      setGalleryError("An error occurred while loading gallery.");
    } finally {
      setGalleryLoading(false);
    }
  }

  const handleAddGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryItem.title || !newGalleryItem.tag || !newGalleryItem.image) {
      setGalleryError("Please fill out all required fields.");
      return;
    }
    setGallerySubmitting(true);
    setGalleryError(null);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGalleryItem),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setGalleryItems(prev => [data.item, ...prev]);
        setNewGalleryItem({
          title: "",
          tag: "",
          department: "Piano",
          image: "",
        });
      } else {
        setGalleryError(data.error || "Failed to add gallery item.");
      }
    } catch (err) {
      console.error(err);
      setGalleryError("Failed to connect to the server.");
    } finally {
      setGallerySubmitting(false);
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;
    setGalleryError(null);
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setGalleryItems(prev => prev.filter(item => item.id !== id));
      } else {
        const data = await res.json();
        setGalleryError(data.error || "Failed to delete gallery item.");
      }
    } catch (err) {
      console.error(err);
      setGalleryError("Failed to connect to the server.");
    }
  };

  const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setGalleryError("Cloudinary configuration missing. Please add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to environment variables.");
      return;
    }

    setUploadingGalleryImage(true);
    setGalleryError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setNewGalleryItem(prev => ({ ...prev, image: data.secure_url }));
      } else {
        const errorData = await res.json().catch(() => ({}));
        setGalleryError(errorData.error?.message ?? "Failed to upload image to Cloudinary.");
      }
    } catch (err) {
      console.error("Gallery image upload error:", err);
      setGalleryError("Failed to upload gallery image due to network issue.");
    } finally {
      setUploadingGalleryImage(false);
      if (galleryFileInputRef.current) galleryFileInputRef.current.value = "";
    }
  };

  // Teacher states
  interface Teacher {
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
  }
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teachersLoading, setTeachersLoading] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Partial<Teacher> | null>(null);
  const [teacherSubmitting, setTeacherSubmitting] = useState(false);
  const [teacherError, setTeacherError] = useState<string | null>(null);
  const teacherFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingTeacherImage, setUploadingTeacherImage] = useState(false);

  useEffect(() => {
    if (activeTab === "teachers") {
      loadTeachers();
    }
  }, [activeTab]);

  async function loadTeachers() {
    setTeachersLoading(true);
    setTeacherError(null);
    try {
      const res = await fetch("/api/teachers");
      if (res.ok) {
        const data = await res.json();
        setTeachers(data);
      } else {
        setTeacherError("Failed to fetch teachers.");
      }
    } catch (err) {
      console.error(err);
      setTeacherError("An error occurred while loading teachers.");
    } finally {
      setTeachersLoading(false);
    }
  }

  const handleTeacherImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setTeacherError("Cloudinary configuration missing.");
      return;
    }

    setUploadingTeacherImage(true);
    setTeacherError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setEditingTeacher(prev => ({ ...prev, image: data.secure_url }));
      } else {
        const errorData = await res.json().catch(() => ({}));
        setTeacherError(errorData.error?.message ?? "Failed to upload image.");
      }
    } catch (err) {
      console.error(err);
      setTeacherError("Failed to upload image due to network issue.");
    } finally {
      setUploadingTeacherImage(false);
      if (teacherFileInputRef.current) teacherFileInputRef.current.value = "";
    }
  };

  const handleSaveTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !editingTeacher?.name ||
      !editingTeacher?.department ||
      !editingTeacher?.role ||
      !editingTeacher?.exp ||
      !editingTeacher?.qualifications ||
      !editingTeacher?.specialization ||
      !editingTeacher?.languages ||
      !editingTeacher?.bio ||
      !editingTeacher?.image
    ) {
      setTeacherError("Please fill out all required fields.");
      return;
    }

    setTeacherSubmitting(true);
    setTeacherError(null);

    try {
      const res = await fetch("/api/admin/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTeacher),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (editingTeacher.id) {
          setTeachers(prev => prev.map(t => t.id === editingTeacher.id ? data.teacher : t));
        } else {
          setTeachers(prev => [...prev, data.teacher]);
        }
        setEditingTeacher(null);
      } else {
        setTeacherError(data.error || "Failed to save teacher.");
      }
    } catch (err) {
      console.error(err);
      setTeacherError("Failed to connect to the server.");
    } finally {
      setTeacherSubmitting(false);
    }
  };

  const handleDeleteTeacher = async (id: string) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;
    setTeacherError(null);
    try {
      const res = await fetch(`/api/admin/teachers?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTeachers(prev => prev.filter(t => t.id !== id));
      } else {
        const data = await res.json();
        setTeacherError(data.error || "Failed to delete teacher.");
      }
    } catch (err) {
      console.error(err);
      setTeacherError("Failed to connect to the server.");
    }
  };
  
  // Bookings filtering
  const [bookingFilter, setBookingFilter] = useState("");
  
  // Blog form states
  const [editingBlog, setEditingBlog] = useState<Partial<BlogPost> | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [editorTab, setEditorTab] = useState<"write" | "preview">("write");
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMarkdown = (syntaxBefore: string, syntaxAfter: string = "") => {
    const textarea = contentTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const replacement = syntaxBefore + selectedText + syntaxAfter;

    const newContent = text.substring(0, start) + replacement + text.substring(end);
    
    setEditingBlog(prev => prev ? { ...prev, content: newContent } : null);

    // Reset cursor position after inserting
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + syntaxBefore.length,
        start + syntaxBefore.length + selectedText.length
      );
    }, 0);
  };

  function parseInlineMarkdown(text: string) {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    if (parts.length === 1) return text;
    
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="font-bold text-[#17140F]">{part}</strong>;
      }
      return part;
    });
  }

  function parseMarkdown(text: string) {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      if (!line.trim()) {
        return <div key={i} className="h-4" />;
      }
      
      if (line.startsWith("### ")) {
        return (
          <h3 key={i} className="font-display text-lg font-semibold text-[#17140F] mt-4 mb-2">
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2 key={i} className="font-display text-xl font-semibold text-[#17140F] mt-6 mb-2">
            {line.replace("## ", "")}
          </h2>
        );
      }
      
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li key={i} className="text-sm text-[#4A4335] ml-4 list-disc mb-1">
            {parseInlineMarkdown(line.substring(2))}
          </li>
        );
      }

      return (
        <p key={i} className="text-sm text-[#4A4335] mb-2 leading-relaxed">
          {parseInlineMarkdown(line)}
        </p>
      );
    });
  }
  
  // Action state
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  
  // Logout state
  const [loggingOut, setLoggingOut] = useState(false);

  // Cloudinary image upload ref and states
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const otherFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState<"hero" | "other" | null>(null);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: "hero" | "other") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (target === "other") {
      const currentImages = editingBlog?.otherImages || [];
      if (currentImages.length >= 5) {
        setFormError("You can upload a maximum of 5 secondary images.");
        return;
      }
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setFormError("Cloudinary configuration missing. Please add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to your environment variables.");
      return;
    }

    setUploadingImage(target);
    setFormError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (target === "hero") {
          setEditingBlog(prev => prev ? { ...prev, heroImage: data.secure_url, coverImage: data.secure_url } : null);
        } else {
          setEditingBlog(prev => {
            if (!prev) return null;
            const currentImages = prev.otherImages || [];
            return {
              ...prev,
              otherImages: [...currentImages, data.secure_url]
            };
          });
        }
      } else {
        const errorData = await res.json().catch(() => ({}));
        setFormError(errorData.error?.message ?? `Failed to upload ${target} image to Cloudinary.`);
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setFormError(`Failed to upload ${target} image due to network or configuration issue.`);
    } finally {
      setUploadingImage(null);
      if (target === "hero" && heroFileInputRef.current) heroFileInputRef.current.value = "";
      if (target === "other" && otherFileInputRef.current) otherFileInputRef.current.value = "";
    }
  };

  // Filter bookings based on input
  const filteredBookings = bookings.filter(b => 
    b.name.toLowerCase().includes(bookingFilter.toLowerCase()) ||
    b.email.toLowerCase().includes(bookingFilter.toLowerCase()) ||
    b.course.toLowerCase().includes(bookingFilter.toLowerCase()) ||
    b.phone.includes(bookingFilter)
  );

  // Open blog form for creating/editing
  const openBlogForm = (blog: BlogPost | null = null) => {
    if (blog) {
      setEditingBlog({
        ...blog,
        otherImages: blog.otherImages || (blog.otherImage ? [blog.otherImage] : [])
      });
    } else {
      setEditingBlog({
        title: "",
        author: "",
        excerpt: "",
        content: "",
        coverImage: "",
        heroImage: "",
        otherImage: "",
        otherImages: []
      });
    }
    setFormError(null);
    setEditorTab("write");
    setIsFormOpen(true);
  };

  // Submit blog creation/edition
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog || formSubmitting) return;

    if (!editingBlog.title || !editingBlog.author || !editingBlog.excerpt || !editingBlog.content) {
      setFormError("All fields except Cover Image are required.");
      return;
    }

    setFormSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingBlog),
      });

      const data = await res.json();

      if (res.ok) {
        // Refresh local list
        if (editingBlog.id) {
          setBlogs(blogs.map(b => b.id === data.blog.id ? data.blog : b));
        } else {
          setBlogs([data.blog, ...blogs]);
        }
        setIsFormOpen(false);
        setEditingBlog(null);
      } else {
        setFormError(data.error ?? "Failed to save blog post.");
      }
    } catch {
      setFormError("Failed to communicate with the server.");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Delete a blog post
  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    setActionLoadingId(id);

    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBlogs(blogs.filter(b => b.id !== id));
      } else {
        const data = await res.json();
        alert(data.error ?? "Failed to delete blog post.");
      }
    } catch {
      alert("Failed to delete blog post.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F2E7] text-[#17140F] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#17140F]/15 bg-[#F7F2E7] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[#17140F] flex items-center justify-center text-[#F7F2E7]">
              <span className="font-display font-semibold text-base tracking-tight">88</span>
            </div>
            <div>
              <span className="font-display font-semibold text-lg text-[#17140F] tracking-tight">
                Studio Management Portal
              </span>
              <p className="text-[10px] text-[#B8863B] font-mono uppercase tracking-widest">
                Administrator
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 px-4 py-2 border border-[#17140F]/15 text-sm font-semibold rounded-sm hover:bg-[#EEE5D3] hover:text-[#17140F] transition-all cursor-pointer disabled:opacity-60"
          >
            {loggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-[#EEE5D3]/40 border-b border-[#17140F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
          <button
            onClick={() => { setActiveTab("bookings"); setIsFormOpen(false); }}
            className={`py-4 px-6 font-medium text-sm border-b-2 flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === "bookings"
                ? "border-[#B8863B] text-[#17140F] font-semibold"
                : "border-transparent text-[#4A4335] hover:text-[#17140F]"
            }`}
          >
            <Music className="w-4 h-4" />
            <span>Bookings Log</span>
            <span className="ml-1.5 px-2 py-0.5 text-xs rounded-full bg-[#17140F] text-[#F7F2E7] font-mono">
              {bookings.length}
            </span>
          </button>
          <button
            onClick={() => { setActiveTab("blogs"); }}
            className={`py-4 px-6 font-medium text-sm border-b-2 flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === "blogs"
                ? "border-[#B8863B] text-[#17140F] font-semibold"
                : "border-transparent text-[#4A4335] hover:text-[#17140F]"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Blog Manager</span>
            <span className="ml-1.5 px-2 py-0.5 text-xs rounded-full bg-[#17140F] text-[#F7F2E7] font-mono">
              {blogs.length}
            </span>
          </button>
          <button
            onClick={() => { setActiveTab("gallery"); setIsFormOpen(false); }}
            className={`py-4 px-6 font-medium text-sm border-b-2 flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === "gallery"
                ? "border-[#B8863B] text-[#17140F] font-semibold"
                : "border-transparent text-[#4A4335] hover:text-[#17140F]"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Gallery Manager</span>
          </button>
          <button
            onClick={() => { setActiveTab("teachers"); setIsFormOpen(false); setEditingTeacher(null); }}
            className={`py-4 px-6 font-medium text-sm border-b-2 flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === "teachers"
                ? "border-[#B8863B] text-[#17140F] font-semibold"
                : "border-transparent text-[#4A4335] hover:text-[#17140F]"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Educator Manager</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* TAB: BOOKINGS */}
          {activeTab === "bookings" && (
            <motion.div
              key="bookings-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <h2 className="font-display text-2xl font-semibold text-[#17140F] self-start sm:self-center">
                  Consultations & Enquiries Received
                </h2>
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A4335]" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={bookingFilter}
                    onChange={(e) => setBookingFilter(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-[#17140F]/15 rounded-sm bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] focus:ring-1 focus:ring-[#B8863B] text-[#17140F]"
                  />
                </div>
              </div>

              {/* Bookings Table */}
              {filteredBookings.length === 0 ? (
                <div className="text-center py-16 border border-[#17140F]/10 bg-[#F1E4C8]/30 rounded-sm">
                  <Music className="w-8 h-8 text-[#B8863B] mx-auto mb-2 opacity-55" />
                  <p className="text-[#4A4335] text-sm">No bookings found matching your filters.</p>
                </div>
              ) : (
                <div className="bg-[#F7F2E7] border border-[#17140F]/15 rounded-sm overflow-hidden shadow-sm overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#EEE5D3]/60 border-b border-[#17140F]/15 text-[#17140F] font-bold">
                        <th className="p-4 font-semibold">Student</th>
                        <th className="p-4 font-semibold">Contact</th>
                        <th className="p-4 font-semibold">Program</th>
                        <th className="p-4 font-semibold">Preference</th>
                        <th className="p-4 font-semibold">Booked At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#17140F]/10">
                      {filteredBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-[#EEE5D3]/20 transition-colors">
                          <td className="p-4">
                            <span className="font-bold text-[#17140F]">{booking.name}</span>
                          </td>
                          <td className="p-4 space-y-0.5">
                            <div className="flex items-center gap-1.5 text-xs text-[#4A4335]">
                              <Mail className="w-3.5 h-3.5" />
                              <a href={`mailto:${booking.email}`} className="underline hover:text-[#17140F]">{booking.email}</a>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-[#4A4335]">
                              <Phone className="w-3.5 h-3.5" />
                              <a href={`tel:${booking.phone}`} className="hover:text-[#17140F]">{booking.phone}</a>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 text-xs font-mono font-medium bg-[#F1E4C8] border border-[#B8863B]/20 text-[#B8863B] rounded-sm">
                              {booking.course}
                            </span>
                          </td>
                          <td className="p-4 text-xs space-y-0.5 text-[#4A4335]">
                            <div>Mode: <span className="font-semibold text-[#17140F]">{booking.mode}</span></div>
                            <div>Day: <span className="font-semibold text-[#17140F]">{booking.preferredDay}</span></div>
                          </td>
                          <td className="p-4 text-xs text-[#4A4335] whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {formatDate(booking.createdAt)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB: BLOGS */}
          {activeTab === "blogs" && (
            <motion.div
              key="blogs-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {!isFormOpen ? (
                <>
                  {/* Title & Add button */}
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-2xl font-semibold text-[#17140F]">
                      Studio Blog Articles
                    </h2>
                    <button
                      onClick={() => openBlogForm(null)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-[#17140F] text-[#F7F2E7] text-sm font-semibold rounded-sm hover:bg-[#B8863B] hover:text-[#17140F] transition-all cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Write Article</span>
                    </button>
                  </div>

                  {/* Blogs list */}
                  {blogs.length === 0 ? (
                    <div className="text-center py-16 border border-[#17140F]/10 bg-[#F1E4C8]/30 rounded-sm">
                      <FileText className="w-8 h-8 text-[#B8863B] mx-auto mb-2 opacity-55" />
                      <p className="text-[#4A4335] text-sm">No blog posts found. Write your first post!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {blogs.map((post) => (
                        <div
                          key={post.id}
                          className="bg-[#F7F2E7] border border-[#17140F]/15 p-6 rounded-sm flex flex-col justify-between hover:shadow-md transition-all"
                        >
                          <div>
                            <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#B8863B] mb-2">
                              <span>{post.date}</span>
                              <span>•</span>
                              <span>By {post.author}</span>
                            </div>
                            <h3 className="font-display text-lg font-semibold text-[#17140F] mb-2 line-clamp-1">
                              {post.title}
                            </h3>
                            <p className="text-[#4A4335] text-xs leading-relaxed line-clamp-3 mb-6">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="flex items-center justify-end gap-2 border-t border-[#17140F]/10 pt-4">
                            <button
                              onClick={() => openBlogForm(post)}
                              disabled={actionLoadingId !== null}
                              className="p-2 text-[#4A4335] hover:text-[#17140F] hover:bg-[#EEE5D3] rounded-sm transition-colors cursor-pointer"
                              title="Edit Article"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(post.id)}
                              disabled={actionLoadingId !== null}
                              className="p-2 text-[#B8863B] hover:text-[#17140F] hover:bg-[#F1E4C8] rounded-sm transition-colors cursor-pointer"
                              title="Delete Article"
                            >
              {actionLoadingId === post.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                            <Link
                              href={`/blog/${getBlogSlug(post.title, post.id)}`}
                              target="_blank"
                              className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-[#17140F] hover:text-[#B8863B] transition-colors"
                            >
                              <span>View Live</span>
                              <Plus className="w-3.5 h-3.5 rotate-45" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <motion.div
                  key="blog-form"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#F7F2E7] border border-[#17140F]/15 p-6 sm:p-8 rounded-sm max-w-3xl mx-auto shadow-md"
                >
                  <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#17140F] mb-6">
                    {editingBlog?.id ? "Edit Blog Article" : "Write Blog Article"}
                  </h2>

                  <form onSubmit={handleBlogSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#17140F] mb-1">
                          Article Title * H1
                        </label>
                        <input
                          type="text"
                          required
                          value={editingBlog?.title || ""}
                          onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                          placeholder="e.g. 5 Tips for Practice"
                          className="w-full px-4 py-2.5 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#17140F] mb-1">
                          Author Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingBlog?.author || ""}
                          onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                          placeholder="e.g. Jane Doe"
                          className="w-full px-4 py-2.5 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17140F] mb-1">
                        Short Excerpt *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingBlog?.excerpt || ""}
                        onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                        placeholder="Brief summary of the article shown in the list."
                        className="w-full px-4 py-2.5 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B]"
                      />
                    </div>

                    {/* Hero Image Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#17140F] mb-1">
                          Hero Image / Cover Design
                        </label>
                        <input
                          type="text"
                          value={editingBlog?.heroImage || editingBlog?.coverImage || ""}
                          onChange={(e) => setEditingBlog({ ...editingBlog, heroImage: e.target.value, coverImage: e.target.value })}
                          placeholder="CSS gradient or https://res.cloudinary.com/..."
                          className="w-full px-4 py-2.5 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] font-mono text-xs"
                        />
                        <p className="text-[10px] text-[#4A4335] mt-0.5">Enter a CSS gradient or image URL, or upload via the button.</p>
                      </div>
                      
                      <div className="flex flex-col justify-end">
                        <label className="block text-xs font-bold text-[#17140F] mb-1">
                          Upload Hero Image to Cloudinary
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            ref={heroFileInputRef}
                            onChange={(e) => handleImageUpload(e, "hero")}
                            accept="image/*"
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => heroFileInputRef.current?.click()}
                            disabled={uploadingImage !== null}
                            className="flex items-center gap-2 px-4 py-2.5 bg-[#EEE5D3] border border-[#17140F]/15 text-[#17140F] text-sm font-semibold rounded-sm hover:bg-[#F1E4C8] transition-all cursor-pointer disabled:opacity-60 shrink-0"
                          >
                            {uploadingImage === "hero" ? (
                              <Loader2 className="w-4 h-4 animate-spin text-[#B8863B]" />
                            ) : (
                              <Upload className="w-4 h-4 text-[#B8863B]" />
                            )}
                            <span>{uploadingImage === "hero" ? "Uploading..." : "Upload Hero"}</span>
                          </button>
                          
                          {(editingBlog?.heroImage || editingBlog?.coverImage) && (
                            <div className="flex items-center gap-2 border border-[#17140F]/10 px-3 py-2 bg-[#F1E4C8]/30 rounded-sm overflow-hidden flex-1">
                              <ImageIcon className="w-4 h-4 text-[#B8863B] shrink-0" />
                              <span className="text-xs truncate font-mono text-[#4A4335]">
                                {(editingBlog.heroImage || editingBlog.coverImage || "").startsWith("http") ? "Uploaded Hero" : "Custom Gradient"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Secondary / Other Images Section */}
                    <div className="border border-[#17140F]/10 rounded-sm p-4 bg-[#F1E4C8]/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block text-xs font-bold text-[#17140F]">
                            Secondary / Other Images (Up to 5)
                          </label>
                          <p className="text-[10px] text-[#4A4335] mt-0.5">
                            Add additional visual assets to your blog article content.
                          </p>
                        </div>
                        
                        <div>
                          <input
                            type="file"
                            ref={otherFileInputRef}
                            onChange={(e) => handleImageUpload(e, "other")}
                            accept="image/*"
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => otherFileInputRef.current?.click()}
                            disabled={uploadingImage !== null || (editingBlog?.otherImages?.length || 0) >= 5}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EEE5D3] border border-[#17140F]/15 text-[#17140F] text-xs font-semibold rounded-sm hover:bg-[#F1E4C8] transition-all cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
                          >
                            {uploadingImage === "other" ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#B8863B]" />
                            ) : (
                              <Upload className="w-3.5 h-3.5 text-[#B8863B]" />
                            )}
                            <span>
                              {(editingBlog?.otherImages?.length || 0) >= 5 
                                ? "Limit Reached" 
                                : (uploadingImage === "other" ? "Uploading..." : "Add Image")}
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* List of uploaded secondary images */}
                      <div className="space-y-2">
                        {((editingBlog?.otherImages || []) as string[]).map((imgUrl, index) => (
                          <div key={index} className="flex items-center gap-3 bg-[#F7F2E7] border border-[#17140F]/10 p-2 rounded-sm">
                            {/* Preview thumbnail */}
                            <div className="w-12 h-12 bg-stone-200 border border-[#17140F]/15 rounded-sm overflow-hidden flex-shrink-0 flex items-center justify-center">
                              {imgUrl.startsWith("http") ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={imgUrl} alt={`Secondary ${index + 1}`} className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon className="w-5 h-5 text-stone-400" />
                              )}
                            </div>
                            
                            {/* URL Text input */}
                            <div className="flex-1 min-w-0">
                              <input
                                type="text"
                                value={imgUrl}
                                onChange={(e) => {
                                  const updatedUrls = [...(editingBlog?.otherImages || [])];
                                  updatedUrls[index] = e.target.value;
                                  setEditingBlog({ ...editingBlog, otherImages: updatedUrls });
                                }}
                                placeholder="https://res.cloudinary.com/..."
                                className="w-full px-2 py-1.5 rounded-sm border border-[#17140F]/10 bg-white text-xs focus:outline-none focus:border-[#B8863B] font-mono"
                              />
                            </div>

                            {/* Delete button */}
                            <button
                              type="button"
                              onClick={() => {
                                const updatedUrls = (editingBlog?.otherImages || []).filter((_, i) => i !== index);
                                setEditingBlog({ ...editingBlog, otherImages: updatedUrls });
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-sm transition-colors cursor-pointer"
                              title="Delete image"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        
                        {(!editingBlog?.otherImages || editingBlog.otherImages.length === 0) && (
                          <div className="text-center py-4 border border-dashed border-[#17140F]/15 rounded-sm bg-[#F7F2E7]/40 text-stone-500 text-xs">
                            No secondary images uploaded yet.
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-[#17140F]/15 pb-2">
                        <label className="text-xs font-bold text-[#17140F]">
                          Article Content (Supports Markdown ### and **bold**) *
                        </label>
                        
                        {/* Editor tabs */}
                        <div className="flex items-center gap-1 bg-[#EEE5D3] p-0.5 rounded-sm border border-[#17140F]/10">
                          <button
                            type="button"
                            onClick={() => setEditorTab("write")}
                            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-sm transition-all cursor-pointer ${
                              editorTab === "write" 
                                ? "bg-white text-[#17140F] shadow-sm" 
                                : "text-[#4A4335] hover:text-[#17140F]"
                            }`}
                          >
                            <Code className="w-3.5 h-3.5" />
                            <span>Write</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditorTab("preview")}
                            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-sm transition-all cursor-pointer ${
                              editorTab === "preview" 
                                ? "bg-white text-[#17140F] shadow-sm" 
                                : "text-[#4A4335] hover:text-[#17140F]"
                            }`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview</span>
                          </button>
                        </div>
                      </div>

                      {editorTab === "write" ? (
                        <div className="space-y-1.5 animate-fadeIn">
                          {/* Formatting toolbar */}
                          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#F1E4C8]/40 border border-[#17140F]/10 rounded-sm">
                            <button
                              type="button"
                              onClick={() => insertMarkdown("**", "**")}
                              className="p-1.5 hover:bg-[#EEE5D3] text-[#4A4335] hover:text-[#17140F] rounded-sm transition-colors cursor-pointer"
                              title="Bold (**bold**)"
                            >
                              <Bold className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => insertMarkdown("*", "*")}
                              className="p-1.5 hover:bg-[#EEE5D3] text-[#4A4335] hover:text-[#17140F] rounded-sm transition-colors cursor-pointer"
                              title="Italic (*italic*)"
                            >
                              <Italic className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => insertMarkdown("### ")}
                              className="p-1.5 hover:bg-[#EEE5D3] text-[#4A4335] hover:text-[#17140F] rounded-sm transition-colors cursor-pointer"
                              title="Heading 3 (### Heading)"
                            >
                              <Heading3 className="w-3.5 h-3.5" />
                            </button>
                            <div className="w-px h-4 bg-[#17140F]/15 mx-1" />
                            <button
                              type="button"
                              onClick={() => insertMarkdown("- ")}
                              className="p-1.5 hover:bg-[#EEE5D3] text-[#4A4335] hover:text-[#17140F] rounded-sm transition-colors cursor-pointer"
                              title="Bullet List (- list item)"
                            >
                              <List className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => insertMarkdown("[", "](url)")}
                              className="p-1.5 hover:bg-[#EEE5D3] text-[#4A4335] hover:text-[#17140F] rounded-sm transition-colors cursor-pointer"
                              title="Link ([Link Text](url))"
                            >
                              <Link2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          
                          <textarea
                            ref={contentTextareaRef}
                            required
                            rows={12}
                            value={editingBlog?.content || ""}
                            onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                            placeholder="Write your article content here (supports markdown, or use formatting buttons above)..."
                            className="w-full px-4 py-3 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] font-sans"
                          />
                        </div>
                      ) : (
                        <div className="w-full min-h-[280px] max-h-[360px] overflow-y-auto px-4 py-3 rounded-sm border border-[#17140F]/15 bg-white text-sm font-sans prose prose-stone animate-fadeIn">
                          {editingBlog?.content ? (
                            parseMarkdown(editingBlog.content)
                          ) : (
                            <span className="text-stone-400 italic">Nothing to preview yet. Write some content first!</span>
                          )}
                        </div>
                      )}
                    </div>

                    {formError && (
                      <div className="flex items-start gap-2 rounded-sm border border-[#B8863B]/40 bg-[#F1E4C8] px-3 py-2.5 text-xs text-[#17140F]">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-px text-[#B8863B]" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="flex gap-3 justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="px-5 py-2.5 border border-[#17140F]/15 text-sm font-semibold rounded-sm hover:bg-[#EEE5D3] transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={formSubmitting}
                        className="px-6 py-2.5 bg-[#17140F] text-[#F7F2E7] text-sm font-semibold rounded-sm hover:bg-[#B8863B] hover:text-[#17140F] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 shadow-md"
                      >
                        {formSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                        {editingBlog?.id ? "Save Changes" : "Publish Article"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* TAB: GALLERY */}
          {activeTab === "gallery" && (
            <motion.div
              key="gallery-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-semibold text-[#17140F]">
                  Studio Gallery Items
                </h2>
              </div>

              {galleryError && (
                <div role="alert" className="flex items-start gap-2 rounded-sm border border-[#B8863B]/40 bg-[#F1E4C8] px-3 py-2.5 text-xs text-[#17140F] max-w-xl">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-px text-[#B8863B]" />
                  <span>{galleryError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Add New Gallery Item Form (Left Column) */}
                <div className="lg:col-span-4 bg-[#F7F2E7] border border-[#17140F]/15 p-6 rounded-sm shadow-sm space-y-4">
                  <h3 className="font-display text-lg font-semibold text-[#17140F] border-b border-[#17140F]/10 pb-2 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#B8863B]" />
                    <span>Add New Media</span>
                  </h3>

                  <form onSubmit={handleAddGalleryItem} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#17140F] mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Slap Bass Masterclass Session"
                        value={newGalleryItem.title}
                        onChange={(e) => setNewGalleryItem(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] text-[#17140F]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#17140F] mb-1">
                          Category/Dept *
                        </label>
                        <select
                          value={newGalleryItem.department}
                          onChange={(e) => setNewGalleryItem(prev => ({ ...prev, department: e.target.value }))}
                          className="w-full px-3 py-2 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] text-[#17140F]"
                        >
                          <option value="Piano">Piano</option>
                          <option value="Guitar">Guitar</option>
                          <option value="Bass">Bass</option>
                          <option value="Drums">Drums</option>
                          <option value="Dance">Dance</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#17140F] mb-1">
                          Tag *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Concert"
                          value={newGalleryItem.tag}
                          onChange={(e) => setNewGalleryItem(prev => ({ ...prev, tag: e.target.value }))}
                          className="w-full px-3 py-2 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] text-[#17140F]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#17140F] mb-1 flex items-center justify-between">
                        <span>Image URL *</span>
                        <span className="text-[10px] text-[#B8863B] font-mono">Or upload below</span>
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="https://images.unsplash.com/..."
                        value={newGalleryItem.image}
                        onChange={(e) => setNewGalleryItem(prev => ({ ...prev, image: e.target.value }))}
                        className="w-full px-3 py-2 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] text-[#17140F]"
                      />
                    </div>

                    <div>
                      <input 
                        type="file" 
                        ref={galleryFileInputRef}
                        accept="image/*"
                        onChange={handleGalleryImageUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => galleryFileInputRef.current?.click()}
                        disabled={uploadingGalleryImage}
                        className="w-full py-2 border border-dashed border-[#17140F]/20 hover:border-[#B8863B] rounded-sm text-xs font-semibold text-[#4A4335] hover:text-[#17140F] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        {uploadingGalleryImage ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Upload className="w-3.5 h-3.5 text-[#B8863B]" />
                        )}
                        <span>{uploadingGalleryImage ? "Uploading to Cloudinary..." : "Upload Image to Cloudinary"}</span>
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={gallerySubmitting}
                      className="w-full py-2.5 bg-[#17140F] text-[#F7F2E7] font-semibold text-sm rounded-sm hover:bg-[#B8863B] hover:text-[#17140F] transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer shadow-md"
                    >
                      {gallerySubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                      <span>Upload to Gallery</span>
                    </button>
                  </form>
                </div>

                {/* Gallery List (Right Column) */}
                <div className="lg:col-span-8 bg-[#F7F2E7] border border-[#17140F]/15 p-6 rounded-sm shadow-sm space-y-4">
                  <h3 className="font-display text-lg font-semibold text-[#17140F] border-b border-[#17140F]/10 pb-2">
                    Existing Media ({galleryItems.length})
                  </h3>

                  {galleryLoading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <Loader2 className="w-8 h-8 animate-spin text-[#B8863B] mb-2" />
                      <p className="text-sm text-[#4A4335]">Loading gallery items...</p>
                    </div>
                  ) : galleryItems.length === 0 ? (
                    <div className="text-center py-16 bg-[#F1E4C8]/30 rounded-sm border border-[#17140F]/10">
                      <Camera className="w-8 h-8 text-[#B8863B] mx-auto mb-2 opacity-50" />
                      <p className="text-[#4A4335] text-sm">No items in the gallery yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2 no-scrollbar">
                      {galleryItems.map((item) => (
                        <div
                          key={item.id}
                          className="relative rounded-sm border border-[#17140F]/15 overflow-hidden group shadow-sm bg-[#17140F]"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-32 object-cover transition-opacity duration-300 group-hover:opacity-40"
                          />
                          {/* Trash button overlay */}
                          <button
                            onClick={() => handleDeleteGalleryItem(item.id)}
                            className="absolute top-2 right-2 p-1.5 bg-[#F7F2E7] text-[#B8863B] hover:text-[#F7F2E7] hover:bg-[#B8863B] rounded-sm transition-colors opacity-0 group-hover:opacity-100 shadow-md cursor-pointer z-10"
                            title="Delete Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          {/* Hover Info details overlay */}
                          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#17140F] to-transparent text-[#F7F2E7] translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="inline-block px-1.5 py-0.5 text-[8px] font-mono uppercase bg-[#B8863B] text-[#17140F] font-bold rounded-sm mb-1.5">
                              {item.department} • {item.tag}
                            </span>
                            <h4 className="text-xs font-semibold truncate leading-tight">{item.title}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB: TEACHERS */}
          {activeTab === "teachers" && (
            <motion.div
              key="teachers-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-semibold text-[#17140F]">
                  Educator Portfolio Manager
                </h2>
              </div>

              {teacherError && (
                <div role="alert" className="flex items-start gap-2 rounded-sm border border-[#B8863B]/40 bg-[#F1E4C8] px-3 py-2.5 text-xs text-[#17140F] max-w-xl">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-px text-[#B8863B]" />
                  <span>{teacherError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Form column (Left) */}
                <div className="lg:col-span-5 bg-[#F7F2E7] border border-[#17140F]/15 p-6 rounded-sm shadow-sm space-y-4">
                  <h3 className="font-display text-lg font-semibold text-[#17140F] border-b border-[#17140F]/10 pb-2 flex items-center justify-between">
                    <span>{editingTeacher?.id ? "Edit Educator" : "Add New Educator"}</span>
                    {!editingTeacher?.id && (
                      <button
                        onClick={() => setEditingTeacher({ name: "", department: "Piano", role: "", exp: "", qualifications: "", specialization: "", languages: "English", bio: "", image: "", achievements: "", quote: "" })}
                        className="text-xs text-[#B8863B] font-semibold hover:underline"
                      >
                        Start Form
                      </button>
                    )}
                  </h3>

                  {editingTeacher ? (
                    <form onSubmit={handleSaveTeacher} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#17140F] mb-1">Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Elena Rostova"
                            value={editingTeacher.name || ""}
                            onChange={(e) => setEditingTeacher(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] text-[#17140F]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#17140F] mb-1">Department *</label>
                          <select
                            value={editingTeacher.department || "Piano"}
                            onChange={(e) => setEditingTeacher(prev => ({ ...prev, department: e.target.value }))}
                            className="w-full px-3 py-2 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] text-[#17140F]"
                          >
                            <option value="Piano">Piano</option>
                            <option value="Guitar">Guitar</option>
                            <option value="Bass">Bass</option>
                            <option value="Drums">Drums</option>
                            <option value="Dance">Dance</option>
                            <option value="Vocals">Vocals</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#17140F] mb-1">Role *</label>
                          <input
                            type="text"
                            required
                            placeholder="Head of Piano Department"
                            value={editingTeacher.role || ""}
                            onChange={(e) => setEditingTeacher(prev => ({ ...prev, role: e.target.value }))}
                            className="w-full px-3 py-2 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] text-[#17140F]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#17140F] mb-1">Experience *</label>
                          <input
                            type="text"
                            required
                            placeholder="15+ Years Exp"
                            value={editingTeacher.exp || ""}
                            onChange={(e) => setEditingTeacher(prev => ({ ...prev, exp: e.target.value }))}
                            className="w-full px-3 py-2 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] text-[#17140F]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#17140F] mb-1">Languages *</label>
                          <input
                            type="text"
                            required
                            placeholder="English, Russian"
                            value={editingTeacher.languages || ""}
                            onChange={(e) => setEditingTeacher(prev => ({ ...prev, languages: e.target.value }))}
                            className="w-full px-3 py-2 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] text-[#17140F]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#17140F] mb-1">Qualifications *</label>
                          <input
                            type="text"
                            required
                            placeholder="Master of Music"
                            value={editingTeacher.qualifications || ""}
                            onChange={(e) => setEditingTeacher(prev => ({ ...prev, qualifications: e.target.value }))}
                            className="w-full px-3 py-2 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] text-[#17140F]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#17140F] mb-1">Specialization *</label>
                        <input
                          type="text"
                          required
                          placeholder="Classical Piano, Concert Repertoire"
                          value={editingTeacher.specialization || ""}
                          onChange={(e) => setEditingTeacher(prev => ({ ...prev, specialization: e.target.value }))}
                          className="w-full px-3 py-2 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] text-[#17140F]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#17140F] mb-1">Bio Profile *</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Short bio description..."
                          value={editingTeacher.bio || ""}
                          onChange={(e) => setEditingTeacher(prev => ({ ...prev, bio: e.target.value }))}
                          className="w-full px-3 py-2 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] text-[#17140F]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#17140F] mb-1">Key Achievements</label>
                          <input
                            type="text"
                            placeholder="e.g. 100% Distinction rate"
                            value={editingTeacher.achievements || ""}
                            onChange={(e) => setEditingTeacher(prev => ({ ...prev, achievements: e.target.value }))}
                            className="w-full px-3 py-2 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] text-[#17140F]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#17140F] mb-1">Inspirational Quote</label>
                          <input
                            type="text"
                            placeholder="Technique is the vehicle..."
                            value={editingTeacher.quote || ""}
                            onChange={(e) => setEditingTeacher(prev => ({ ...prev, quote: e.target.value }))}
                            className="w-full px-3 py-2 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] text-[#17140F]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#17140F] mb-1">Profile Photo URL *</label>
                        <input
                          type="url"
                          required
                          placeholder="https://images.unsplash.com/..."
                          value={editingTeacher.image || ""}
                          onChange={(e) => setEditingTeacher(prev => ({ ...prev, image: e.target.value }))}
                          className="w-full px-3 py-2 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] text-[#17140F]"
                        />
                      </div>

                      <div>
                        <input 
                          type="file" 
                          ref={teacherFileInputRef}
                          accept="image/*"
                          onChange={handleTeacherImageUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => teacherFileInputRef.current?.click()}
                          disabled={uploadingTeacherImage}
                          className="w-full py-2 border border-dashed border-[#17140F]/20 hover:border-[#B8863B] rounded-sm text-xs font-semibold text-[#4A4335] hover:text-[#17140F] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          {uploadingTeacherImage ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Upload className="w-3.5 h-3.5 text-[#B8863B]" />
                          )}
                          <span>{uploadingTeacherImage ? "Uploading to Cloudinary..." : "Upload Profile Photo to Cloudinary"}</span>
                        </button>
                      </div>

                      <div className="flex gap-3 justify-end pt-2 border-t border-[#17140F]/10">
                        <button
                          type="button"
                          onClick={() => setEditingTeacher(null)}
                          className="px-4 py-2 border border-[#17140F]/15 text-xs font-semibold rounded-sm hover:bg-[#EEE5D3] transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={teacherSubmitting}
                          className="px-5 py-2 bg-[#17140F] text-[#F7F2E7] text-xs font-semibold rounded-sm hover:bg-[#B8863B] hover:text-[#17140F] transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-60 shadow-md"
                        >
                          {teacherSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                          <span>{editingTeacher.id ? "Save Changes" : "Create Educator"}</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-16 bg-[#F1E4C8]/30 rounded-sm border border-dashed border-[#17140F]/10">
                      <GraduationCap className="w-8 h-8 text-[#B8863B] mx-auto mb-2 opacity-50" />
                      <p className="text-sm text-[#4A4335] mb-4">Click below to start writing a new profile.</p>
                      <button
                        onClick={() => setEditingTeacher({ name: "", department: "Piano", role: "", exp: "", qualifications: "", specialization: "", languages: "English", bio: "", image: "", achievements: "", quote: "" })}
                        className="px-4 py-2 bg-[#17140F] text-[#F7F2E7] text-xs font-semibold rounded-sm hover:bg-[#B8863B] hover:text-[#17140F] transition-all cursor-pointer shadow-sm"
                      >
                        Add Educator Profile
                      </button>
                    </div>
                  )}
                </div>

                {/* Listing column (Right) */}
                <div className="lg:col-span-7 bg-[#F7F2E7] border border-[#17140F]/15 p-6 rounded-sm shadow-sm space-y-4">
                  <h3 className="font-display text-lg font-semibold text-[#17140F] border-b border-[#17140F]/10 pb-2">
                    Current Faculty ({teachers.length})
                  </h3>

                  {teachersLoading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <Loader2 className="w-8 h-8 animate-spin text-[#B8863B] mb-2" />
                      <p className="text-sm text-[#4A4335]">Loading educators...</p>
                    </div>
                  ) : teachers.length === 0 ? (
                    <div className="text-center py-16 bg-[#F1E4C8]/30 rounded-sm border border-[#17140F]/10">
                      <p className="text-[#4A4335] text-sm">No educators configured in the database.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
                      {teachers.map((t) => (
                        <div
                          key={t.id}
                          className="p-3 bg-[#F7F2E7] border border-[#17140F]/10 rounded-sm flex items-start gap-4 hover:border-[#B8863B] transition-colors"
                        >
                          <img
                            src={t.image}
                            alt={t.name}
                            className="w-16 h-16 rounded-sm object-cover border border-[#17140F]/10 bg-stone-100"
                          />
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="font-display text-sm font-semibold text-[#17140F] truncate">{t.name}</h4>
                              <span className="shrink-0 px-2 py-0.5 text-[8px] font-mono font-bold bg-[#B8863B]/20 text-[#B8863B] border border-[#B8863B]/20 rounded-sm">
                                {t.department}
                              </span>
                            </div>
                            <p className="text-xs text-[#17140F] font-semibold mt-0.5">{t.role}</p>
                            <p className="text-[10px] text-[#4A4335] mt-1 font-mono">{t.exp} • {t.languages}</p>
                            <p className="text-[10px] text-[#4A4335] mt-0.5 truncate italic font-sans">"{t.quote || t.specialization}"</p>
                          </div>
                          <div className="flex shrink-0 gap-1.5 self-center">
                            <button
                              onClick={() => setEditingTeacher(t)}
                              className="p-1.5 text-[#4A4335] hover:text-[#17140F] hover:bg-[#EEE5D3] rounded-sm transition-colors cursor-pointer"
                              title="Edit Profile"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteTeacher(t.id)}
                              className="p-1.5 text-[#B8863B] hover:text-[#17140F] hover:bg-[#F1E4C8] rounded-sm transition-colors cursor-pointer"
                              title="Delete Profile"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
