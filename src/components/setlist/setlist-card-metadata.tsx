'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Badge } from '../ui/badge';
import { Spinner } from '../ui/spinner';

const SetlistCardMetadata = ({ loading, handleSubmit, canSave, metadata }: any) => {
  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const [showFloatingSave, setShowFloatingSave] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!saveButtonRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloatingSave(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(saveButtonRef.current);

    return () => observer.disconnect();
  }, []);
  return (
    <div
      className="bg-background p-4 py-8 pt-24 md:pt-40"
      style={{
        backgroundImage: `linear-gradient(to bottom,  oklch(68.699% 0.11763 191.228), transparent)`,
      }}
    >
      <div className="flex flex-col md:flex-row justify-between md:items-end  h-40 md:h-fit">
        <div className="">
          <Badge className="text-foreground">Edit</Badge>
          <h1 className="text-3xl tracking-tight font-medium">{metadata.title}</h1>
          <p className="text-sm text-muted-foreground">Build a worship setlist with sections, songs, notes, and scripture references.</p>
        </div>

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>

          {/* <Button type="button" onClick={handleSubmit} disabled={!canSave || loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? 'Saving...' : 'Save Setlist'}
          </Button> */}

          <Button ref={saveButtonRef} type="button" onClick={handleSubmit} disabled={!canSave || loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? 'Saving...' : 'Save Setlist'}
          </Button>

          {showFloatingSave && (
            <Button type="button" onClick={handleSubmit} disabled={!canSave || loading} className="fixed bottom-20 right-6 z-50 shadow-lg rounded-full">
              {loading ? <Spinner /> : <Save />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetlistCardMetadata;
