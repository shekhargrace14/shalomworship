"use client";

import { useEffect } from "react";

export default function InContentAd() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <div className="my-6 flex w-full justify-center mx-auto clear-both">
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: "250px" }}
        data-ad-client="ca-pub-7686801812294972"
        data-ad-slot="7232236064"
        data-ad-format="rectangle"
      />
    </div>
  );
}