'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, ListMusic, Tv, LayoutDashboard, LogOut, ChevronRight } from 'lucide-react';

// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from ".../ui/avatar";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { user } from '@prisma/client';

const menuItems = [
  {
    title: 'Favorites',
    description: "Songs you've liked",
    icon: Heart,
    href: '/favorites',
  },
  {
    title: 'My Setlists',
    description: 'Manage your worship setlists',
    icon: ListMusic,
    href: '/setlists',
  },
  {
    title: 'My Channels',
    description: 'View your channels',
    icon: Tv,
    href: '/channels',
  },
  {
    title: 'Dashboard',
    description: 'Open creator dashboard',
    icon: LayoutDashboard,
    href: 'https://dashboard.shalomworship.com',
    external: true,
  },
];

export default function Page() {
  const [user, setUser] = useState<user | null>(null);

  useEffect(() => {
    async function loadUser() {
      const res = await fetch('https://dashboard.shalomworship.com/api/auth/me', {
        // const res = await fetch('http://localhost:3001/api/auth/me', {
        credentials: 'include',
      });

      const data = await res.json();

      // console.log(data.user, "user data");

      setUser(data.user);
    }

    loadUser();
  }, []);

  // console.log(user, 'user-profile');

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

            <Button variant="outline">Edit Profile</Button>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-0">
          {menuItems.map((item, index) => (
            <div key={item.title}>
              <Link href={item.href} target={item.external ? '_blank' : undefined} className="flex items-center justify-between p-4 transition-colors hover:bg-accent">
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
}
