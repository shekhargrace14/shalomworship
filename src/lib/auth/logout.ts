import { useAuthStore } from '@/store/useAuthStore';
import { API_URL } from '../config';
import { useChannelStore } from '@/store/useChannelStore';
import { useSetlistStore } from '@/store/useSetlistStore';

export async function logout() {
  const res = await fetch(`/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Logout failed');
  }
  useAuthStore.getState().logout();
  // useChannelStore.getState().logout(); // or clearChannels()
  // useSetlistStore.getState().clear();  // if applicable
  window.location.href = '/';
  // window.location.reload();
}
