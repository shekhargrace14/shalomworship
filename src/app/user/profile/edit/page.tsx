'use client';
import { useAuthStore } from '@/store/useAuthStore';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const page = () => {
  const user = useAuthStore((s) => s.user);

  return <div>page-{user?.id}</div>;
};

export default page;
