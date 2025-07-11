// components/YouTubeEmbed.tsx
"use client";
import React from "react";

type YouTubeEmbedProps = {
  videoId: string;
  title?: string;
};

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, title = "YouTube Video" }) => {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
