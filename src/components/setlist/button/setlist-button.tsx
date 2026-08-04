'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import SetlistCreate from '../setlist-create';
import { LoginRequiredModal } from '@/components/auth/LoginRequiredModal';

export function SetlistButton() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [openLogin, setOpenLogin] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const handleClick = () => {
    if (isAuthenticated) {
      setOpenCreate(true);
    } else {
      setOpenLogin(true);
    }
  };

  return (
    <>
      <Button onClick={handleClick}>
        <Plus className="mr-2 h-4 w-4" />
        {!isAuthenticated ? 'Create Your Own' : 'Create Setlist'}
      </Button>
      <LoginRequiredModal open={openLogin} onOpenChange={setOpenLogin} />
      <SetlistCreate open={openCreate} onOpenChange={setOpenCreate} />
    </>
  );
}
