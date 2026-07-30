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
    console.log('AuthHydrator mounted');
    async function loadUser() {
      console.log('Fetching /api/auth/me');
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
        router.push('/');
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
