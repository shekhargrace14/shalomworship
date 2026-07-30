import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

import { House, Music2, ListMusic, Heart, User, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Separator } from '../ui/separator';
export default function Footer() {
  const bottomNavItems = [
    {
      title: 'Email',
      href: '/',
      icon: Mail,
    },
    {
      title: 'WhatsApp',
      href: '/song',
      icon: FaWhatsapp,
    },
  ];
  return (
    <footer className="space-y-4 border-t bg-background px-4 pt-6 pb-4">
      <div className="container mx-auto flex flex-col  justify-between gap-4  md:flex-row items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <Image src="/logo.png" alt="Shalom Worship" width={36} height={36} className="h-10 w-auto" />
          <p className="text-xl font-semibold leading-5 tracking-wide">
            Shalom <br /> Worship
          </p>
        </Link>

        {/* Email */}
        <a
          href="mailto:connect@shalomworship.com"
          className="
            text-sm
            text-muted-foreground
            transition-colors
            hover:text-foreground
          "
        >
          connect@shalomworship.com
        </a>
      </div>
      {/* <Separator/> */}
      <div className="container m-auto flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} <span className="font-medium text-foreground">Shalom Worship</span>. All rights reserved.
        </p>

        <p className="flex items-center gap-1">
          Made with
          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
          in India
        </p>
      </div>
    </footer>
  );
}
