'use client';
import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';

const UserWelcome = () => {
  const user = useAuthStore((state) => state.user);
  return <div>User {user?.name}Welcome</div>;
};

export default UserWelcome;
