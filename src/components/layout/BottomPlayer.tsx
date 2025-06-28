"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { usePlayerStore } from "@/stores/playerStore";
import Image from "next/image";

export default function BottomPlayer() {
    const { audioUrl, title, image, artist, isPlaying, togglePlay, setPlaying } =
        usePlayerStore();

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) audio.play();
        else audio.pause();
    }, [isPlaying, audioUrl]);

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        setProgress(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value);
        if (audioRef.current) audioRef.current.currentTime = time;
        setProgress(time);
    };

    const format = (time: number) =>
        new Date(time * 1000).toISOString().substr(14, 5);

    if (!audioUrl) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black text-white px-4 py-2 shadow-md z-50">
            <div className="grid grid-cols-3 ">

                <audio className="bg-green-400"
                    ref={audioRef}
                    src={audioUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setPlaying(false)}
                />
                <div className=" flex  justify-start items-center gap-4">
                    <Image
                                  src={image || "/default-image.jpg"}
                                  alt={title || "Song Image"}
                                  width={40}
                                  height={40}
                                  className="bg-gray-800 object-cover h-12 w-12"
                                  priority={true}
                                />
                    <div>

                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-xs text-gray-400">{artist}</p>
                    </div>

                </div>

                <div className="flex flex-col items-center ">

                    <button
                        onClick={togglePlay}
                        className="bg-white text-black rounded-full p-2"
                    >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        {/* {isPlaying ? <Pause size={20} /> : <Play size={20} />} */}

                    </button>
                    <div className="flex w-full items-center gap-2 mt-1 ">
                        <span className="text-xs">{format(progress)}</span>
                        <input
                            type="range"
                            min={0}
                            max={duration || 0}
                            value={progress}
                            onChange={handleSeek}
                            className="w-full h-1 appearance-none custom-range focus:outline-none transition"
                            style={{
                                background: `linear-gradient(to right, #ffffff ${(progress / duration) * 100}%, #6b7280 ${(progress / duration) * 100}%)`,
                            }}
                        />
                        <span className="text-xs">{format(duration)}</span>
                    </div>
                </div>
                <div className="">
                    
                </div>
            </div>

        </div>
    );
}
