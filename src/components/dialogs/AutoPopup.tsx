'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SetlistButton } from '../setlist/button/setlist-button';
import { X } from 'lucide-react';

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

        <DialogHeader className="flex flex-col items-center">
          <DialogTitle>Worship Prepration Made Easy</DialogTitle>
          <DialogDescription>Try our Setlist feauture</DialogDescription>
          {/* <SetlistCard setlist={setlist} href={`/user/setlist/view?id=${setlist?.id}`} /> */}
        </DialogHeader>
        <SetlistButton />
      </DialogContent>
    </Dialog>
  );
}
