'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export default function GoogleSignInButton() {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.google || !buttonRef.current) return;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: async (response) => {
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
            throw new Error(data.message);
          }

          // Same as your current flow

          toast.success(data.message);
          window.location.reload();
          window.location.href = '/';
          // router.push("/"); router.replace("/"); these doest work with window.location.reload();  window.location.href = "/";
        } catch (error) {
          console.error(error);
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

  return <div ref={buttonRef} />;
}
