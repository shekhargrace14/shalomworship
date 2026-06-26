 "use client";

import { useEffect, useState } from "react";

export default function NetworkStatus() {
  const [online, setOnline] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setOnline(navigator.onLine);

    const handleOnline = () => {
      setOnline(true);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 3000);
    };

    const handleOffline = () => {
      setOnline(false);
      setVisible(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-0 left-0 z-[9999] h-1 w-full transition-colors duration-300 ${
        online ? "bg-green-500" : "bg-red-500"
      }`}
    />
  );
}