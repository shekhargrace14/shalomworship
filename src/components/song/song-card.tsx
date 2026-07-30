import Link from 'next/link';
import Image from 'next/image';
import slugify from 'slugify';

import { cn } from '@/lib/utils';

// import {
//     Card,
//     CardContent,
// } from "@/components/ui/card"

// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "./ui/avatar"

// import { optimizedImage } from "@/utils/optimizedImage"
// import { Badge } from "./ui/badge";
// import { Card, CardContent } from "./ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { channel } from '@prisma/client';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
import { Badge } from '../ui/badge';
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"

export type CardVariant = 'imageTop' | 'imageLeft' | 'compact';

interface Props {
  id?: string;
  item?: any;

  title?: string;

  image?: string | null;

  language?: string | null;

  slug?: string;

  type?: string;

  variant?: CardVariant;

  className?: string;
  channel?: channel;
}

export default function SongCard({ id, item, title, language, slug: songSlug, image, variant = 'imageTop', className, channel }: Props) {
  const creators: {
    title: string;
    image?: string;
  }[] = [];

  const slug = slugify(songSlug || '', {
    lower: true,
    strict: true,
  });

  return (
    <Link href={`/song/${slug}-${id}`} className="block">
      <Card className={cn('group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg gap-0 bg-transparent border-none hover:bg-card p-2', variant === 'imageLeft' && 'flex flex-row', variant === 'compact' && 'flex-row items-center', className)}>
        {/* IMAGE */}
        {variant !== 'compact' && (
          <div
            className={cn(
              'relative overflow-hidden rounded-lg',

              variant === 'imageTop' && 'aspect-video',

              variant === 'imageLeft' && 'h-32 w-32 shrink-0',
            )}
          >
            <Image
              // src={optimizedImage(videoId, "mqdefault", type) || ""}
              src={image ?? ''}
              alt={title || ''}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        {/* CONTENT */}
        <CardContent
          className={cn(
            'flex flex-1 flex-col gap-3 py-4 px-0',

            variant === 'compact' && 'py-2',
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-semibold text-foreground">{title}</h3>

              {channel && (
                <div className="mt-1 flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={channel.avatar || ''} />

                    <AvatarFallback>
                      {channel.title
                        ?.trim()
                        .split(/\s+/)
                        .map((word) => word[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase() || '?'}
                    </AvatarFallback>
                  </Avatar>

                  <span className="text-xs text-muted-foreground truncate font-semibold">{channel.title}</span>
                </div>
              )}
            </div>

            {language && <Badge variant="secondary">{language}</Badge>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
