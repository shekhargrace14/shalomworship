import { House, Music2, ListMusic, Heart, User } from 'lucide-react';

export const bottomNavItems = [
  {
    title: 'Home',
    href: '/',
    icon: House,
  },
  {
    title: 'Songs',
    href: '/song',
    icon: Music2,
  },
  {
    title: 'Setlists',
    href: '/user/setlist',
    icon: ListMusic,
  },
  // {
  //   title: "Favorites",
  //   href: "/favorites",
  //   icon: Heart,
  // },
  {
    title: 'Profile',
    href: '/user/profile',
    icon: User,
  },
];
