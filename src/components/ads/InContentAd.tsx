"use client";

import { useEffect } from "react";

export default function InContentAd() {
  useEffect(() => {
    try {
      // Push ads only if AdSense is available
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <div
      style={{
        margin: "24px 0",
        display: "flex",
        justifyContent: "center",
        minHeight: "90px",
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "80%" }}
        data-ad-client="ca-pub-7686801812294972"   // <-- replace later
        data-ad-slot="7232236064"                   // <-- replace later
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
