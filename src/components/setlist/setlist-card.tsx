'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { CalendarDays, Globe, Lock, EyeOff, Clock3, ChevronRight, ArrowRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Metadata, Setlist } from '@/types/setlist';

type Props = {
  setlist: Setlist;
  href: string;
  variant?: string;
};

export default function SetlistCard({ setlist, href, variant }: Props) {
  const visibilityIcon = {
    PRIVATE: <Lock className="h-3.5 w-3.5" />,
    PUBLIC: <Globe className="h-3.5 w-3.5" />,
    UNLISTED: <EyeOff className="h-3.5 w-3.5" />,
  };

  return (
    <Link href={href}>
      {variant === 'minimal' ? (
        <Card className=" p-2 transition-all hover:border-primary hover:shadow-md cursor-pointer">
          <CardHeader className="p-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-md line-clamp-1">{setlist.title}</CardTitle>
                {setlist.theme && <p className=" text-xs text-muted-foreground">{setlist.theme}</p>}
              </div>
            </div>
            {setlist.eventAt && (
              <Badge variant="outline" className="h-4 flex items-center gap-1 border-accent/70 px-2 py-2   bg-primary/10">
                <CalendarDays className="h-2 w-2 text-accent" />
                <span className="text-accent text-[12px]">{format(new Date(setlist.eventAt), 'EEE, MMM d')}</span>
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            {/* {setlist.sections.map((section)=>(
                          ))} */}
          </CardContent>
        </Card>
      ) : (
        <Card className="transition-all hover:border-primary hover:shadow-md cursor-pointer">
          <CardHeader className="">
            {setlist.eventAt && (
              <Badge variant="outline" className="h-5.5 flex items-center gap-1 border-accent/70 px-2 py-1 bg-primary/10">
                <CalendarDays className="h-3.5 w-3.5 text-accent" />

                <span className="text-accent">{format(new Date(setlist.eventAt), 'EEE, MMM d')}</span>
              </Badge>
            )}
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-xl line-clamp-1">{setlist.title} </CardTitle>

                {setlist.theme && <p className=" text-md text-muted-foreground">{setlist.theme}</p>}
              </div>
              <ArrowRight />
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {setlist.description && <p className="line-clamp-2 text-sm text-muted-foreground italic">"{setlist.description}"</p>}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock3 className="h-3.5 w-3.5" />
                Updated {format(new Date(setlist.updatedAt), 'MMM d, yyyy')}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </Link>
  );
}
