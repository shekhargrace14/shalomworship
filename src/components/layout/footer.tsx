import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

import { House, Music2, ListMusic, Heart, User, Mail, X } from 'lucide-react';
import { FaRegEnvelope, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { LuInstagram } from 'react-icons/lu';

import { Separator } from '../ui/separator';
export default function Footer() {
  const contact = [
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
    {
      title: 'X',
      href: '/song',
      icon: X,
    },
  ];
  return (
    <footer className="max-w-7xl m-auto w-full space-y-4 px-4 pt-8 md:pt-16 pb-4">
      <div className="container mx-auto flex flex-col  justify-between gap-4  md:flex-row items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <Image src="/logo.png" alt="Shalom Worship" width={36} height={36} className="h-10 w-auto" />
          <p className="text-xl font-semibold leading-5 tracking-wide">
            Shalom <br /> Worship
          </p>
        </Link>

        {/* Connect */}
        <div className="flex gap-3">
          {/* Email */}
          {/* <a href="mailto:connect@shalomworship.com" className="text-sm text-muted-foreground transition-colors hover:text-foreground" aria-label="Email Shalom Worship">
            connect@shalomworship.com
          </a> */}

          {/* WhatsApp */}
          <a href="https://whatsapp.com/channel/0029Vaz9S3ULSmbinqpGry21" target="_blank" aria-label="WhatsApp" className="text-muted-foreground transition-colors hover:text-foreground">
            <FaWhatsapp />
          </a>

          {/* X */}
          <a href="https://x.com/Shalom_Worship_" rel="noopener noreferrer" target="_blank" aria-label="X / Twitter" className="text-muted-foreground transition-colors hover:text-foreground">
            <FaXTwitter />
          </a>

          {/* Instagram */}
          <a href="https://www.instagram.com/shalomworshipofficial/" target="_blank" aria-label="Instagram" className="text-muted-foreground transition-colors hover:text-foreground">
            <LuInstagram />
          </a>

          {/* Email icon */}
          <a href="mailto:connect@shalomworship.com" aria-label="Email" className="text-muted-foreground transition-colors hover:text-foreground">
            <FaRegEnvelope />
          </a>
        </div>
      </div>
      {/* <div className="flex">
        {contact.map((social,index)=>(
          <Link href={social.href} key={index}>
          <social.icon className='h-8 w-8'/>
          </Link>
        ))}
      </div> */}
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
