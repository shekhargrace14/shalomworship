"use client";
import React, { useRef, useState, useEffect } from "react";

const DEFAULT_SPEED_PX_PER_SEC = 60; // fixed for now; we'll add a slider later.

export default function AutoScrollControls() {
  const [isScrolling, setIsScrolling] = useState(false);
  const rafId = useRef<number | null>(null);
  const lastTs = useRef<number | null>(null);

  const atBottom = (): boolean =>
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 1;

  const step = (ts: number) => {
    if (lastTs.current === null) lastTs.current = ts;
    const dt = (ts - lastTs.current) / 1000; // seconds since last frame
    const dy = DEFAULT_SPEED_PX_PER_SEC * dt;

    window.scrollBy(0, dy);
    lastTs.current = ts;

    if (atBottom()) {
      stop();
      return;
    }
    rafId.current = requestAnimationFrame(step);
  };

  const start = () => {
    if (isScrolling) return;
    setIsScrolling(true);
    lastTs.current = null;
    rafId.current = requestAnimationFrame(step);
  };

  const stop = () => {
    setIsScrolling(false);
    if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    rafId.current = null;
    lastTs.current = null;
  };

  useEffect(() => {
    return () => stop(); // cleanup on unmount
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-3 py-2 shadow">
      <button
        onClick={start}
        disabled={isScrolling}
        className="rounded-full px-4 py-2 text-sm font-medium disabled:opacity-50 border"
      >
        ▶ Play
      </button>
      <button
        onClick={stop}
        disabled={!isScrolling}
        className="rounded-full px-4 py-2 text-sm font-medium disabled:opacity-50 border"
      >
        ⏸ Pause
      </button>
    </div>
  );
}
