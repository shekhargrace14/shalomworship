'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, ListMusic, Tv, LayoutDashboard, LogOut, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { user } from '@prisma/client';
import { API_URL } from '@/lib/config';
import { Spinner } from '@/components/ui/spinner';
import { useAuthStore } from '@/store/useAuthStore';

const menuItems = [
  // {
  //   title: 'Favorites',
  //   description: "Songs you've liked",
  //   icon: Heart,
  //   href: '/favorites',
  // },
  {
    title: 'My Setlists',
    description: 'Manage your worship setlists',
    icon: ListMusic,
    href: '/user/setlist',
  },
  {
    title: 'My Channels',
    description: 'View your channels',
    icon: Tv,
    href: '/user/channel',
  },
  // {
  //   title: 'Dashboard',
  //   description: 'Open creator dashboard',
  //   icon: LayoutDashboard,
  //   href: 'https://dashboard.shalomworship.com',
  //   external: true,
  // },
];

const page = () => {
  // const [user, setUser] = useState<user | null>(null);

  const setUser = useAuthStore((s) => s.setUser);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch(`/api/auth/me`, {
          credentials: 'include',
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.data);
      } catch (err) {
        console.error(err);
        setUser(null);
      }
    }

    loadUser();
  }, [setUser]);

  if (!user) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.image ?? ''} />
              <AvatarFallback>SW</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <CardTitle className="text-2xl">{user?.name}</CardTitle>

              <CardDescription>
                <p>{user?.email}</p>
                <p>{user?.role}</p>
              </CardDescription>
            </div>
            <Link href={`/user/profile/edit`}>
              <Button className="cursor-pointer" variant="outline">
                Edit Profile
              </Button>
            </Link>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-0">
          {menuItems.map((item, index) => (
            <div key={item.title}>
              <Link
                href={item.href}
                // target={item.external ? '_blank' : undefined}
                className="flex items-center justify-between p-4 transition-colors hover:bg-accent"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg border p-2">
                    <item.icon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-medium">{item.title}</p>

                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>

              {index !== menuItems.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      <Button
        variant="destructive"
        className="w-full"
        onClick={() => {
          // logout
        }}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );
};
export default page;
