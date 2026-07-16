import { create } from 'zustand';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
};

type AuthStore = {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;

  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      loading: false,
    }),

  setLoading: (loading) =>
    set({
      loading,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      loading: false,
    }),
}));
