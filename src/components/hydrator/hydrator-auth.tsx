'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export default function AuthHydrator({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    async function loadUser() {
      try {
      const res = await fetch('https://dashboard.shalomworship.com/api/auth/me', {
        // const res = await fetch('http://localhost:3001/api/auth/me', {
          credentials: 'include',
        });

        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [setUser, setLoading]);
  // const user = useAuthStore((state)=> state.user)
  // console.log(user, "auth hydrator")

  return <>{children}</>;
}
