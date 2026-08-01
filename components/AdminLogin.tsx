"use client";

import React, { useState } from "react";
import { Lock, Loader2, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        // Refresh to reload the server-side auth status
        window.location.reload();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Incorrect password. Please try again.");
      }
    } catch {
      setError("Failed to connect to the login service.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F7F2E7]">
      <div className="w-full max-w-md bg-[#F7F2E7] border border-[#17140F]/15 p-8 shadow-xl rounded-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-sm bg-[#F1E4C8] text-[#B8863B] flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display font-semibold text-xl text-[#17140F]">
              Admin Portal
            </h1>
            <p className="text-xs text-[#4A4335]">88 Keys Music &amp; Dance Academy</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#17140F] mb-1.5">
              Username
            </label>
            <input
              type="text"
              required
              placeholder="e.g. admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] focus:ring-2 focus:ring-[#B8863B]/20 placeholder-[#4A4335]/30 text-[#17140F]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17140F] mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-sm border border-[#17140F]/15 bg-[#F7F2E7] text-sm focus:outline-none focus:border-[#B8863B] focus:ring-2 focus:ring-[#B8863B]/20 placeholder-[#4A4335]/30 text-[#17140F]"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-sm border border-[#B8863B]/40 bg-[#F1E4C8] px-3 py-2.5 text-xs text-[#17140F]">
              <AlertCircle className="w-4 h-4 shrink-0 mt-px text-[#B8863B]" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-[#17140F] text-[#F7F2E7] font-semibold text-sm rounded-sm hover:bg-[#B8863B] hover:text-[#17140F] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {submitting ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
