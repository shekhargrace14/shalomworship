"use client";

import { Share2 } from "lucide-react";
import { IoShareSocialOutline } from "react-icons/io5";
interface ShareButtonProps {
  title: any;
  // add other props if needed
}

export default function ShareButton({ title }: ShareButtonProps) {
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
    // >
    //   Share
    // </button>
    // <div >
    // <div onClick={handleShare} className=" bg-[#212121] p-2  rounded-full cursor-pointer">
    <div onClick={handleShare} className=" cursor-pointer">
      {/* <IoShareSocialOutline className="w-4 h-4"  /> */}
      <Share2 size={16} className="text-foreground"/>
    </div>
    // </div>
  );
}
