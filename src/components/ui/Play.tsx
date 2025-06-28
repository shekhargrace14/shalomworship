"use client";

import { usePlayerStore } from "@/stores/playerStore";
import { Pause, Play } from "lucide-react";

type Props = {
  audioUrl: string;
  title: string;
  artist: string;
  image:string;
};

export default function PlayButton({ audioUrl, title, artist,image }: Props) {
  // ✅ Zustand hooks
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const setAudio = usePlayerStore((state) => state.setAudio);
  const togglePlay = usePlayerStore((state) => state.togglePlay);

  const handleClick = () => {
    // Check if a different song is playing — then switch it
    const currentUrl = usePlayerStore.getState().audioUrl;

    if (currentUrl !== audioUrl) {
      setAudio(audioUrl, title, artist,image);
    } else {
      togglePlay(); // Pause or Resume
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white text-black rounded-full p-2"
    >
      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
    </button>
  );
}
