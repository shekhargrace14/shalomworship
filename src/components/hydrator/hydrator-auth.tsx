'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { API_URL } from '@/lib/config';
import { useRouter } from 'next/navigation';

export default function AuthHydrator({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch(`/api/auth/me`, {
          credentials: 'include',
        });

        const data = await res.json();

        if (data.success) {
          setUser(data.data);
        } else {
          setUser(null);
        }
        // XXX router.push('/'); Dont xxx nagivate to home public setlist view will also naviatage to home.
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [setUser, setLoading]);
  // const user = useAuthStore((state)=> state.user)

  return <>{children}</>;
}
