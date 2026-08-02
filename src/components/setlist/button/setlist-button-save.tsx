import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Save } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const SetlistButtonSave = ({ loading, handleSubmit, canSave }: any) => {
  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const [showFloatingSave, setShowFloatingSave] = useState(false);
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
    <div>
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
  );
};

export default SetlistButtonSave;
