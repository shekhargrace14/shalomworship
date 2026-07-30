'use client';
import React, { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import slugify from 'slugify';
import { useChannelStore } from '@/store/useChannelStore';

const ChannelCard = ({ item }: any) => {
  const slug = slugify(`${item.slug}`, { lower: true });

  const currentChannel = useChannelStore((state) => state.currentChannel);

  return (
    <>
      <Link href={`/channel/${slug}-${item.id}`}>
        <div className="bg-card rounded-lg ">
          <div className="rounded-lg overflow-hidden h-5/6">
            <Image
              // src="/user.png"
              src={item.avatar || '/user.png'}
              alt={item.title || 'Song Image'}
              width={400}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="w-full p-2">
            <div className="">
              <h3 className="line-clamp-1 text-1xl mb-1 font-semibold text-foreground">{item.title}</h3>
              {/* <p className="text-sm text-foreground">{item.id}</p> */}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ChannelCard;
