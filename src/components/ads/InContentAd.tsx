"use client";

import React from "react";

interface InContentAdProps {
  width?: number;
  height?: number;
  className?: string;
  adPath?: string;
  sandbox?: string;
  adClient?: string;
  adSlot?: string;
}

export default function InContentAd({
  width = 300,
  height = 250,
  className = "",
  adPath = "/static/ads/in-content-ad.html",
  // Crucial: allow-popups-to-escape-sandbox ensures clicked ads successfully navigate to target tabs
  sandbox = "allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox",
  adClient = "ca-pub-7686801812294972",
  adSlot = "7232236064",
}: InContentAdProps) {
  
  // Attach the dynamic page context variables directly onto the static frame path address
  const parameterizedPath = `${adPath}?client=${encodeURIComponent(adClient)}&slot=${encodeURIComponent(adSlot)}&width=${width}&height=${height}`;

  return (
    <div className={`flex justify-center my-4 clear-both ${className}`}>
      <iframe
        src={parameterizedPath}
        className="border-none overflow-hidden select-none"
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
          maxWidth: '100%'
        }}
        scrolling="no"
        sandbox={sandbox}
        loading="lazy"
        title="Advertisement Space"
      />
    </div>
  );
}