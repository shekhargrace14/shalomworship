"use client";
import React, { useState, useEffect } from "react";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: number;
  fallbackSrc?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "avatar",
  size = 64,
  fallbackSrc = "/user.png",
  className = "",
}) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <div
      className={`rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={imgSrc}
        alt={alt}
        width={size}
        height={size}
        onError={() => setImgSrc(fallbackSrc)}
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default Avatar;
