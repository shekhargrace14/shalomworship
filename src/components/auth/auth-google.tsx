'use client';
import { hydrateChannels } from '@/lib/auth/hydrateChannel';
import { useAuthStore } from '@/store/useAuthStore';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const AuthGoogle = () => {
  const router = useRouter();
  // const [user, setUser]= useState()
  const setUser = useAuthStore((s) => s.setUser);
  // console.log(user, "AuthGoogle")

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        console.log('Google onSuccess fired');
        console.log(credentialResponse);
        try {
          const res = await fetch(`/api/auth/google`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idToken: credentialResponse.credential,
            }),
          });

          const data = await res.json();
          if (data.success) {
            setUser(data.data);
            await hydrateChannels();
          }

          if (!data.success) {
            toast.error(data.message);
            return;
          }

          toast.success(data.message);

          router.refresh();

          router.push('/');
        } catch (error) {
          toast.error('Something went wrong');
        }
      }}
      onError={() => {
        toast.error('Google Login Failed');
      }}
      text="continue_with"
    />
  );
};

export default AuthGoogle;
