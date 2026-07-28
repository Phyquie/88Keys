import React from "react";
import { Music, Mic, Zap, Sparkles, Sliders, Activity, Disc, Volume2, Flame } from "lucide-react";

export function PianoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M6 4v10" />
      <path d="M10 4v10" />
      <path d="M14 4v10" />
      <path d="M18 4v10" />
      <rect x="4.5" y="4" width="3" height="6" fill="currentColor" />
      <rect x="8.5" y="4" width="3" height="6" fill="currentColor" />
      <rect x="14.5" y="4" width="3" height="6" fill="currentColor" />
      <rect x="18.5" y="4" width="1.5" height="6" fill="currentColor" />
    </svg>
  );
}

export function GuitarIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 5-3 3" />
      <path d="m21 3-3 3" />
      <path d="m15 9-8 8a3.5 3.5 0 1 1-5-5l8-8" />
      <circle cx="10" cy="10" r="1.5" />
    </svg>
  );
}

export function DrumIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="7" rx="9" ry="3" />
      <path d="M3 7v10c0 1.66 4.03 3 9 3s9-1.34 9-3V7" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      <path d="M7 4 2 2" />
      <path d="M17 4l5-2" />
    </svg>
  );
}

export function DanceIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2" />
      <path d="M8 22l3-7-2-5 3-2 4 4" />
      <path d="M16 11l-3 4 3 7" />
      <path d="M7 10l5-2" />
    </svg>
  );
}

export function SynthIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="6" cy="10" r="1" />
      <circle cx="10" cy="10" r="1" />
      <line x1="14" y1="9" x2="18" y2="9" />
      <line x1="14" y1="11" x2="18" y2="11" />
      <path d="M4 14h16" />
      <path d="M6 14v4" />
      <path d="M9 14v4" />
      <path d="M12 14v4" />
      <path d="M15 14v4" />
      <path d="M18 14v4" />
    </svg>
  );
}

export function VocalIcon({ className = "w-6 h-6" }: { className?: string }) {
  return <Mic className={className} />;
}

export function ElectricIcon({ className = "w-6 h-6" }: { className?: string }) {
  return <Zap className={className} />;
}
