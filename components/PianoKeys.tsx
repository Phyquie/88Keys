import React from "react";

interface PianoKeysProps {
  keyCount?: number;
  variant?: "light" | "dark";
  className?: string;
}

// Black keys sit after the 1st, 2nd, 4th, 5th, 6th white key of every 7-key octave (C D E F G A B).
const BLACK_KEY_OFFSETS = [0, 1, 3, 4, 5];

export default function PianoKeys({ keyCount = 21, variant = "light", className = "" }: PianoKeysProps) {
  const whiteBg = variant === "light" ? "bg-[#F7F2E7]" : "bg-[#17140F]";
  const whiteBorder = variant === "light" ? "border-[#17140F]/15" : "border-[#F7F2E7]/12";
  const blackBg = variant === "light" ? "bg-[#17140F]" : "bg-[#F7F2E7]";

  return (
    <div className={`relative flex w-full select-none pointer-events-none ${className}`} aria-hidden="true">
      {Array.from({ length: keyCount }).map((_, i) => {
        const hasBlack = BLACK_KEY_OFFSETS.includes(i % 7) && i !== keyCount - 1;
        return (
          <div key={i} className="relative flex-1 h-full">
            <div className={`w-full h-full border-r ${whiteBorder} ${whiteBg}`} />
            {hasBlack && (
              <div className={`absolute top-0 right-0 translate-x-1/2 w-[55%] h-[62%] ${blackBg} rounded-b-[2px] z-10`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
