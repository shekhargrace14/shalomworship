'use client';

import { Share2 } from 'lucide-react';
import { Button } from '../ui/button';
export default function ButtonShare() {
  const handleShare = async () => {
    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Sharing not supported in this browser.');
    }
  };

  return (
    <Button variant="default" onClick={handleShare} className=" cursor-pointer">
      <Share2 size={16} />
      Share
    </Button>
  );
}
