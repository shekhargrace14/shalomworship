import { useAuthStore } from '@/store/useAuthStore';

export async function logout() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  // const res = await fetch('https://dashboard.shalomworship.com/api/auth/logout', {
  // const res = await fetch('http://localhost:3001/api/auth/logout', {
  const res = await fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Logout failed');
  }

  useAuthStore.getState().logout();
}
