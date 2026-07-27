'use client';

import { useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { X } from 'lucide-react';

import EventSection from './event/EventSection';
import Social from './ui/Social';
import Link from 'next/link';
import { Button } from './ui/button';

type Props = {
  data?: any[];
};

export function AutoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // if (!data?.length) return

    const seen = sessionStorage.getItem('welcome-popup');

    if (!seen) {
      setOpen(true);

      sessionStorage.setItem('welcome-popup', 'true');

      const timer = setTimeout(() => {
        setOpen(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md px-4 flex flex-col items-center">
        <button onClick={() => setOpen(false)} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground" aria-label="Close">
          <X className="h-4 w-4" />
        </button>

        <DialogHeader>
          <DialogTitle>Connect with us</DialogTitle>
        </DialogHeader>

        {/* Email */}
        <a
          href="mailto:connect@shalomworship.com"
          className="
            text-sm
            text-muted-foreground
            transition-colors
            hover:text-foreground
          "
        >
          connect@shalomworship.com
        </a>

        <Link href="/submission" className="text-sm font-medium transition-colors hover:text-primary cursor-pointer">
          <Button>Contact Us</Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
}
