"use client"
import React, { useEffect } from 'react';

const Ad1 = () => {
  useEffect(() => {
    // Load Google AdSense script
    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;
    document.body.appendChild(script);

    // Initialize the ad
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="ca-pub-7686801812294972"
         data-ad-slot="5838281506"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  );
};

export default Ad1;