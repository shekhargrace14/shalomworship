"use client";

import { Share2 } from "lucide-react";

export default function ShareButton() {
  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          // title: {title},
          // text: "I found this amazing content!",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing not supported in this browser.");
    }
  };

  return (
    // <button
    //   onClick={handleShare}
    //   
    // >
    //   Share
    // </button>
    <div onClick={handleShare} className=" bg-[#212121] p-2  rounded-full">
      <Share2  />
    </div>
  );
}
