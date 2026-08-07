'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export default function GoogleSignInButton() {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!window.google || !buttonRef.current) return;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: async (response) => {
        setLoading(true);
        try {
          const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idToken: response.credential,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || 'Google login failed');
          }

          toast.success('👋 Welcome Back ' + data.data.name);
          setTimeout(() => {
            window.location.href = '/';
          }, 1000);
          // router.push("/"); router.replace("/"); these doest work with window.location.reload();  window.location.href = "/";
        } catch (error) {
          console.error(error);

          toast.error(error instanceof Error ? error.message : 'Google login failed');

          setLoading(false);
        }
      },
    });

    buttonRef.current.innerHTML = '';

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: 'outline',
      size: 'large',
      shape: 'rectangular',
      text: 'continue_with',
      width: 320,
    });
  }, []);

  return (
    <div className="relative">
      <div ref={buttonRef} className={loading ? 'pointer-events-none opacity-50' : ''} />

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="flex items-center gap-2 text-sm">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Signing you in...
          </div>
        </div>
      )}
    </div>
  );
}
