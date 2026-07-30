'use client';

import { useEffect, useState } from 'react';

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

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!visible) return null;

  return <div className={`fixed inset-x-0 top-0 z-[9999] flex h-8 items-center justify-center text-sm font-medium text-foreground transition-colors duration-300 ${online ? 'bg-green-500' : 'bg-red-500'}`}>{online ? 'You are Online' : 'No internet connection'}</div>;
}
